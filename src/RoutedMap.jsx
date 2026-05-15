import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// ─── Fix default marker icons (common Leaflet + bundler issue) ───────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ─── Custom numbered marker factory ─────────────────────────────────────────
function makeNumberedIcon(index, total) {
  const isFirst = index === 0;
  const isLast  = index === total - 1;
  const bg      = isFirst ? "#22c55e" : isLast ? "#ef4444" : "#3b82f6";

  return L.divIcon({
    className: "",
    html: `
      <div style="
        background:${bg};
        color:#fff;
        width:28px;height:28px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        border:2px solid #fff;
        box-shadow:0 2px 6px rgba(0,0,0,0.35);
        display:flex;align-items:center;justify-content:center;
      ">
        <span style="transform:rotate(45deg);font-size:11px;font-weight:700;font-family:sans-serif;">
          ${index + 1}
        </span>
      </div>`,
    iconSize:   [28, 28],
    iconAnchor: [14, 28],
    popupAnchor:[0, -30],
  });
}

// ─── Auto-fit map to route bounds ────────────────────────────────────────────
function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length >= 2) {
      map.fitBounds(L.latLngBounds(positions), { padding: [48, 48] });
    }
  }, [positions, map]);
  return null;
}

// ─── Core routing hook — calls OSRM, returns decoded [lat, lng] array ────────
function useOsrmRoute(stops) {
  const [routePositions, setRoutePositions] = useState([]);
  const [routeInfo,      setRouteInfo]      = useState(null);   // { distance, duration }
  const [status,         setStatus]         = useState("idle"); // idle | loading | error | ok

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
        // OSRM expects coordinates as "lng,lat" pairs separated by ";"
        const coordString = stops
          .map((s) => `${s.lng},${s.lat}`)
          .join(";");

        const url =
          `https://router.project-osrm.org/route/v1/driving/${coordString}` +
          `?overview=full&geometries=geojson`;

        const res  = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        if (data.code !== "Ok" || !data.routes?.length) {
          throw new Error(data.message || "No route found");
        }

        const route = data.routes[0];

        // GeoJSON coordinates are [lng, lat] — Leaflet wants [lat, lng]
        const positions = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

        setRoutePositions(positions);
        setRouteInfo({
          distance: (route.distance / 1000).toFixed(1),      // km
          duration: Math.round(route.duration / 60),          // minutes
        });
        setStatus("ok");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("OSRM error:", err);
          setStatus("error");
        }
      }
    }

    fetchRoute();
    return () => controller.abort();
  }, [JSON.stringify(stops)]);

  return { routePositions, routeInfo, status };
}

// ─── Route overlay — rendered inside MapContainer ────────────────────────────
function RouteLayer({ stops }) {
  const { routePositions, routeInfo, status } = useOsrmRoute(stops);

  return (
    <>
      {/* Road-following route line */}
      {routePositions.length >= 2 && (
        <>
          {/* Shadow / casing */}
          <Polyline
            positions={routePositions}
            pathOptions={{ color: "#1e3a5f", weight: 7, opacity: 0.25 }}
          />
          {/* Main route */}
          <Polyline
            positions={routePositions}
            pathOptions={{ color: "#3b82f6", weight: 4, opacity: 0.9, lineCap: "round", lineJoin: "round" }}
          />
        </>
      )}

      {/* Stop markers */}
      {stops.map((stop, i) => (
        <Marker
          key={i}
          position={[stop.lat, stop.lng]}
          icon={makeNumberedIcon(i, stops.length)}
        >
          <Popup>
            <strong>Stop {i + 1}</strong>
            {stop.label && <><br />{stop.label}</>}
            <br />
            <span style={{ fontSize: "0.75rem", color: "#666" }}>
              {stop.lat.toFixed(5)}, {stop.lng.toFixed(5)}
            </span>
          </Popup>
        </Marker>
      ))}

      {/* Auto-fit */}
      <FitBounds positions={routePositions.length ? routePositions : stops.map((s) => [s.lat, s.lng])} />

      {/* Status / info badge — rendered outside the map via a portal-like trick */}
      {status === "loading" && (
        <div className="route-badge route-badge--loading">Calculating route…</div>
      )}
      {status === "error" && (
        <div className="route-badge route-badge--error">Route unavailable</div>
      )}
      {status === "ok" && routeInfo && (
        <div className="route-badge route-badge--info">
          📍 {stops.length} stops &nbsp;·&nbsp; 🛣 {routeInfo.distance} km &nbsp;·&nbsp; ⏱ {routeInfo.duration} min
        </div>
      )}
    </>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────
/**
 * RoutedMap
 *
 * Props:
 *   stops  — Array of { lat: number, lng: number, label?: string }
 *   height — CSS height string, default "500px"
 *
 * Example:
 *   const stops = [
 *     { lat: 37.9838, lng: 23.7275, label: "Athens" },
 *     { lat: 38.2444, lng: 21.7344, label: "Patras" },
 *     { lat: 40.6401, lng: 22.9444, label: "Thessaloniki" },
 *   ];
 *   <RoutedMap stops={stops} height="600px" />
 */
export default function RoutedMap({ stops = [], height = "500px" }) {
  const defaultCenter = stops.length
    ? [stops[0].lat, stops[0].lng]
    : [51.505, -0.09];

  return (
    <div style={{ position: "relative", fontFamily: "sans-serif" }}>
      {/* Inline styles — drop into your CSS file if preferred */}
      <style>{`
        .route-badge {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        }
        .route-badge--loading { background:#f0f9ff; color:#0369a1; border:1px solid #bae6fd; }
        .route-badge--error   { background:#fef2f2; color:#b91c1c; border:1px solid #fecaca; }
        .route-badge--info    { background:#fff;    color:#1e293b; border:1px solid #e2e8f0; }
      `}</style>

      <MapContainer
        center={defaultCenter}
        zoom={7}
        style={{ height, width: "100%", borderRadius: "12px" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops.length >= 2 && <RouteLayer stops={stops} />}
      </MapContainer>
    </div>
  );
}
