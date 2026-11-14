import { Polyline } from "react-leaflet";
import savedRoute from "../route.json";

// The walking route is saved in src/route.json (no internet needed).
// To change the route: edit src/routeStops.js, then run `npm run update-route`.
const route = savedRoute;

// Draws the saved route: a soft dark outline under a blue line.
export function RouteLayer() {
  const positions = route.positions;
  if (positions.length < 2) return null;
  return (
    <>
      <Polyline
        positions={positions}
        pathOptions={{ color: "#1e3a5f", weight: 7, opacity: 0.25 }}
      />
      <Polyline
        positions={positions}
        pathOptions={{ color: "#3b82f6", weight: 4, opacity: 0.9 }}
      />
    </>
  );
}
