import { useState } from "react";

const btnStyle = {
  fontSize: "15px",
  color: "#666",
  background: "#eaf4fb",
  border: "none",
  borderRadius: "8px",
  padding: "8px 14px",
  cursor: "pointer",
};


// --- WELCOME SCREEN ---
function WelcomeScreen() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div style={{
      position: "absolute",
      top: "20px",
      left: "50%",
      width: "75%",
      height: "90%",
      transform: "translateX(-50%)",
      background: "#282525",
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      zIndex: 1000,
      fontSize: "16px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    }}>
      
      Hi. We are <strong>Cultural Memory Coop</strong>. We are a cooperative working with cultural memory and heritage projects around Crete. 
      <br /><br />
      <img src="/icons/CM_logo.svg" alt="Cultural Memory Logo" style={{ width: "100px", marginBottom: "10px", display: "block", margin: "0 auto" }} />
      <br />
      This web application is a prototype for a mobile guide to the historical area of Halepa in the city of Chania.
      Explore the city by tapping on the points of interest.
      <br /><br />
      Please follow our page for updates on this and other projects: <a href="https://culturalmemory.gr/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr</a>
      <br /><br />
      You can support what we do at: <a href="https://culturalmemory.gr/giving/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr/giving/</a>
      <br /><br />
      <button onClick={() => setShow(false)} style={btnStyle}>Dismiss</button> 
    </div>

  
  );
}

export default WelcomeScreen;