import React, { useEffect, useRef } from "react";

interface MatrixScreensaverProps {
  /** Characters to display in the matrix effect */
  characters?: string;
  /** Font size in pixels */
  fontSize?: number;
  /** Animation speed (lower = faster) */
  speed?: number;
  /** Matrix color */
  color?: string;
}

export const MatrixScreensaver: React.FC<MatrixScreensaverProps> = ({
  characters = "01アイウエオカキクケコサシスセソタチツテト",
  fontSize = 14,
  speed = 33,
  color = "#0f0",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        ctx.fillText(char, x, y * fontSize);
        
        // Reset drop to top with random chance
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] = y + 1;
        }
      });
    };

    const intervalId = setInterval(draw, speed);

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
      drops.length = Math.floor(canvas.width / fontSize);
      drops.fill(1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      // Capture current value for cleanup
      const currentRaf = rafRef.current;
      if (currentRaf) cancelAnimationFrame(currentRaf);
      window.removeEventListener("resize", handleResize);
    };
  }, [characters, fontSize, speed, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        background: "#000",
      }}
      aria-label="Matrix screensaver animation"
    />
  );
};