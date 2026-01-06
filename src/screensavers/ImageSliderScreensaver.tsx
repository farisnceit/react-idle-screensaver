import React, { useEffect, useState } from "react";
import "../styles/image-slider.css";
import { ImageSliderScreensaverProps } from "../types";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
  "https://images.unsplash.com/photo-1534081333815-ae5019106622?w=1920&q=80",
];

export const ImageSliderScreensaver: React.FC<ImageSliderScreensaverProps> = ({
  customText = "Photography Collection",
  showTime = true,
  showDate = true,
  images = DEFAULT_IMAGES,
  interval = 6000,
}) => {
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());

  // Slide rotation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Clock update
  useEffect(() => {
    if (typeof window === "undefined" || (!showTime && !showDate)) return;

    const clock = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clock);
  }, [showTime, showDate]);

  return (
    <div className="ris-slider">
      {images.map((src, i) => (
        <div
          key={i}
          className={`ris-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
          role="img"
          aria-label={`Slide ${i + 1}`}
        />
      ))}

      <div className="ris-overlay-gradient" />

      <div className="ris-slider-content">
        <div className="ris-clock">
          {showTime && (
            <div className="ris-time" role="timer" aria-live="off">
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