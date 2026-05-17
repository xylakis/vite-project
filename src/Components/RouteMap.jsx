import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";


// ── Paste this hook at the top of your component file ──────────────────────
export function useOsrmRoute(stops) {
  const [routePositions, setRoutePositions] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!stops || stops.length < 2) {
      setRoutePositions([]);
      setRouteInfo(null);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    async function fetchRoute() {
      setStatus("loading");
      try {
        const coordString = stops.map((s) => `${s.lng},${s.lat}`).join(";");
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.code !== "Ok" || !data.routes?.length) throw new Error("No route found");
        const route = data.routes[0];
        setRoutePositions(route.geometry.coordinates.map(([lng, lat]) => [lat, lng]));
        setRouteInfo({
          distance: (route.distance / 1000).toFixed(1),
          duration: Math.round(route.duration / 60),
        });
        setStatus("ok");
      } catch (err) {
        if (err.name !== "AbortError") setStatus("error");
      }
    }
    fetchRoute();
    return () => controller.abort();
  }, [JSON.stringify(stops)]);

  return { routePositions, routeInfo, status };
}


// ── Paste this component too ────────────────────────────────────────────────
export function RouteLayer({ stops }) {
  const { routePositions } = useOsrmRoute(stops);
  return (
    <>
      {routePositions.length >= 2 && (
        <>
          <Polyline
            positions={routePositions}
            pathOptions={{ color: "#1e3a5f", weight: 7, opacity: 0.25 }}
          />
          <Polyline
            positions={routePositions}
            pathOptions={{ color: "#3b82f6", weight: 4, opacity: 0.9 }}
          />
        </>
      )}
    </>
  );
}