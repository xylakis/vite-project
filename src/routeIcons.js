import L from "leaflet";

// ─────────────────────────────────────────────────────────────
// ROUTE START / FINISH MARKERS
// Round badges that sit centred on the first and last point of
// the route line (unlike the POI markers, which point at a spot
// from above). Same drawing style as src/poiIcons.js.
// ─────────────────────────────────────────────────────────────

const GLYPHS = {
  // Start: plain flag
  start: `
    <path d="M6 21V3.5"/>
    <path class="fill" d="M6 4.5h12l-2.6 4.2L18 13H6z"/>`,

  // Finish: chequered flag
  finish: `
    <path d="M6 21V3.5"/>
    <path d="M6 4.5h12.5V13H6"/>
    <path class="fill" d="M6 4.5h3.1v4.25H6zM12.25 4.5h3.1v4.25h-3.1zM9.1 8.75h3.15V13H9.1zM15.35 8.75h3.15V13h-3.15z"/>`,
};

const SIZE = 30; // px

function markerSvg(glyph) {
  return `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle class="route-marker__badge" cx="20" cy="20" r="18"/>
      <g class="route-marker__glyph" transform="translate(8.5 8.5) scale(0.96)" fill="none" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
    </svg>`;
}

const cache = {};

/** Leaflet icon for the route's "start" or "finish" point. */
export function getRouteIcon(kind) {
  if (!cache[kind]) {
    cache[kind] = L.divIcon({
      className: `route-marker route-marker--${kind}`,
      html: markerSvg(GLYPHS[kind]),
      iconSize: [SIZE, SIZE],
      iconAnchor: [SIZE / 2, SIZE / 2], // centred on the route point
      popupAnchor: [0, -SIZE / 2],
    });
  }
  return cache[kind];
}
