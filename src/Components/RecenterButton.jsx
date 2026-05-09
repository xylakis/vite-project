import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


// --- RECENTER COMPONENT ---
function RecenterButton({ mapRef,userLocation }) {
  // const map = useMap();
  const handleRecenter = () => {
    mapRef.current?.setView(userLocation, 16);
  };
  return (
    <button id = "RECENTER_BUTTON"
      onClick={handleRecenter}
      style={{
        position: "absolute",
        bottom: window.innerHeight-60, // always above the sheet
        left: "16px",
        width: "44px",
        height: "44px",
        borderRadius: "10px",
        background: "white",
        border: "1px solid #ddd",
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
        stroke="#555"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    </button>
  );
}

export default RecenterButton;