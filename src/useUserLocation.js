import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
// Follows the user's position.
// Returns { position, status }:
//   position  [lat, lng], or null while unknown
//   status    "locating"     still waiting for the first position
//             "ok"           position known (and kept up to date)
//             "denied"       the user or browser blocked location access
//             "unavailable"  no position found (no GPS signal, timeout, or no support)
// If the position was found once and a later update fails, the last
// known position is kept and the status stays "ok".
// ─────────────────────────────────────────────────────────────

export default function useUserLocation() {
  const supported = typeof navigator !== "undefined" && "geolocation" in navigator;
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState(supported ? "locating" : "unavailable");

  useEffect(() => {
    if (!supported) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setStatus("ok");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setPosition(null);
          setStatus("denied");
        } else {
          // No fix yet (or lost): keep the last position if we have one; keep watching.
          setStatus((prev) => (prev === "ok" ? "ok" : "unavailable"));
        }
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [supported]);

  return { position, status };
}
