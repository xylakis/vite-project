import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// --- RECENTER COMPONENT ---
function RecenterButton({ userLocation }) {
  const map = useMap();
  return (
    <button
      onClick={() => map.setView(userLocation, 16)}
      style={{
        position: "absolute",
        top: "10px",
        right: "16px",
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
  if (!poi) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        background: "#282525",
        borderRadius: "10px 10px 0 0",
        padding: "12px 0px 32px",
        zIndex: 1000,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "4px",
          background: "#ddd",
          borderRadius: "2px",
          margin: "0 auto 16px",
        }}
      />
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
        {poi.name}
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "16px",
          lineHeight: "1.5",
        }}
      >
        {poi.description}
      </p>
      <button
        onClick={onClose}
        style={{
          fontSize: "14px",
          color: "#2980b9",
          background: "#eaf4fb",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          cursor: "pointer",
        }}
      >
        ← Back to map
      </button>
    </div>
  );
}

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);

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
      iconUrl: "public/icons/icons8-location.png",
      iconSize: [32, 32],
    }),
    leather: new L.Icon({
      iconUrl: "public/icons/icons8-leather.png",
      iconSize: [32, 32],
    }),
  };

  const pois = [
    {
      id: 1,
      name: "Tannery",
      description: "The Tabakaria of Chalepa, together with those of Agia Kyriaki, formed the most important industrial area (by the standards of Crete) of Chania—and perhaps all of Crete—from the mid-19th century until the 1970s. Today, the last functioning tannery, owned by Christos Filoitis, still stands in defiance of the forces of urban gentrification and the globalized economy.",
      position: [35.51982, 24.03845],
      icon: "location_icon",
    },
    {
      id: 2,
      name: "Greek Embassy",
      description:
        "Former Greek Embassy building with neoclassical architecture.",
      position: [35.51823571635969, 24.03572036417894],
      icon: "location_icon",
    },
    {
      id: 3,
      name: "Galliki Scholi",
      description: "The French School, a landmark of Chania's old town.",
      position: [35.51912, 24.03783],
      icon: "location_icon",
    },
    {
      id: 4,
      name: "Eleftherios Venizelos House",
      description: "Birthplace of Greece's most celebrated statesman.",
      position: [35.51835, 24.03869],
      icon: "location_icon",
    },
  ];

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
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* TOP BAR 
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '52px',
        background: 'white',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        zIndex: 1000,
      }}>
        <span style={{ fontSize: '16px', fontWeight: '600' }}>Chania Trails</span>
      </div>
      */}

      {/* MAP */}
      <MapContainer
        center={userLocation}
        zoom={16}
        style={{ height: "100%", width: "100%", paddingTop: "52px" }}
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
            icon={icons[poi.icon]}
            eventHandlers={{ click: () => setSelectedPoi(poi) }}
          />
        ))}

        <RecenterButton userLocation={userLocation} />
      </MapContainer>

      {/* BOTTOM SHEET */}
      <BottomSheet poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
    </div>
  );
}

export default App;
