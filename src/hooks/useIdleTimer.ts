import { useCallback, useEffect, useRef, useState } from "react";

export const useIdleTimer = (
  timeout = 10000,
  active = true
): boolean => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (!active) return;

    setIsIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, timeout);
  }, [timeout, active]);

  useEffect(() => {
    if (!active || typeof window === "undefined") return;

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"];
    events.forEach(e => window.addEventListener(e, resetTimer));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer, active]);

  return isIdle;
};
