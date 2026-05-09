import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";

// --- WELCOME SCREEN ---
function WelcomeScreen({ showEng, setShowEng }) {
  const [show, setShow] = useState(true);

  const welcomeDivEng = <div id = 'WelcomeScreenEnglish' style={welcomeDivStyle}>
      Hi! We are <strong>Cultural Memory Coop</strong>. We are a cooperative working with cultural memory and heritage projects around Crete. 
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
      <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
        <button onClick={() => setShow(false)} style={btnStyle}>Dismiss</button> 
        <button onClick={() => setShowEng(prev => !prev)} style={btnStyle}>
            {showEng ? "Ελληνικά" : "English"}</button>
        </div>
    </div>

    const welcomeDivGre = <div id = 'WelcomeScreenGreek' style={welcomeDivStyle}>
      Γεια σας ! Είμαστε η <strong> ΚοινΣΕπ Πολιτισμική Μνήμη  </strong>. Είμαστε ένας συνεταιρισμός που δραστηριοποιείται σε έργα πολιτισμικής μνήμης και πολιτιστικής κληρονομιάς γύρω από την Κρήτη.  
      <br /><br />
      <img src="/icons/CM_logo.svg" alt="Cultural Memory Logo" style={{ width: "100px", marginBottom: "10px", display: "block", margin: "0 auto" }} />
      <br />
      Αυτή η διαδικτυακή εφαρμογή είναι ένα πρωτότυπο για έναν ψηφιακό οδηγό της ιστορικής περιοχής της Χαλέπας στην πόλη των Χανίων.
      Εξερευνήστε την πόλη πατώντας πάνω στα σημεία ενδιαφέροντος.
      <br /><br />
      Ακολουθήστε τη σελίδα μας για ενημερώσεις σχετικά με αυτό το έργο όπως και άλλα εδώ: <a href="https://culturalmemory.gr/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr</a>
      <br /><br />
      Μπορείτε επίσης να στήρίξετε τη προσπάθεια μας εδώ: <a href="https://culturalmemory.gr/giving/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr/giving/</a>
      <br /><br />
      <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
        <button onClick={() => setShow(false)} style={btnStyle}>Dismiss</button> 
        <button onClick={() => setShowEng(prev => !prev)} style={btnStyle}>
            {showEng ? "Ελληνικά" : "English"}</button>
        </div>
    </div>
  
  if (!show) return null;
  return ( 
    
    showEng ? welcomeDivEng  : welcomeDivGre
  );
}

export default WelcomeScreen;