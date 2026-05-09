import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import pois from "./pois";
import icons from "./icons";
import btnStyle from "./myStyles";
import BottomSheet from "./Components/BottomSheet";
import SideSheet from "./Components/SideSheet";
import WelcomeScreen from "./Components/WelcomeScreen";
import RecenterButton from "./Components/RecenterButton";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [showEng, setShowEng] = useState(true);

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
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" 
    }}
    >

      {/* MAP */}
      <MapContainer
        ref = {mapRef}
        // center={userLocation}
        center={[35.517918, 24.038808]}
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
        {/* {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.position}
            icon={selectedPoi?.id === poi.id ? icons.location_icon_active : icons[poi.icon]}
            eventHandlers={{ click: () => setSelectedPoi(poi) }}
          />
        ))} */}

        {/* SELECTION RING — rendered on top of the selected POI */}
        {selectedPoi && (
          <Marker
            key={`${selectedPoi.id}-selected`}
            position={selectedPoi.position}
            icon={icons.selected}
            interactive={false}
            keyboard={false}
            zIndexOffset={-1000}    // negative pushes it down
          />
        )}

        {/* POI MARKERS */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.position}
            icon={icons[poi.icon]}
            eventHandlers={{ click: () => setSelectedPoi(poi) }}
          />
        ))}

        




        
      </MapContainer>

      <RecenterButton mapRef={mapRef} userLocation={userLocation} />

      <WelcomeScreen showEng={showEng} setShowEng={setShowEng}/>

      {/* BOTTOM SHEET */}
      {window.innerWidth < 768 && (
      <BottomSheet poi={selectedPoi} onClose={() => setSelectedPoi(null)} />)}

      {/* SIDE SHEET - desktop only */}
      {window.innerWidth >= 768 && (
        <SideSheet poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
      )}

    </div>
  );
}

export default App;
