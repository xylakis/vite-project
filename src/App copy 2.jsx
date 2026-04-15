import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

// --- RECENTER COMPONENT ---
function RecenterMap({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function App() {
  const [userLocation, setUserLocation] = useState(null)

  // --- GET USER LOCATION --
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (pos) => {
  //       setUserLocation([pos.coords.latitude, pos.coords.longitude])
  //     },
  //     (err) => {
  //       console.error('Could not get location', err)
  //       setUserLocation([35.5138, 24.0180]) // fallback: Chania
  //     }
  //   )
  // }, [])

  useEffect(() => {
  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude])
    },
    (err) => {
      console.error('Could not get location', err)
    },
    {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 5000,
    }
  )

  return () => {
    navigator.geolocation.clearWatch(watchId)
  }
}, [])

  // --- ICONS ---
  const icons = {
    // water: new L.Icon({
    //   iconUrl: 'public/icons/water.png',
    //   iconSize: [32, 32],
    // }),
    location_icon: new L.Icon({
      iconUrl: 'public/icons/icons8-location.png',
      iconSize: [32, 32],
    }),
    leather: new L.Icon({
      iconUrl: 'public/icons/icons8-leather.png',
      iconSize: [32, 32],
    })
    // shelter: new L.Icon({
    //   iconUrl: 'public/icons/shelter.png',
    //   iconSize: [32, 32],
    // }),
  }

  // --- POIs ---
  const pois = [
    { id: 1, name: 'Tannery', position: [35.51982, 24.03845], icon: 'location_icon' },
    { id: 2, name: 'Greek Embassy', position: [35.51823571635969, 24.03572036417894], icon: 'location_icon' },
    { id: 3, name: 'Galliki Scholi', position: [35.51912, 24.03783], icon: 'location_icon' },
    { id: 4, name: 'Eleftherios Venizelos House', position: [35.51835, 24.03869], icon: 'location_icon' },
    // { id: 5, name: 'Viewpoint 2', position: [35.5160, 24.0165], icon: 'view' },
    // { id: 6, name: 'Shelter 2', position: [35.5140, 24.0210], icon: 'shelter' },
    // { id: 7, name: 'Water Source 3', position: [35.5155, 24.0200], icon: 'water' },
    // { id: 8, name: 'Viewpoint 3', position: [35.5170, 24.0180], icon: 'view' },
    // { id: 9, name: 'Shelter 3', position: [35.5120, 24.0170], icon: 'shelter' },
    // { id: 10, name: 'Water Source 4', position: [35.5135, 24.0198], icon: 'water' },
  ]

  if (!userLocation) return <div>Getting your location...</div>

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={userLocation} zoom={16} style={{ height: '100%', width: '100%' }}>
        
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {/* AUTO RECENTER MAP */}
        <RecenterMap position={userLocation} />
        
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
          >
            <Popup>{poi.name}</Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  )
}

export default App