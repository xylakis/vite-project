import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


// --- BOTTOM SHEET (mobile) ---
function BottomSheet({ poi, onClose, showEng, setShowEng }) {
  
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
        {showEng ? poi.name_eng : poi.name}
      </h2>
      <p
        style={{
          fontSize: "15px",
          color: "#666",
          marginBottom: "16px",
          lineHeight: "1.5",
          overflowY: "auto",        // ← scroll when content overflows
          paddingRight: "6px",      // ← prevent text from sitting under the scrollbar
          paddingLeft: "6px", 
          flex: 1,          // ← grows to fill available space
          minHeight: 0,     // ← required for overflow to work inside flex
        }}
      >
        {showEng ? poi.description_eng : poi.description}<br />
        {/* <i>{poi.image_source}</i> */}
        <a href={poi.image_source} target="_blank" style={{ color: "#4ea8de" }}>image source: {poi.image_source}</a>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
      
      <button onClick={onClose} style={btnStyle}> Close </button>
      
      <button onClick={() => setExpanded((prev) => !prev)}style={btnStyle}>
        {expanded ? "Less" : "More"}
      </button>

      <button onClick={() => setShowEng(prev => !prev)} style={btnStyle}>
          {showEng ? "Ελληνικά" : "English"}
        </button> 
      
      </div>
    </div>
  );
}

export default BottomSheet;
