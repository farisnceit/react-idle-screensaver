import { useEffect, useRef, useCallback, useState } from "react";

interface UseIdleTimerOptions {
  /** Idle timeout in milliseconds */
  idleTime: number;
  /** Callback when user becomes idle */
  onIdle?: () => void;
  /** Callback when user becomes active */
  onActive?: () => void;
  /** Events to listen for user activity */
  events?: string[];
}

export function useIdleTimer({
  idleTime,
  onIdle,
  onActive,
  events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"],
}: UseIdleTimerOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  
  // Use refs for callbacks to avoid recreating resetTimer
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);

  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  }, [onIdle, onActive]);

  const resetTimer = useCallback(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // If was idle, trigger active callback
    if (isIdle && onActiveRef.current) {
      onActiveRef.current();
    }
    setIsIdle(false);

    // Set new idle timer
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      if (onIdleRef.current) {
        onIdleRef.current();
      }
    }, idleTime);
  }, [idleTime, isIdle]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Add event listeners
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));

    // Start timer on mount (use setTimeout to avoid synchronous setState)
    const initTimer = setTimeout(() => resetTimer(), 0);

    return () => {
      clearTimeout(initTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [events, resetTimer]);

  return { isIdle, resetTimer };
}