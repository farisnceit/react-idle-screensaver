import React, { useEffect, useRef, useState } from "react";
import { ScreensaverContext } from "../context/ScreensaverContext";
import { useIdleTimer } from "../hooks/useIdleTimer";
import { ScreensaverManagerProps } from "../types";

export function ScreensaverManager<
  T extends Record<string, unknown> = Record<string, unknown>
>({
  children,
  component: ScreensaverComponent,
  componentProps,
  timeout = 5000,
  active = true,
  zIndex = 9999,
  onScreenSaverStop,
  debug = false,
}: ScreensaverManagerProps<T>) {
  const { isIdle } = useIdleTimer({ idleTime: timeout, debug });
  const shouldShow = active && isIdle;
  const wasShowing = useRef(false);

  if (debug) {
    console.log(`[ScreensaverManager] Render - isIdle: ${isIdle}, shouldShow: ${shouldShow}`);
  }

  useEffect(() => {
    if (wasShowing.current && !shouldShow) {
      onScreenSaverStop?.();
    }
    wasShowing.current = shouldShow;
  }, [shouldShow, onScreenSaverStop]);

  if (debug && shouldShow) {
    console.log('[ScreensaverManager] Rendering screensaver overlay');
  }

  return (
    <ScreensaverContext.Provider value={{ isIdle }}>
      {/* Always render children to preserve component state and form inputs */}
      <div style={{ filter: shouldShow ? "blur(4px)" : "none" }}>
        {children}
      </div>

      {/* Conditionally render screensaver overlay */}
      {shouldShow && (
        <div
          className="screensaver-overlay"
          data-screensaver-active="true"
          data-is-idle={isIdle.toString()}
          data-should-show={shouldShow.toString()}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex,
            backgroundColor: debug ? 'rgba(255,0,0,0.1)' : undefined, // Red tint in debug mode
          }}
        >
          <ScreensaverComponent {...(componentProps as T)} />
        </div>
      )}
    </ScreensaverContext.Provider>
  );
}
