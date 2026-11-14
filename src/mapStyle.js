import { addProtocol, setWorkerUrl } from "maplibre-gl";
// MapLibre's background "worker" script; Vite copies it into the build and gives its URL
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";
import { Protocol } from "pmtiles";
import { layers, namedFlavor } from "@protomaps/basemaps";

// ─────────────────────────────────────────────────────────────
// OFFLINE MAP
// The map is drawn from one file bundled with the app:
//   public/maps/chania.pmtiles   OpenStreetMap data for central Chania (Protomaps)
//   public/maps/fonts/           label fonts (Noto Sans, Latin + Greek ranges only)
//   public/maps/sprites/         small map symbols (light + dark)
// Nothing is downloaded from the internet while the app runs.
// To refresh the map data: see "Refresh the map file" in CLAUDE.md (Phase 1).
// ─────────────────────────────────────────────────────────────

setWorkerUrl(maplibreWorkerUrl);

// Let MapLibre read "pmtiles://" URLs (once per page load)
const protocol = new Protocol();
addProtocol("pmtiles", protocol.tile);

// Area covered by chania.pmtiles: [west, south], [east, north]
export const MAP_BOUNDS = [[23.99, 35.495], [24.06, 35.53]];
export const MIN_ZOOM = 12.5;
export const MAX_ZOOM = 19; // the file has detail up to zoom 15; beyond that it is enlarged

// Absolute base URL of the app's files (works in the browser and later inside Capacitor)
const BASE = `${window.location.origin}${import.meta.env.BASE_URL}`;

// App language → map label language
const LABEL_LANG = { English: "en", Greek: "el", German: "de", French: "fr" };

export const MAP_ATTRIBUTION =
  '<a href="https://protomaps.com" target="_blank" rel="noopener">Protomaps</a> © <a href="https://openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

/** MapLibre style for the offline Chania map, in light or dark, with labels in the app language. */
export function buildMapStyle({ dark = false, language = "English" } = {}) {
  const flavor = dark ? "dark" : "light";
  return {
    version: 8,
    glyphs: `${BASE}maps/fonts/{fontstack}/{range}.pbf`,
    sprite: `${BASE}maps/sprites/${flavor}`,
    sources: {
      protomaps: {
        type: "vector",
        url: `pmtiles://${BASE}maps/chania.pmtiles`,
        attribution: MAP_ATTRIBUTION,
      },
    },
    layers: layers("protomaps", namedFlavor(flavor), { lang: LABEL_LANG[language] ?? "en" }),
  };
}
