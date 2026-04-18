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
    <div id = "BOTTOM_SHEET"
      style={{
        position: "absolute",
        bottom: 0,
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
      <img src={`/photos/${poi.id}.jpg`} alt={poi.name} style={{ width: "100%", height: "120px", objectFit: "cover", marginBottom: "16px" }} />
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

  const pois = [
    {
      id: 1,
      name: "Τα Ταμπακαριά της Χαλέπας",
      description: "(Τα Ταμπακαριά της Χαλέπας μαζί με αυτά της Αγίας Κυριακής συναποτελούσαν τη σημαντικότερη βιομηχανική(για τα δεδομένα της Κρήτης) περιοχή των Χανίων και ίσως της Κρήτης, από τα μέσα του 19ου αιώνα έως και τη δεκαετία του 1970. Σήμερα, το τελευταίο εν λειτουργία βυρσοδεψείο του Χρήστου Φιλοΐτη στέκεται ακόμα σε πείσμα της των καιρών του αστικού εξευγενισμού και της παγκοσμιοποιημένης οικονομίας.  ",
      position: [35.51982, 24.03845],
      icon: "location_icon",
    },
    {
      id: 2,
      name: "Ελληνικό Προξενείο",
      description: "Στο σημείο αυτό, εκτός από την υπέροχη θέα προς το κέντρο της πόλης, μπορούμε να παρατηρήσουμε το Ελληνικό, το Βρετανικό και το Γερμανικό Προξενείο και η αφήγηση μας πυκνώνει για την ιστορία της Χαλέπας,  ως τόπος φιλοξενίας της διπλωματίας του ύστερου 19ου αιώνα.",
      position: [35.51823571635969, 24.03572036417894],
      icon: "location_icon",
    },
    {
      id: 3,
      name: "Πρώην Γαλλική Σχολή",
      description: "Το υπέροχο και εκτεταμένο κτίριο της Γαλλικής σχολής, το οποίο έχει βιώσει αλλεπάλληλες αλλαγές χρήσεις, από ιδιωτική κατοικία Αιγύπτιου εμπόρου μέχρι την στέγαση  τη γαλλικής σχολής και της αρχιτεκτονικής σχολής του Πολυτεχνείου Κρήτης. ",
      position: [35.51860, 24.03783],
      icon: "location_icon",
    },
    {
      id: 4,
      name: "Σπίτι Ελευθερίου Βενιζέλου",
      description: "Το σπίτι του Ελευθερίου Βενιζέλου, το οποίο σήμερα στεγάζει το Μουσείο Ελευθερίου Βενιζέλου, αποτελεί ένα από τα σημαντικότερα κτίρια της Χαλέπας και ένα από τα πιο σημαντικά ιστορικά κτίρια των Χανίων. Το σπίτι αυτό, το οποίο χτίστηκε στα τέλη του 19ου αιώνα, ήταν η κατοικία του Ελευθερίου Βενιζέλου, ενός από τους πιο σημαντικούς πολιτικούς της Ελλάδας και πρωθυπουργού της χώρας σε διάφορες περιόδους. Το σπίτι αυτό αποτελεί ένα σημαντικό μνημείο της ιστορίας της Ελλάδας και της Χαλέπας και είναι ένας δημοφιλής προορισμός για τους επισκέπτες που ενδιαφέρονται για την ιστορία και την πολιτική της χώρας.",
      position: [35.51835, 24.03869],
      icon: "location_icon",
    },
    {
      id: 5,
      name: "Γαλλικό Προξενείο",
      description: "Το πρόσφατα ανακαινισμένο κτίριο του γάλλου προξένου Blanc μας προσφέρει τη δυνατότητα να αναλογιστούμε και να φανταστούμε τη μεγαλοπρεπή διάσταση του ανατολικού προαστείου των Χανίων, όπως αυτή είχε διαμορφωθεί προς τις τελευταίες δεκαετίες του 19ου αιώνα.",
      position: [35.51763, 24.03995],
      icon: "location_icon",
    },
    {
      id: 6,
      name: "Παλάτι Πρίγκιπα Γεωργίου",
      description: "Το Παλάτι του Πρίγκιπα Γεωργίου, το οποίο βρίσκεται στην περιοχή της Χαλέπας, αποτελεί ένα από τα σημαντικότερα ιστορικά κτίρια των Χανίων και ένα από τα πιο σημαντικά μνημεία της νεότερης ιστορίας της Ελλάδας. Το παλάτι αυτό χτίστηκε στα τέλη του 19ου αιώνα για τον Πρίγκιπα Γεώργιο, τον δεύτερο γιο του βασιλιά Γεωργίου Α' της Ελλάδας. Το παλάτι αυτό αποτελεί ένα σημαντικό μνημείο της ιστορίας της Ελλάδας και της Χαλέπας και είναι ένας δημοφιλής προορισμός για τους επισκέπτες που ενδιαφέρονται για την ιστορία και την αρχιτεκτονική της χώρας.",
      position: [35.51865, 24.03831],
      icon: "location_icon",
    },
    {
      id: 7,
      name: "Γερμανικό Προξενείο",
      description: "",
      position: [35.51775, 24.0355],
      icon: "location_icon",
    },
    {
      id: 8,
      name: "Βρετανικό Προξενείο",
      description: "",
      position: [35.51789, 24.03618],
      icon: "location_icon",
    },
    {
      id: 9,
      name: "Γερμανόφωνη καθολική εκκλησία",
      description: "",
      position: [35.51786, 24.03915],
      icon: "location_icon",
    },
    {
      id: 10,
      name: "Πλατεία Έλενα Βενιζέλου",
      description: "",
      position: [35.51786, 24.03886],
      icon: "location_icon",
    },
    {
      id: 11,
      name: "Εθνικό Ιδρυμα Ερευνών & Μελετών Ελευθέριος Βενιζέλος ",
      description: "",
      position: [35.51796, 24.03888],
      icon: "location_icon",
    },
    {
      id: 12,
      name: "Οικία Μαρκαντωνάκη",
      description: "",
      position: [35.51691, 24.03946],
      icon: "location_icon",
    },
    {
      id: 13,
      name: "Βίλλα Σβαρτς",
      description: "",
      position: [35.51557, 24.03926],
      icon: "location_icon",
    },
    {
      id: 14,
      name: "Οικία της οδού Δαγκλή",
      description: "",
      position: [35.51606, 24.03855],
      icon: "location_icon",
    },
    {
      id: 15,
      name: "Κατσαμπάς",
      description: "Οικία Γεωργιουδάκη",
      position: [35.51516, 24.03793],
      icon: "location_icon",
    },
    {
      id: 16,
      name: "Ιερός Ναός Αγίας Μαρίας Μαγδαληνής",
      description: "",
      position: [35.5175, 24.03818],
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
            icon={selectedPoi?.id === poi.id ? icons.location_icon_active : icons[poi.icon]}
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
