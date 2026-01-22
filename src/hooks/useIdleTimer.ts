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
  /** Enable debug logging */
  debug?: boolean;
}

export function useIdleTimer({
  idleTime,
  onIdle,
  onActive,
  events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"],
  debug = false,
}: UseIdleTimerOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isIdle, setIsIdle] = useState(false);
  const isIdleRef = useRef(false);
  const eventCountRef = useRef(0);
  
  // Use refs for callbacks to avoid recreating resetTimer
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);

  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  }, [onIdle, onActive]);

  // Sync ref with state
  useEffect(() => {
    isIdleRef.current = isIdle;
    if (debug) {
      console.log(`[useIdleTimer] isIdle changed to: ${isIdle}`);
    }
  }, [isIdle, debug]);

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

    // Set new idle timer
    timerRef.current = setTimeout(() => {
      if (debug) console.log(`[useIdleTimer] Idle timeout reached after ${idleTime}ms`);
      isIdleRef.current = true;
      setIsIdle(true);
      if (onIdleRef.current) {
        if (debug) console.log("[useIdleTimer] Triggering onIdle callback");
        onIdleRef.current();
      }
    }, idleTime);
  }, [idleTime, debug]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (debug) {
      console.log(`[useIdleTimer] Setting up event listeners for: ${events.join(", ")}`);
      console.log(`[useIdleTimer] Idle timeout: ${idleTime}ms`);
    }

    // Add event listeners
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }));

    // Start timer on mount
    const initTimer = setTimeout(() => resetTimer(), 0);

    return () => {
      if (debug) console.log("[useIdleTimer] Cleaning up");
      clearTimeout(initTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [events, resetTimer, debug, idleTime]);

  return { isIdle, resetTimer };
}