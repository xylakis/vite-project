import { useState, useRef, useEffect, useMemo } from "react";
import MapView, { Popup } from "react-map-gl/maplibre";
import { buildMapStyle, MAP_BOUNDS, MIN_ZOOM, MAX_ZOOM } from "./mapStyle";
import MapPin from "./Components/MapPin";
import pois from "./pois";
import { getPoiIcon } from "./poiIcons";
import { getRouteIcon } from "./routeIcons";
import { userIcon } from "./userIcon";
import useUserLocation from "./useUserLocation";
import useIsDesktop from "./useIsDesktop";
import usePersistentState from "./usePersistentState";
import LocationNotice from "./Components/LocationNotice";
import BottomSheet from "./Components/BottomSheet";
import SideSheet from "./Components/SideSheet";
import WelcomeScreen from "./Components/WelcomeScreen";
import SettingsScreen from "./Components/SettingsScreen";
import RecenterButton, { SettingsButton, ZoomButtons } from "./Components/myButtons";
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

  // Settings: remembered on this device between visits
  const [isDark, setIsDark] = usePersistentState('darkMode', false);
  const [language, setLanguage] = usePersistentState('language', 'English');
  const [fontSize, setFontSize] = usePersistentState('fontSize', 'Default');

  const [showRoute, setShowRoute] = usePersistentState('showRoute', false);

  // Apply dark mode and text size to the whole page (also after reopening the app)
  useEffect(() => {
    document.documentElement.classList.toggle('mode-dark', isDark);
  }, [isDark]);
  useEffect(() => {
    const sizes = { Small: '13px', Default: '15px', Large: '18px' };
    document.documentElement.style.setProperty('--font-size-base', sizes[fontSize] ?? sizes.Default);
  }, [fontSize]);
  

  const mapRef = useRef(null);
  const [popup, setPopup] = useState(null); // { longitude, latitude, text } for "You are here" / Start / Finish

  // Offline map style: rebuilt only when dark mode or language changes
  const mapStyle = useMemo(() => buildMapStyle({ dark: isDark, language }), [isDark, language]);
  const start = routeStops[0];
  const finish = routeStops[routeStops.length - 1];

  return (
    <div className={selectedPoi ? "sheet-open" : ""} style={{ height: "100dvh", width: "100vw", position: "relative", overflow: "hidden" 
    }}
    >

 

      {/* MAP (MapLibre, offline: see src/mapStyle.js) */}
      <MapView
        ref={mapRef}
        initialViewState={{ longitude: 24.038808, latitude: 35.517918, zoom: 15 }}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        maxBounds={MAP_BOUNDS}
        mapStyle={mapStyle}
        style={{ width: "100%", height: "100%" }}
        dragRotate={false}
        touchPitch={false}
        pitchWithRotate={false}
        onClick={() => setPopup(null)}
        attributionControl={{ compact: false }} // keep "© OpenStreetMap" visible (OSM requirement)
      >
        {/* ROUTE line, start and finish */}
        {showRoute && <RouteLayer />}
        {showRoute && (
          <MapPin icon={getRouteIcon("start")} longitude={start.lng} latitude={start.lat} zIndex={2} label="Start"
            onClick={() => setPopup({ longitude: start.lng, latitude: start.lat, text: "Start" })} />
        )}
        {showRoute && (
          <MapPin icon={getRouteIcon("finish")} longitude={finish.lng} latitude={finish.lat} zIndex={2} label="Finish"
            onClick={() => setPopup({ longitude: finish.lng, latitude: finish.lat, text: "Finish" })} />
        )}

        {/* POI MARKERS (selected one on top) */}
        {pois.map((poi) => (
          <MapPin
            key={poi.id}
            icon={getPoiIcon(poi.className, selectedPoi?.id === poi.id)}
            longitude={poi.position[1]}
            latitude={poi.position[0]}
            zIndex={selectedPoi?.id === poi.id ? 4 : 1}
            label={poi.name_eng}
            onClick={() => { setPopup(null); setShowSettings(false); setSelectedPoi(poi); }}
          />
        ))}

        {/* USER MARKER */}
        {userLocation && (
          <MapPin icon={userIcon} longitude={userLocation[1]} latitude={userLocation[0]} zIndex={3} label="You are here"
            onClick={() => setPopup({ longitude: userLocation[1], latitude: userLocation[0], text: "You are here" })} />
        )}

        {popup && (
          <Popup longitude={popup.longitude} latitude={popup.latitude} offset={16} closeButton={false}
            onClose={() => setPopup(null)} className="map-popup">
            {popup.text}
          </Popup>
        )}
      </MapView>

      {/* ZOOM BUTTONS - desktop only (phones use pinch-zoom) */}
      {isDesktop && <ZoomButtons mapRef={mapRef} />}

      <RecenterButton mapRef={mapRef} userLocation={userLocation} onNoLocation={() => setNoticeKey((k) => k + 1)} />

      {/* LOCATION STATUS (finding / blocked / not found) */}
      <LocationNotice key={`${locationStatus}-${noticeKey}`} status={locationStatus} language={language} />
      
      <SettingsButton onClick={() => {
        setSelectedPoi(null);          // close any open POI panel first
        setShowSettings(prev => !prev);
      }} />
      
      {showSettings && (
        <SettingsScreen
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
            background: 'var(--bg-surface)',
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
