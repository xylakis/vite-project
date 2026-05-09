import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


function SideSheet({ poi, onClose, showEng, setShowEng }) {

  // const [showEng, setShowEng] = useState(false);
  showEng = {showEng};

  if (!poi) return null;
  return (
    <div style={{
      position: "absolute",
      top: "1%",
      right: "0.8%",
      bottom: 0,
      width: "350px",
      height: "95%",
      background: "#282525",
      borderRadius: "10px",
      padding: "7px 16px 7px",
      zIndex: 1000,
      boxShadow: "-2px 0 12px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
    }}>
      <img src={`/photos/${poi.id}.jpg`}
        alt={poi.name} style={{
          width: "calc(100% + 32px)",
          aspectRatio: "2/1",
          height: "auto",
          objectFit: "cover",
          borderRadius: "5px 5px 5px 5px",
          marginLeft: "-16px",
          marginBottom: "5px",
          flexShrink: 0,
        }} />
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "white" }}>
        {/* {poi.name} */}
        {showEng ? poi.name_eng : poi.name}
      </h2>
      <p style={{
        fontSize: "15px",
        color: "#666",
        marginBottom: "16px",
        lineHeight: "1.5",
        overflowY: "auto",
        paddingRight: "6px",
        paddingLeft: "6px",
        flex: 1,
        minHeight: 0,
      }}>
        {showEng ? poi.description_eng : poi.description} <br />
        <i>{poi.image_source}</i>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
        <button onClick={onClose} style={btnStyle}>Close</button> 
         <button onClick={() => setShowEng(prev => !prev)} style={btnStyle}>
          {showEng ? "Ελληνικά" : "English"}
        </button> 



      </div>
    </div>
  );
}

export default SideSheet;