import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import pois from "./pois";
import icons from "./icons";
import btnStyle from "./myStyles";
import BottomSheet from "./Components/BottomSheet";
import SideSheet from "./Components/SideSheet";
import WelcomeScreen from "./Components/WelcomeScreen";
import SettingsScreen from "./Components/SettingsScreen";
import TestSettingsScreen from "./Components/testSettingsScreen";
import RecenterButton, {SettingsButton} from "./Components/myButtons";
// import RoutedMap from "./RoutedMap";
// import { useOsrmRoute, FitBounds } from "./RoutedMap"; // or inline the hook

// ── Paste this hook at the top of your component file ──────────────────────
function useOsrmRoute(stops) {
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
function RouteLayer({ stops }) {
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

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [showEng, setShowEng] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('English');
  const [fontSize, setFontSize] = useState('Default');

  const mapRef = useRef(null);
  
  const routeStops = [
  { lat: 35.51833824463729, lng: 24.038573001776236, label: "Start" },
  { lat: 35.51905649097498, lng: 24.038519357623727, label: "Waypoint 1" },
  { lat: 35.51823, lng: 24.03572, label: "Waypoint 3" }, 
  { lat: 35.51826183507514, lng: 24.037639593084897, label: "Waypoint 4" },
  { lat: 35.51786, lng: 24.03875, label: "Waypoint 5" },
];

  const { routePositions, routeInfo, status } = useOsrmRoute(routeStops);

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

        {/* ROUTE — only renders when you have 2+ stops */}
        {routeStops.length >= 2 && <RouteLayer stops={routeStops} />}

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
      
      <SettingsButton onClick={() => setShowSettings(prev => !prev)} />
      
      {/* {showSettings && (
        <SettingsScreen
          onClose={() => setShowSettings(false)}
        />
      )} */}

      {showSettings && (
        <TestSettingsScreen
          onClose={() => setShowSettings(false)}
          isDark={isDark}       setIsDark={setIsDark}
          language={language}   setLanguage={setLanguage}
          fontSize={fontSize}   setFontSize={setFontSize}
        />
      )}

      <WelcomeScreen showEng={showEng} setShowEng={setShowEng}/>

      {/* BOTTOM SHEET - mobile only*/}
      {window.innerWidth < 768 && (
      <BottomSheet language={language} poi={selectedPoi} onClose={() => setSelectedPoi(null)} />)}

      {/* SIDE SHEET - desktop only */}
      {window.innerWidth >= 768 && (
      <SideSheet language={language} poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
      )}

    </div>
  );
}

export default App;
