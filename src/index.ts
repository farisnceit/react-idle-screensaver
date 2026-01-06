// Main components
export { ScreensaverManager } from "./manager/ScreensaverManager";

// Hooks
export { useIdleTimer } from "./hooks/useIdleTimer";

// Built-in screensavers
export { BouncingScreensaver } from "./screensavers/BouncingScreensaver";
export { MatrixScreensaver } from "./screensavers/MatrixScreensaver";
export { StarfieldScreensaver } from "./screensavers/StarfieldScreensaver";
export { ImageSliderScreensaver } from "./screensavers/ImageSliderScreensaver";

// Types
export * from "./types";

// Context (if users want to create custom screensavers)
export { ScreensaverContext } from "./context/ScreensaverContext";