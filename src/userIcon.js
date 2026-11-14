// ─────────────────────────────────────────────────────────────
// "YOU ARE HERE" MARKER
// Blue dot with a white ring and a soft pulsing halo, centred on
// the user's position. Blue (not Cultural Memory green) so it is
// never confused with the POI markers or the green route start.
// Styles: CSS block "User marker" in index.css. Drawn by <MapPin>.
// ─────────────────────────────────────────────────────────────

const SIZE = 22; // px, the dot including its white ring

export const userIcon = {
  className: "user-marker",
  html: '<span class="user-marker__halo"></span><span class="user-marker__dot"></span>',
  width: SIZE,
  height: SIZE,
  anchor: "center", // centred on the position
  offsetY: 0,
};
