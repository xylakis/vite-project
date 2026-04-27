import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import pois from "./pois";

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
        top: "80px", // always above the sheet
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

// --- BOTTOM SHEET ---
function BottomSheet({ poi, onClose }) {
  const [expanded, setExpanded] = useState(false);
  if (!poi) return null;
  return (
    <div id = "BOTTOM_SHEET"
      style={{
        position: "absolute",
        bottom: 0,
        left: 10,
        right: 10,
        height: expanded ? window.innerHeight/1.2 : window.innerHeight/2,
        background: "#282525",
        borderRadius: "10px 10px 0 0",
        padding: "7px 16px 7px",
        zIndex: 1000,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.1)",
        display: "flex",          // ← add
        flexDirection: "column",  // ← add
      }}
    >
      <img src={`/photos/${poi.id}.jpg`} 
      alt={poi.name} style={{ 
        width: "calc(100% + 20px)", 
        aspectRatio: "2/1",
        height: "auto", 
        objectFit: "cover", 
        borderRadius: "5px 5px 5px 5px",
        marginLeft:"-10px",
        marginBottom: "5px",
        flexShrink: 0,  // ← prevent image from shrinking
        }} />
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
        {poi.name}
      </h2>
      <p
        style={{
          fontSize: "15px",
          color: "#666",
          marginBottom: "16px",
          lineHeight: "1.5",
          // maxHeight: expanded ? "200px" : "80px", // ← expand height when "more" is clicked
          //maxHeight: "80px",       // ← cap the height
          overflowY: "auto",        // ← scroll when content overflows
          paddingRight: "6px",      // ← prevent text from sitting under the scrollbar
          paddingLeft: "6px", 
          flex: 1,          // ← grows to fill available space
          minHeight: 0,     // ← required for overflow to work inside flex
        }}
      >
        {poi.description} <br />
        <i>{poi.image_source}</i>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
      <button onClick={onClose} style={btnStyle}> Close </button>
      <button onClick={() => setExpanded((prev) => !prev)}style={btnStyle}>
        {expanded ? "Less" : "More"}
      </button>
      </div>
    </div>
  );
}

const btnStyle = {
  fontSize: "15px",
  color: "#666",
  background: "#eaf4fb",
  border: "none",
  borderRadius: "8px",
  padding: "8px 14px",
  cursor: "pointer",
};

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => {
        console.error("Could not get location", err);
        setUserLocation([35.5138, 24.018]);
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const icons = {
    location_icon: new L.Icon({
      iconUrl: "/icons/my_icon_location_false.png",
      iconSize: [32, 32],
    }),
    location_icon_active: new L.Icon({
      iconUrl: "/icons/my_icon_location_true.png",
      iconSize: [32, 32],
    }),
    leather: new L.Icon({
      iconUrl: "/icons/icons8-leather.png",
      iconSize: [32, 32],
    }),
  };

  if (!userLocation)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          color: "#666",
        }}
      >
        Getting your location...
      </div>
    );

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", 
    overflow: "hidden" 
    }}
    >

      {/* MAP */}
      <MapContainer
        ref = {mapRef}
        center={userLocation}
        zoom={16}
        style={{ height: "100%", width: "100%", 
          paddingTop: "52px", // ← add padding to prevent overlap with recenter button
          paddingBottom: selectedPoi ? "260px" : "0px", // ← add padding when bottom sheet is open
        }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* USER MARKER */}
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>

        {/* POI MARKERS */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.position}
            icon={selectedPoi?.id === poi.id ? icons.location_icon_active : icons[poi.icon]}
            eventHandlers={{ click: () => setSelectedPoi(poi) }}
          />
        ))}
        
      </MapContainer>

      <RecenterButton mapRef={mapRef} userLocation={userLocation} />

      {/* BOTTOM SHEET */}
      <BottomSheet poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
    </div>
  );
}

export default App;
