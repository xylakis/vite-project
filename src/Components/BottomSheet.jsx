import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


// --- BOTTOM SHEET (mobile) ---
function BottomSheet({ poi, onClose, language }) {
  
  const [expanded, setExpanded] = useState(false);
  
  if (!poi) return null;

    const descriptions = {
    English: poi.description_eng,
    Greek:   poi.description,
    German:  poi.description_ger,
    French:  poi.description_fra,
};

  const names ={
    English: poi.name_eng,
    Greek:   poi.name,
    German:  poi.name_ger,
    French:  poi.name_fra,
  };
  
  return (
    <div id = "BOTTOM_SHEET" style={{height: expanded ? window.innerHeight/1.2 : window.innerHeight/2}}>
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
                {names[language] ?? poi.name_eng}
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
        {descriptions[language] ?? poi.description_eng}
        <br />
        <a href={poi.image_source} target="_blank" style={{ color: "#4ea8de" }}>image source: {poi.image_source}</a>
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

export default BottomSheet;
