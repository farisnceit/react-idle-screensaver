import { useEffect, useRef, useCallback, useState, useMemo } from "react";

interface UseIdleTimerOptions {
  /** Idle timeout in milliseconds */
  idleTime: number;
  /** Callback when user becomes idle */
  onIdle?: () => void;
  /** Callback when user becomes active */
  onActive?: () => void;
  /** Events to listen for user activity */
  events?: string[];
  /** Enable debug logging */
  debug?: boolean;
}

const DEFAULT_EVENTS = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];

export function useIdleTimer({
  idleTime,
  onIdle,
  onActive,
  events,
  debug = false,
}: UseIdleTimerOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const isIdleRef = useRef(false);
  const eventCountRef = useRef(0);
  const idleTimeRef = useRef(idleTime);
  
  // Memoize events array to prevent recreation on every render
  const eventsList = useMemo(() => events || DEFAULT_EVENTS, [events]);
  
  // Use refs for callbacks to avoid recreating resetTimer
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);

  // Update refs when props change
  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
    idleTimeRef.current = idleTime;
  }, [onIdle, onActive, idleTime]);

  // Sync ref with state
  useEffect(() => {
    isIdleRef.current = isIdle;
    if (debug) {
      console.log(`[useIdleTimer] isIdle changed to: ${isIdle}`);
    }
  }, [isIdle, debug]);

  // Stable resetTimer function - only recreated if debug changes
  const resetTimer = useCallback(() => {
    eventCountRef.current++;
    
    if (debug) {
      console.log(`[useIdleTimer] resetTimer called (event #${eventCountRef.current}), currently idle: ${isIdleRef.current}`);
    }

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // If was idle, trigger active callback
    if (isIdleRef.current && onActiveRef.current) {
      if (debug) console.log("[useIdleTimer] Triggering onActive callback");
      onActiveRef.current();
    }
    
    // Update both state and ref
    const wasIdle = isIdleRef.current;
    isIdleRef.current = false;
    
    // Only update state if it changed to avoid unnecessary re-renders
    if (wasIdle) {
      if (debug) console.log("[useIdleTimer] Setting isIdle to false");
      setIsIdle(false);
    }

    // Set new idle timer using ref to get latest value
    timerRef.current = setTimeout(() => {
      if (debug) console.log(`[useIdleTimer] Idle timeout reached after ${idleTimeRef.current}ms`);
      isIdleRef.current = true;
      setIsIdle(true);
      if (onIdleRef.current) {
        if (debug) console.log("[useIdleTimer] Triggering onIdle callback");
        onIdleRef.current();
      }
    }, idleTimeRef.current);
  }, [debug]); // Only recreate if debug changes

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (debug) {
      console.log(`[useIdleTimer] Setting up event listeners for: ${eventsList.join(", ")}`);
      console.log(`[useIdleTimer] Idle timeout: ${idleTime}ms`);
    }

    // Add event listeners
    eventsList.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));

    // Start timer on mount
    resetTimer();

    return () => {
      if (debug) console.log("[useIdleTimer] Cleaning up");
      if (timerRef.current) clearTimeout(timerRef.current);
      eventsList.forEach((e) => window.removeEventListener(e, resetTimer));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTimer]); // Only re-run when resetTimer changes (which is only when debug changes)

  return { isIdle, resetTimer };
}