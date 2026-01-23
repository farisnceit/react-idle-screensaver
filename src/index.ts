// Main components
export { ScreensaverManager } from "./manager/ScreensaverManager";
export { ScreensaverManagerDebug } from "./manager/ScreensaverManagerDebug";

// Hooks
export { useIdleTimer } from "./hooks/useIdleTimer";

// Built-in screensavers
export { BouncingScreensaver } from "./screensavers/BouncingScreensaver";
export { MatrixScreensaver } from "./screensavers/MatrixScreensaver";
export { StarfieldScreensaver } from "./screensavers/StarfieldScreensaver";
export { ImageSliderScreensaver } from "./screensavers/ImageSliderScreensaver";
export { SimpleTestScreensaver } from "./screensavers/SimpleTestScreensaver";

// Types
export * from "./types";

// Context (if users want to create custom screensavers)
export { ScreensaverContext } from "./context/ScreensaverContext";