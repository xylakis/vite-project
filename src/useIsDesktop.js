import { useEffect, useState } from "react";

// true when the window is at least 768 px wide (desktop / landscape tablet layout).
// Updates straight away when the window is resized or the device is rotated.
const QUERY = "(min-width: 768px)";

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setIsDesktop(mq.matches);
    onChange(); // in case it changed before the listener was attached
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
