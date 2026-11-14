// Fetches the walking route through the points in src/routeStops.js
// from routing.openstreetmap.de (OSRM, foot profile) and saves it to
// src/route.json, which the app draws. Run: npm run update-route

import { writeFileSync } from "node:fs";
import routeStops from "../src/routeStops.js";

const coords = routeStops.map((s) => `${s.lng},${s.lat}`).join(";");
const url = `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${coords}?overview=full&geometries=geojson`;

const res = await fetch(url);
if (!res.ok) throw new Error(`Routing server answered ${res.status}`);
const data = await res.json();
if (data.code !== "Ok" || !data.routes?.length) throw new Error(`No route found (${data.code})`);

const route = data.routes[0];
const round = (n) => Math.round(n * 1e6) / 1e6; // ~10 cm, plenty for a walking line

const out = {
  source: "routing.openstreetmap.de (OSRM, foot profile), © OpenStreetMap contributors",
  updated: new Date().toISOString().slice(0, 10),
  distance_km: Number((route.distance / 1000).toFixed(1)),
  duration_min: Math.round(route.duration / 60),
  // [lat, lng] pairs, ready for Leaflet
  positions: route.geometry.coordinates.map(([lng, lat]) => [round(lat), round(lng)]),
};

const file = new URL("../src/route.json", import.meta.url);
writeFileSync(file, JSON.stringify(out) + "\n");
console.log(`Saved src/route.json: ${out.distance_km} km, ~${out.duration_min} min, ${out.positions.length} points`);
