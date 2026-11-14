import { Source, Layer } from "react-map-gl/maplibre";
import savedRoute from "../route.json";

// The walking route is saved in src/route.json (no internet needed).
// To change the route: edit src/routeStops.js, then run `npm run update-route`.

// route.json stores [lat, lng] pairs; GeoJSON wants [lng, lat]
const routeGeoJson = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "LineString",
    coordinates: savedRoute.positions.map(([lat, lng]) => [lng, lat]),
  },
};

// Draws the saved route: a soft dark outline under a blue line.
export function RouteLayer() {
  if (savedRoute.positions.length < 2) return null;
  return (
    <Source id="walk-route" type="geojson" data={routeGeoJson}>
      <Layer
        id="walk-route-casing"
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "#1e3a5f", "line-width": 7, "line-opacity": 0.25 }}
      />
      <Layer
        id="walk-route-line"
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "#3b82f6", "line-width": 4, "line-opacity": 0.9 }}
      />
    </Source>
  );
}
