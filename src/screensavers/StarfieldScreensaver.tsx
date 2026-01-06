import React, { useEffect, useRef } from "react";
import "../styles/starfield.css";

interface Star {
  x: number;
  y: number;
  z: number;
}

export const StarfieldScreensaver: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const STAR_COUNT = 400;

    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width - centerX,
      y: Math.random() * height - centerY,
      z: Math.random() * width,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";

      for (const star of starsRef.current) {
        star.z -= 4;

        if (star.z <= 0) {
          star.x = Math.random() * width - centerX;
          star.y = Math.random() * height - centerY;
          star.z = width;
        }

        const x = (star.x / star.z) * width + centerX;
        const y = (star.y / star.z) * height + centerY;
        const size = (1 - star.z / width) * 3;

        ctx.beginPath();
        ctx.arc(x, y, size > 0 ? size : 0, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ris-starfield" />;
};
