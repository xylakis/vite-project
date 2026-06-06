import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";

// // --- WELCOME SCREEN ---
// function WelcomeScreen({ showEng, setShowEng }) {
//   const [show, setShow] = useState(true);

//   const welcomeDivEng = <div id = 'WelcomeScreenEnglish' style={welcomeDivStyle}>
//       Hi! We are <strong>Cultural Memory Coop</strong>. We are a cooperative working with cultural memory and heritage projects around Crete. 
//       <br /><br />
//       <img src="/icons/CM_logo.svg" alt="Cultural Memory Logo" style={{ width: "100px", marginBottom: "10px", display: "block", margin: "0 auto" }} />
//       <br />
//       This web application is a prototype for a mobile guide to the historical area of Halepa in the city of Chania.
//       Explore the city by tapping on the points of interest.
//       <br /><br />
//       Please follow our page for updates on this and other projects: <a href="https://culturalmemory.gr/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr</a>
//       <br /><br />
//       You can support what we do at: <a href="https://culturalmemory.gr/giving/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr/giving/</a>
//       <br /><br />
//       <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
//         <button onClick={() => setShow(false)} style={btnStyle}>Dismiss</button> 
//         <button onClick={() => setShowEng(prev => !prev)} style={btnStyle}>
//             {showEng ? "Ελληνικά" : "English"}</button>
//         </div>
//     </div>

//   const welcomeDivGre = <div id = 'WelcomeScreenGreek' style={welcomeDivStyle}>
//     Γεια σας ! Είμαστε η <strong> ΚοινΣΕπ Πολιτισμική Μνήμη  </strong>. Είμαστε ένας συνεταιρισμός που δραστηριοποιείται σε έργα πολιτισμικής μνήμης και πολιτιστικής κληρονομιάς γύρω από την Κρήτη.  
//     <br /><br />
//     <img src="/icons/CM_logo.svg" alt="Cultural Memory Logo" style={{ width: "100px", marginBottom: "10px", display: "block", margin: "0 auto" }} />
//     <br />
//     Αυτή η διαδικτυακή εφαρμογή είναι ένα πρωτότυπο για έναν ψηφιακό οδηγό της ιστορικής περιοχής της Χαλέπας στην πόλη των Χανίων.
//     Εξερευνήστε την πόλη πατώντας πάνω στα σημεία ενδιαφέροντος.
//     <br /><br />
//     Ακολουθήστε τη σελίδα μας για ενημερώσεις σχετικά με αυτό το έργο όπως και άλλα εδώ: <a href="https://culturalmemory.gr/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr</a>
//     <br /><br />
//     Μπορείτε επίσης να στήρίξετε τη προσπάθεια μας εδώ: <a href="https://culturalmemory.gr/giving/" target="_blank" style={{ color: "#4ea8de" }}>culturalmemory.gr/giving/</a>
//     <br /><br />
//     <div style={{ display: "flex", gap: "10px", flexShrink: 0, paddingBottom: "8px", justifyContent: "center" }}>
//       <button onClick={() => setShow(false)} style={btnStyle}>Dismiss</button> 
//       <button onClick={() => setShowEng(prev => !prev)} style={btnStyle}>
//           {showEng ? "Ελληνικά" : "English"}</button>
//       </div>
//   </div>
  
//   if (!show) return null;
//   return ( 
    
//     showEng ? welcomeDivEng  : welcomeDivGre
//   );
// }

// export default WelcomeScreen;

function WelcomeScreen({ onClose,showEng, setShowEng }) {
  // const [show, setShow] = useState(true);

  // if (!show) return null;

  const optionBtn = (active = false) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: active ? '1px solid #4a90d9' : '1px solid var(--border, #444)',
    background: active ? 'rgba(74,144,217,0.15)' : 'none',
    color: active ? '#4a90d9' : 'var(--text-primary)',
    fontSize: '13px',
    cursor: 'pointer',
  });

  const sectionLabel = {
    fontSize: '11px', color: 'var(--text-secondary, #888)',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    marginBottom: '10px', display: 'block',
  };

  const content = {
    heading: showEng
      ? <>Hi! We are <strong>Cultural Memory Coop</strong>.</>
      : <>Γεια σας! Είμαστε η <strong>ΚοινΣΕπ Πολιτισμική Μνήμη</strong>.</>,

    sub: showEng
      ? 'We are a cooperative working with cultural memory and heritage projects around Crete.'
      : 'Είμαστε ένας συνεταιρισμός που δραστηριοποιείται σε έργα πολιτισμικής μνήμης και πολιτιστικής κληρονομιάς γύρω από την Κρήτη.',

    about: showEng
      ? 'This web application is a prototype for a mobile guide to the historical area of Halepa in the city of Chania. Explore the city by tapping on the points of interest.'
      : 'Αυτή η διαδικτυακή εφαρμογή είναι ένα πρωτότυπο για έναν ψηφιακό οδηγό της ιστορικής περιοχής της Χαλέπας στην πόλη των Χανίων. Εξερευνήστε την πόλη πατώντας πάνω στα σημεία ενδιαφέροντος.',

    followLabel: showEng ? 'Follow us' : 'Ακολουθήστε μας',
    followText:  showEng
      ? 'Follow our page for updates on this and other projects:'
      : 'Ακολουθήστε τη σελίδα μας για ενημερώσεις σχετικά με αυτό και άλλα έργα:',

    supportLabel: showEng ? 'Support us' : 'Στηρίξτε μας',
    supportText:  showEng
      ? 'You can support what we do at:'
      : 'Μπορείτε να στηρίξετε την προσπάθειά μας εδώ:',

    dismiss:  showEng ? 'Dismiss' : 'Κλείσιμο',
    langBtn:  showEng ? 'Ελληνικά' : 'English',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
    }}>

      {/* ── Header ── */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px 12px',
        borderBottom: '1px solid var(--border, #333)',
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>
          {showEng ? 'Welcome' : 'Καλωσορίσατε'}
        </h2>
        <button onClick={onClose}
        style={{ background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-primary)', fontSize: '20px', lineHeight: 1,
        }}>✕</button>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Who we are */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, #333)' }}>
          <span style={sectionLabel}>{showEng ? 'About us' : 'Σχετικά με εμάς'}</span>
          <p style={{ margin: '0 0 8px', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {content.heading}
          </p>
          <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {content.sub}
          </p>
        </div>

        {/* About the app */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, #333)' }}>
          <span style={sectionLabel}>{showEng ? 'About this app' : 'Σχετικά με την εφαρμογή'}</span>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {content.about}
          </p>
        </div>

        {/* Follow us */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, #333)' }}>
          <span style={sectionLabel}>{content.followLabel}</span>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {content.followText}
          </p>
          <a href="https://culturalmemory.gr/" target="_blank" rel="noreferrer"
            style={{ fontSize: '14px', color: '#4a90d9', textDecoration: 'none' }}>
            culturalmemory.gr ↗
          </a>
        </div>

        {/* Support us */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border, #333)' }}>
          <span style={sectionLabel}>{content.supportLabel}</span>
          <p style={{ margin: '0 0 8px', fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
            {content.supportText}
          </p>
          <a href="https://culturalmemory.gr/giving/" target="_blank" rel="noreferrer"
            style={{ fontSize: '14px', color: '#4a90d9', textDecoration: 'none' }}>
            culturalmemory.gr/giving/ ↗
          </a>
        </div>

        {/* Action buttons */}
        <div style={{
          padding: '14px 20px',
          display: 'flex', gap: '10px', justifyContent: 'center',
        }}>
          {/* <button onClick={onClose} style={optionBtn(false)}>
            {content.dismiss}
          </button> */}
          <button onClick={() => setShowEng(prev => !prev)} style={optionBtn(true)}>
            {content.langBtn}
          </button>
        </div>

      </div>
      {/* ── END scrollable body ── */}

      {/* ── Sticky footer ── */}
      <div style={{
        flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '12px 0 10px',
        borderTop: '1px solid var(--border, #333)',
        background: 'var(--bg-panel, inherit)',
      }}>
        <img src="/icons/CM_logo.svg" alt="Cultural Memory Logo"
          style={{ width: '64px', marginBottom: '6px' }} />
        <p style={{
          margin: 0, fontSize: '11px',
          color: 'var(--text-primary)', opacity: 0.5, textAlign: 'center',
        }}>
          © 2026 Cultural Memory. All rights reserved.
        </p>
      </div>

    </div>
  );
}

export default WelcomeScreen;