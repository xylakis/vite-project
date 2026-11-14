import { useEffect, useState } from "react";

// Like useState, but the value is remembered on this device (localStorage),
// so settings survive closing and reopening the app.
// If storage is blocked (private window, etc.) it quietly behaves like useState.
const PREFIX = "halepa-walk:";

export default function usePersistentState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(PREFIX + key);
      return saved === null ? defaultValue : JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      // storage unavailable: setting just isn't remembered
    }
  }, [key, value]);

  return [value, setValue];
}
