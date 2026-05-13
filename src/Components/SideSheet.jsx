import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


function SideSheet({ poi, onClose, showEng, setShowEng }) {

  if (!poi) return null;
  return (
    <div id = "SideSheet">
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
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
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
        {/* <i>{poi.image_source}</i> */}
        image source:
        <a href={poi.image_source} target="_blank" style={{ color: "#4ea8de" }}> {poi.image_source}</a>
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