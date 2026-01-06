import { createContext } from "react";
import { ScreensaverContextType } from "../types";

export const ScreensaverContext =
  createContext<ScreensaverContextType | null>(null);
