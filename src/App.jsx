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
import {useOsrmRoute, RouteLayer} from "./Components/RouteMap";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [showEng, setShowEng] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('English');
  const [fontSize, setFontSize] = useState('Default');

  const [showRoute, setShowRoute] = useState(false);
  

  const mapRef = useRef(null);
  
  const routeStops = [
  { lat: 35.51833824463729, lng: 24.038573001776236, label: "Start" },
  { lat: 35.51905649097498, lng: 24.038519357623727, label: "Waypoint 1" },
  {lat: 35.51990558269885, lng:24.038551098620385},
  { lat: 35.51823, lng: 24.03572, label: "Waypoint 3" }, 
  { lat: 35.51826183507514, lng: 24.037639593084897, label: "Waypoint 4" },
  { lat: 35.51786, lng: 24.03875, label: "Waypoint 5" },
  { lat: 35.51761632277899, lng: 24.038720364663188, label: "Waypoint 6" },
  {lat: 35.5169038293579, lng: 24.040015207732438, label: "Waypoint 7"},
  {lat: 35.51631566487464, lng: 24.038841207387353, label: "Waypoint 9"},
  {lat: 35.51595288410136, lng: 24.038748273570516, label: "Waypoint 9"},
  {lat: 35.51554070140421, lng: 24.03886396664548, label: "Waypoint 10"},
  {lat: 35.515810858833554, lng: 24.038702754967662, label: "Waypoint 11"},
  {lat: 35.51574373598675, lng:24.03864634745825},
  {lat: 35.51516081950533, lng:24.03821451185436},
  {lat: 35.51528962913435, lng:24.03777731177107},
  {lat: 35.517492460061014, lng:24.037694163312853},
];

  const { routePositions, routeInfo, status } = useOsrmRoute(routeStops);

  const startFlagIcon = L.icon({
  iconUrl: '/icons/icons8-flag-100 (green).png',
  iconSize: [25, 25],
  iconAnchor: [15, 15],   // tip of the flagpole
  popupAnchor: [0, -20],
});

const finishFlagIcon = L.icon({
  iconUrl: '/icons/icons8-flag-100 (red).png',
  iconSize: [25, 25],
  iconAnchor: [0, 25],
  popupAnchor: [10, -25],
});

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
        {showRoute && routeStops.length >= 2 && <RouteLayer stops={routeStops} />}

        {showRoute && (
          <Marker
            position={[routeStops[0].lat, routeStops[0].lng]}
            icon={startFlagIcon}
            zIndexOffset={500}
          >
            <Popup>Start</Popup>
          </Marker>
        )}

        {showRoute && (
          <Marker
            position={[routeStops[routeStops.length - 1].lat, routeStops[routeStops.length - 1].lng]}
            icon={finishFlagIcon}
            zIndexOffset={500}
          >
            <Popup>Finish</Popup>
          </Marker>
        )}

        {/* // Pass positions into RouteLayer:
        {routeStops.length >= 2 && <RouteLayer routePositions={routePositions} />} */}

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
          showRoute={showRoute} setShowRoute={setShowRoute}
          routeInfo = {routeInfo}
        />
      )}

      {showWelcome && (
      <div 
        style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '480px',
            height: '80vh',        // ← fixed height instead of maxHeight
            zIndex: 1000,
            borderRadius: '12px',
            background: 'var(--bg-panel, #F5F5F5)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',    // keep this — the inner div handles scrolling
            display: 'flex',       // ← add this
            flexDirection: 'column', // ← and this, so WelcomeScreen fills the height
      }}>

      <WelcomeScreen showEng={showEng} setShowEng={setShowEng} onClose={() => setShowWelcome(false)} />
      </div>
      )}

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
