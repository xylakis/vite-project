import { useState } from "react";

// Small card at the top of the map that tells the user what is going on
// with their location. The map always works; this only explains why the
// blue "you are here" dot is missing.
// Remount it (change its key) to show it again after it was closed.

const TEXT = {
  locating: {
    English: "Finding your location…",
    Greek: "Εντοπισμός της θέσης σας…",
    German: "Ihr Standort wird ermittelt…",
    French: "Recherche de votre position…",
  },
  denied: {
    English: "Location access is blocked. To see where you are on the map, allow location for this site in your browser settings and reload the page.",
    Greek: "Η πρόσβαση στην τοποθεσία είναι αποκλεισμένη. Για να δείτε πού βρίσκεστε στον χάρτη, επιτρέψτε την τοποθεσία για αυτόν τον ιστότοπο στις ρυθμίσεις του προγράμματος περιήγησης και ανανεώστε τη σελίδα.",
    German: "Der Standortzugriff ist blockiert. Um Ihre Position auf der Karte zu sehen, erlauben Sie den Standort für diese Seite in den Browsereinstellungen und laden Sie die Seite neu.",
    French: "L'accès à la position est bloqué. Pour voir où vous êtes sur la carte, autorisez la localisation pour ce site dans les réglages du navigateur, puis rechargez la page.",
  },
  unavailable: {
    English: "Your location can't be found right now. The map still works; we'll keep trying.",
    Greek: "Δεν είναι δυνατός ο εντοπισμός της θέσης σας αυτή τη στιγμή. Ο χάρτης λειτουργεί κανονικά· θα συνεχίσουμε να προσπαθούμε.",
    German: "Ihr Standort kann gerade nicht ermittelt werden. Die Karte funktioniert trotzdem; wir versuchen es weiter.",
    French: "Votre position est introuvable pour le moment. La carte fonctionne quand même ; nous continuons d'essayer.",
  },
};

const ICON = {
  locating: "ti-current-location",
  denied: "ti-map-pin-off",
  unavailable: "ti-map-pin-question",
};

const CLOSE_LABEL = { English: "Close", Greek: "Κλείσιμο", German: "Schließen", French: "Fermer" };

export default function LocationNotice({ status, language }) {
  const [closed, setClosed] = useState(false);
  if (closed || !TEXT[status]) return null;

  const text = TEXT[status][language] ?? TEXT[status].English;
  return (
    <div className={`location-notice location-notice--${status}`} role="status">
      <i className={`ti ${ICON[status]} location-notice__icon`} aria-hidden="true" />
      <span className="location-notice__text">{text}</span>
      {status !== "locating" && (
        <button
          type="button"
          className="location-notice__close"
          aria-label={CLOSE_LABEL[language] ?? CLOSE_LABEL.English}
          onClick={() => setClosed(true)}
        >
          <i className="ti ti-x" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
