import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import pois from "./pois";
import { getPoiIcon } from "./poiIcons";
import { getRouteIcon } from "./routeIcons";
import { userIcon } from "./userIcon";
import useUserLocation from "./useUserLocation";
import useIsDesktop from "./useIsDesktop";
import LocationNotice from "./Components/LocationNotice";
import btnStyle from "./myStyles";
import BottomSheet from "./Components/BottomSheet";
import SideSheet from "./Components/SideSheet";
import WelcomeScreen from "./Components/WelcomeScreen";
import TestSettingsScreen from "./Components/testSettingsScreen";
import RecenterButton, {SettingsButton} from "./Components/myButtons";
import { RouteLayer } from "./Components/RouteMap";
import route from "./route.json";
import routeStops from "./routeStops";

function App() {
  const { position: userLocation, status: locationStatus } = useUserLocation();
  const isDesktop = useIsDesktop(); // follows window resize / phone rotation
  const [noticeKey, setNoticeKey] = useState(0); // bump to show the location notice again
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [showEng, setShowEng] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState('English');
  const [fontSize, setFontSize] = useState('Default');

  const [showRoute, setShowRoute] = useState(false);
  

  const mapRef = useRef(null);

  return (
    <div className={selectedPoi ? "sheet-open" : ""} style={{ height: "100dvh", width: "100vw", position: "relative", overflow: "hidden" 
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
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ZOOM BUTTONS - desktop only */}
        {isDesktop && (
          <ZoomControl
            position="bottomright"
            zoomInText='<i class="ti ti-plus"></i>'
            zoomOutText='<i class="ti ti-minus"></i>'
          />
        )}

        {/* USER MARKER */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon} zIndexOffset={800}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* ROUTE — only renders when you have 2+ stops */}
        {showRoute && <RouteLayer />}

        {showRoute && (
          <Marker
            position={[routeStops[0].lat, routeStops[0].lng]}
            icon={getRouteIcon("start")}
            zIndexOffset={500}
          >
            <Popup>Start</Popup>
          </Marker>
        )}

        {showRoute && (
          <Marker
            position={[routeStops[routeStops.length - 1].lat, routeStops[routeStops.length - 1].lng]}
            icon={getRouteIcon("finish")}
            zIndexOffset={500}
          >
            <Popup>Finish</Popup>
          </Marker>
        )}

        {/* POI MARKERS */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={poi.position}
            icon={getPoiIcon(poi.className, selectedPoi?.id === poi.id)}
            zIndexOffset={selectedPoi?.id === poi.id ? 1000 : 0}   // selected marker on top
            eventHandlers={{ click: () => setSelectedPoi(poi) }}
          />
        ))}

        
      </MapContainer>

      <RecenterButton mapRef={mapRef} userLocation={userLocation} onNoLocation={() => setNoticeKey((k) => k + 1)} />

      {/* LOCATION STATUS (finding / blocked / not found) */}
      <LocationNotice key={`${locationStatus}-${noticeKey}`} status={locationStatus} language={language} />
      
      <SettingsButton onClick={() => setShowSettings(prev => !prev)} />
      
      {showSettings && (
        <TestSettingsScreen
          onClose={() => setShowSettings(false)}
          isDark={isDark}       setIsDark={setIsDark}
          language={language}   setLanguage={setLanguage}
          fontSize={fontSize}   setFontSize={setFontSize}
          showRoute={showRoute} setShowRoute={setShowRoute}
          routeInfo={{ distance: route.distance_km, duration: route.duration_min }}
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
      {!isDesktop && (
      <BottomSheet language={language} poi={selectedPoi} onClose={() => setSelectedPoi(null)} />)}

      {/* SIDE SHEET - desktop only */}
      {isDesktop && (
      <SideSheet language={language} poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
      )}

    </div>
  );
}

export default App;
