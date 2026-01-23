import { useIdleTimer as useReactIdleTimer, type EventsType } from "react-idle-timer";
import { useCallback } from "react";

interface UseIdleTimerOptions {
  /** Idle timeout in milliseconds */
  idleTime: number;
  /** Callback when user becomes idle */
  onIdle?: () => void;
  /** Callback when user becomes active */
  onActive?: () => void;
  /** Events to listen for user activity */
  events?: EventsType[];
  /** Enable debug logging */
  debug?: boolean;
}

export function useIdleTimer({
  idleTime,
  onIdle,
  onActive,
  events,
  debug = false,
}: UseIdleTimerOptions) {
  const handleOnIdle = useCallback(() => {
    if (debug) console.log("[useIdleTimer] User is idle");
    onIdle?.();
  }, [onIdle, debug]);

  const handleOnActive = useCallback(() => {
    if (debug) console.log("[useIdleTimer] User is active");
    onActive?.();
  }, [onActive, debug]);

  const { isIdle, reset } = useReactIdleTimer({
    timeout: idleTime,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    events: events,
    debounce: 500,
  });

  return {
    isIdle: isIdle(),
    resetTimer: reset,
  };
}