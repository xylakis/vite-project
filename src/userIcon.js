import L from "leaflet";

// ─────────────────────────────────────────────────────────────
// "YOU ARE HERE" MARKER
// Blue dot with a white ring and a soft pulsing halo, centred on
// the user's position. Blue (not Cultural Memory green) so it is
// never confused with the POI markers or the green route start.
// Styles: CSS block "User marker" in index.css.
// ─────────────────────────────────────────────────────────────

const SIZE = 22; // px, the dot including its white ring

export const userIcon = L.divIcon({
  className: "user-marker",
  html: '<span class="user-marker__halo"></span><span class="user-marker__dot"></span>',
  iconSize: [SIZE, SIZE],
  iconAnchor: [SIZE / 2, SIZE / 2], // centred on the position
  popupAnchor: [0, -SIZE / 2],
});
