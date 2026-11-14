import { useEffect, useRef, useState } from "react";

const PHOTO_DIR = `${import.meta.env.BASE_URL}photos/`;

// Photo frame for a POI. One photo: a plain image, as before.
// More photos (poi.photos in pois.js, e.g. ["1", "1a", "1b"]): swipe, arrow buttons, dots, and the ← / → keys.
// Give it key={poi.id} so it starts at the first photo when another POI is opened.
export default function PhotoSlider({ poi, alt, style }) {
  const photos = poi.photos?.length ? poi.photos : [String(poi.id)];
  const many = photos.length > 1;
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(photos.length - 1, i));
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  };

  const currentIndex = () => {
    const track = trackRef.current;
    return track ? Math.round(track.scrollLeft / track.clientWidth) : 0;
  };

  // Keyboard ← / → (desktop). Capture phase, so the map doesn't pan at the same time.
  useEffect(() => {
    if (!many) return;
    const onKey = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
      e.preventDefault();
      e.stopPropagation();
      goTo(currentIndex() + (e.key === "ArrowRight" ? 1 : -1));
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [many, photos.length]);

  return (
    <div className="photo-slider" style={style}>
      <div
        ref={trackRef}
        className="photo-slider__track"
        onScroll={many ? () => setIndex(currentIndex()) : undefined}
      >
        {photos.map((name, i) => (
          <img
            key={name}
            src={`${PHOTO_DIR}${name}.jpg`}
            alt={many ? `${alt} (${i + 1}/${photos.length})` : alt}
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        ))}
      </div>

      {many && index > 0 && (
        <button
          type="button"
          className="photo-slider__arrow photo-slider__arrow--prev"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
        >
          <i className="ti ti-chevron-left" />
        </button>
      )}
      {many && index < photos.length - 1 && (
        <button
          type="button"
          className="photo-slider__arrow photo-slider__arrow--next"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
        >
          <i className="ti ti-chevron-right" />
        </button>
      )}

      {many && (
        <div className="photo-slider__dots">
          {photos.map((name, i) => (
            <button
              key={name}
              type="button"
              className={`photo-slider__dot${i === index ? " is-active" : ""}`}
              aria-label={`Photo ${i + 1} of ${photos.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
