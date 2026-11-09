import L from "leaflet";

// ─────────────────────────────────────────────────────────────
// POI MARKER ICONS
// One symbol per POI category (the `className` field in pois.js).
// Symbols are drawn on a 24×24 grid as outlines (stroke), so they
// stay sharp at any size and take their colour from the marker.
// To add a category: add an entry to POI_GLYPHS with the same key
// as the className you use in pois.js.
// ─────────────────────────────────────────────────────────────

export const POI_GLYPHS = {
  // Neighbourhood / area (e.g. Tanning Houses, Katsampas): a cluster of three houses
  area: `
    <path d="M1.5 20.5h21"/>
    <path d="M8 20.5V10l4-3.8 4 3.8v10.5"/>
    <path d="M8 13.2 5.2 10.8 2.5 13.2v7.3"/>
    <path d="M16 13.2l2.8-2.4 2.7 2.4v7.3"/>
    <path d="M10.8 20.5v-3.3h2.4v3.3"/>
    <path d="M11 12.3h2"/>`,

  // Consulate / public office: classical building with a flag on top
  consulate: `
    <path d="M12 7.2V1.8"/>
    <path d="M12 2.2h5l-1.2 1.5 1.2 1.5h-5"/>
    <path d="M3.5 11 12 7.2l8.5 3.8z"/>
    <path d="M6.5 13.5v5M10 13.5v5M14 13.5v5M17.5 13.5v5"/>
    <path d="M4.5 18.5h15M3 21h18"/>`,

  // School: graduation cap
  school: `
    <path d="M2 9.5 12 5l10 4.5-10 4.5z"/>
    <path d="M6 11.4v4.3c0 1.6 2.7 3.2 6 3.2s6-1.6 6-3.2v-4.3"/>
    <path d="M22 9.5v5.2"/>`,

  // House / residence: house with chimney
  house: `
    <path d="M3.5 11 12 4.2l8.5 6.8"/>
    <path d="M5.5 9.5V20.5h13V9.5"/>
    <path d="M15.5 6.6V4.2h2v4"/>
    <path d="M10.5 20.5v-4.8h3v4.8"/>
    <rect x="7.6" y="11.6" width="2.2" height="2.2" rx=".3"/>
    <rect x="14.2" y="11.6" width="2.2" height="2.2" rx=".3"/>`,

  // Palace: crown
  palace: `
    <path d="M4.2 16.5 3 7.8l5 3.9 4-5.9 4 5.9 5-3.9-1.2 8.7z"/>
    <path d="M4.5 19.8h15"/>`,

  // Institution / foundation / archive: open book
  institution: `
    <path d="M12 6.6C10 5.1 7 4.6 3 5v13.4c4-.4 7 .1 9 1.6 2-1.5 5-2 9-1.6V5c-4-.4-7 .1-9 1.6z"/>
    <path d="M12 6.6V20"/>`,

  // Church: Orthodox church with dome and cross
  church: `
    <path d="M12 1.8v4M10.4 3.4h3.2"/>
    <path d="M12 5.8c-2.6 1.6-3.6 3.1-3.6 4.7h7.2c0-1.6-1-3.1-3.6-4.7z"/>
    <path d="M9.5 10.5v2.6M14.5 10.5v2.6"/>
    <path d="M5.5 21v-7.9h13V21"/>
    <path d="M10.5 21v-2.8a1.5 1.5 0 0 1 3 0V21"/>
    <path d="M3.5 21h17"/>`,

  // Fallback for a className without its own symbol: a simple dot
  default: `
    <circle cx="12" cy="12" r="4.5"/>`,
};

// Badge with a pointer at the bottom, drawn in a 40×48 box (tip at 20,45).
const BADGE_PATH =
  "M12 2h16a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10h-4.6L20 44.6 16.6 38H12A10 10 0 0 1 2 28V12A10 10 0 0 1 12 2z";

function markerSvg(glyph) {
  return `
    <svg viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path class="poi-marker__badge" d="${BADGE_PATH}"/>
      <g class="poi-marker__glyph" transform="translate(7 7) scale(1.083)" fill="none" stroke-width="1.7"
         stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
    </svg>`;
}

// Marker sizes in pixels (width; height follows the 40×48 shape)
const SIZE = { normal: 34, selected: 42 };

const cache = {};

/** Leaflet icon for a POI category; `selected` gives the highlighted version. */
export function getPoiIcon(className, selected = false) {
  const key = POI_GLYPHS[className] ? className : "default";
  const cacheKey = `${key}-${selected}`;
  if (!cache[cacheKey]) {
    const w = selected ? SIZE.selected : SIZE.normal;
    const h = Math.round((w * 48) / 40);
    cache[cacheKey] = L.divIcon({
      className: `poi-marker poi-marker--${key}${selected ? " poi-marker--selected" : ""}`,
      html: markerSvg(POI_GLYPHS[key]),
      iconSize: [w, h],
      iconAnchor: [w / 2, Math.round((h * 44.6) / 48)], // the pointer's tip sits on the location
    });
  }
  return cache[cacheKey];
}
