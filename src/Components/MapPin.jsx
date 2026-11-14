import { Marker } from "react-map-gl/maplibre";

// Places one of our SVG/HTML markers (from poiIcons.js, routeIcons.js, userIcon.js) on the map.
// `icon` = { className, html, width, height, anchor, offsetY }
export default function MapPin({ icon, longitude, latitude, onClick, zIndex = 1, label }) {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor={icon.anchor}
      offset={[0, icon.offsetY]}
      style={{ zIndex }}
      onClick={(e) => {
        e.originalEvent.stopPropagation(); // don't let the click reach the map
        onClick?.();
      }}
    >
      <div
        className={icon.className}
        style={{ width: icon.width, height: icon.height, position: "relative", cursor: onClick ? "pointer" : "default" }}
        role={onClick ? "button" : undefined}
        aria-label={label}
        dangerouslySetInnerHTML={{ __html: icon.html }}
      />
    </Marker>
  );
}
