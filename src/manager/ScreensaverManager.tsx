import React, { ComponentType, useEffect, useRef } from "react";
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
  zIndex = 50,
  onScreenSaverStop,
}: ScreensaverManagerProps<T>) {
  const isIdle = useIdleTimer(timeout, active);
  const shouldShow = active && isIdle;
  const wasShowing = useRef(false);

  useEffect(() => {
    if (wasShowing.current && !shouldShow) {
      onScreenSaverStop?.();
    }
    wasShowing.current = shouldShow;
  }, [shouldShow, onScreenSaverStop]);

  return (
    <ScreensaverContext.Provider value={{ isIdle }}>
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <div style={{ filter: shouldShow ? "blur(4px)" : undefined }}>
          {children}
        </div>

        {shouldShow && (
          <div style={{ position: "fixed", inset: 0, zIndex }}>
            <ScreensaverComponent {...(componentProps as T)} />
          </div>
        )}
      </div>
    </ScreensaverContext.Provider>
  );
}
