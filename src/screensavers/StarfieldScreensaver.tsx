import React, { useEffect, useRef } from "react";
import "../styles/starfield.css";

interface Star {
  x: number;
  y: number;
  z: number;
}

interface StarfieldScreensaverProps {
  /** Number of stars to display */
  starCount?: number;
  /** Speed of star movement */
  speed?: number;
}

export const StarfieldScreensaver: React.FC<StarfieldScreensaverProps> = ({
  starCount = 400,
  speed = 4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0, centerX: 0, centerY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initializeDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      dimensionsRef.current = {
        width,
        height,
        centerX: width / 2,
        centerY: height / 2,
      };

      return dimensionsRef.current;
    };

    const initializeStars = () => {
      const { width, height, centerX, centerY } = dimensionsRef.current;
      
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * width - centerX,
        y: Math.random() * height - centerY,
        z: Math.random() * width,
      }));
    };

    initializeDimensions();
    initializeStars();

    const draw = () => {
      const { width, height, centerX, centerY } = dimensionsRef.current;

      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";

      for (const star of starsRef.current) {
        star.z -= speed;

        // Reset star when it goes past the screen
        if (star.z <= 0) {
          star.x = Math.random() * width - centerX;
          star.y = Math.random() * height - centerY;
          star.z = width;
        }

        // Project 3D coordinates to 2D
        const x = (star.x / star.z) * width + centerX;
        const y = (star.y / star.z) * height + centerY;
        const size = Math.max(0, (1 - star.z / width) * 3);

        // Only draw if star is visible
        if (x >= 0 && x <= width && y >= 0 && y <= height && size > 0) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      initializeDimensions();
      initializeStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="ris-starfield"
      aria-label="Starfield screensaver animation"
    />
  );
};