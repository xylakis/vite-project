import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


function SideSheet({ poi, onClose, language }) {
  
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
    <div id = "SideSheet">
      <button
      onClick={onClose}
      aria-label="Close"
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        background: 'rgba(0,0,0,0.4)',
        border: '0.5px solid rgba(255,255,255,0.2)',
        cursor: 'pointer',
        color: 'rgba(255,255,255,0.85)',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    <i className="ti ti-x" style={{ fontSize: '14px' }} />
    </button>
      <img src={`/photos/${poi.id}.jpg`} alt={poi.name} 
        style={{
          width: "calc(100% + 32px)",
          aspectRatio: "2/1",
          height: "auto",
          objectFit: "cover",
          borderRadius: "5px 5px 0px 0px",
          marginLeft: "-16px",
          marginBottom: "10px",
          flexShrink: 0,
        }} />
      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px" }}>
        {names[language] ?? poi.name_eng}
      </h2>
      <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "15px" }} />
      <p style={{
        // fontSize: "15px",
        fontSize: "var(--font-size-base, 15px)",
        color: "#666",
        marginBottom: "16px",
        lineHeight: "1.5",
        overflowY: "auto",
        paddingRight: "6px",
        paddingLeft: "6px",
        flex: 1,
        minHeight: 0,
      }}>
        {descriptions[language] ?? poi.description_eng}
        <br />
        {/* image source: */}
        {/* <a href={poi.image_source} target="_blank" style={{ color: "#4ea8de" }}> {poi.image_source}</a> */}
        {/* {poi.image_source} */}
      </p>
      {/* <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>




      </div> */}
    </div>
  );
}

export default SideSheet;