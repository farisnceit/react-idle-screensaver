import React, { useEffect, useRef, useState } from "react";
import "../styles/image-slider.css";
import { ImageSliderScreensaverProps } from "../types";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1534081333815-ae5019106622",
];

export const ImageSliderScreensaver: React.FC<ImageSliderScreensaverProps> = ({
  customText = "Photography Collection",
  showTime = true,
  showDate = true,
}) => {
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Slide rotation
  useEffect(() => {
    if (typeof window === "undefined") return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % DEFAULT_IMAGES.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Clock update
  useEffect(() => {
    if (!showTime && !showDate) return;

    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clock);
  }, [showTime, showDate]);

  return (
    <div className="ris-slider">
      {DEFAULT_IMAGES.map((src, i) => (
        <div
          key={i}
          className={`ris-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}

      <div className="ris-overlay-gradient" />

      <div className="ris-slider-content">
        <div className="ris-clock">
          {showTime && (
            <div className="ris-time">
              {now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
          {showDate && (
            <div className="ris-date">
              {now.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </div>

        {customText && (
          <div className="ris-footer">
            <span>{customText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
