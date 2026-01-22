import { ReactNode, ComponentType } from "react";

/**
 * Context type for the screensaver state
 */
export interface ScreensaverContextType {
  /** Whether the user is currently idle */
  isIdle: boolean;
}

/**
 * Props for the ScreensaverManager component
 */
export interface ScreensaverManagerProps<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  /** Child components to render underneath the screensaver */
  children: ReactNode;
  /** The screensaver component to display when idle */
  component: ComponentType<T>;
  /** Props to pass to the screensaver component */
  componentProps?: T;
  /** Idle timeout in milliseconds (default: 5000) */
  timeout?: number;
  /** Whether the screensaver is active (default: true) */
  active?: boolean;
  /** z-index for the screensaver overlay (default: 50) */
  zIndex?: number;
  /** Callback when the screensaver stops */
  onScreenSaverStop?: () => void;
}

/**
 * Props for the BouncingScreensaver component
 */
export interface BouncingScreensaverProps {
  /** Custom text to display (default: "System Standby") */
  customText?: string;
}

/**
 * Props for the ImageSliderScreensaver component
 */
export interface ImageSliderScreensaverProps {
  /** Custom text to display at the bottom */
  customText?: string;
  /** Whether to show the current time (default: true) */
  showTime?: boolean;
  /** Whether to show the current date (default: true) */
  showDate?: boolean;
  /** Array of image URLs to display */
  images?: string[];
  /** Interval between slides in milliseconds (default: 6000) */
  interval?: number;
}
