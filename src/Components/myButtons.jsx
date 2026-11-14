
// --- SETTINGS COMPONENT ---
export function SettingsButton({ onClick }) {
  return (
    <button
      id="SETTINGS_BUTTON"
      onClick={onClick}
      style={{
        position: "absolute",
        top: "70px", // below the recenter button (16 + 44 + 10)
        left: "16px", // same as RecenterButton
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        background: "var(--btn-bg)",
        border: "1px solid var(--btn-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--btn-icon)"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  );
}


// --- RECENTER COMPONENT ---
function RecenterButton({ mapRef, userLocation, onNoLocation }) {
  const handleRecenter = () => {
    if (userLocation) {
      const map = mapRef.current;
      map?.flyTo({ center: [userLocation[1], userLocation[0]], zoom: Math.max(map.getZoom(), 15.5) });
    }
    else onNoLocation?.(); // position unknown: show the location notice again
  };
  return (
    <button id = "RECENTER_BUTTON"
      onClick={handleRecenter}
      aria-label="Show my location"
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        background: "var(--btn-bg)",
        border: "1px solid var(--btn-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--btn-icon)"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    </button>
  );
}

export default RecenterButton;


// --- ZOOM BUTTONS (desktop) --- styled in index.css ("Zoom buttons")
export function ZoomButtons({ mapRef }) {
  return (
    <div className="zoom-buttons">
      <button type="button" aria-label="Zoom in" onClick={() => mapRef.current?.zoomIn()}>
        <i className="ti ti-plus" aria-hidden="true" />
      </button>
      <button type="button" aria-label="Zoom out" onClick={() => mapRef.current?.zoomOut()}>
        <i className="ti ti-minus" aria-hidden="true" />
      </button>
    </div>
  );
}
