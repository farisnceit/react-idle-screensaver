import React, { useEffect, useRef } from "react";

export const MatrixScreensaver: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01";
    const fontSize = 14;
    const cols = canvas.width / fontSize;
    const drops = Array(Math.floor(cols)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height ? 0 : y + 1;
      });
    };

    const id = setInterval(draw, 33);
    return () => clearInterval(id);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};
