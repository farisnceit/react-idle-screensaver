import React, { useEffect, useRef } from "react";
import { Monitor } from "lucide-react";
import { BouncingScreensaverProps } from "../types";

export const BouncingScreensaver: React.FC<BouncingScreensaverProps> = ({
  customText = "System Standby",
}) => {
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 100, y: 100 });
  const vel = useRef({ x: 2.5, y: 2.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!elRef.current) return;

      const { innerWidth, innerHeight } = window;
      const el = elRef.current;
      const maxX = innerWidth - el.offsetWidth;
      const maxY = innerHeight - el.offsetHeight;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Bounce off edges
      if (pos.current.x <= 0 || pos.current.x >= maxX) {
        vel.current.x *= -1;
        // Clamp position to prevent getting stuck
        pos.current.x = Math.max(0, Math.min(maxX, pos.current.x));
      }
      if (pos.current.y <= 0 || pos.current.y >= maxY) {
        vel.current.y *= -1;
        pos.current.y = Math.max(0, Math.min(maxY, pos.current.y));
      }

      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elRef}
      style={{
        position: "absolute",
        padding: "1rem 2rem",
        borderRadius: "9999px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        willChange: "transform", // Performance optimization
        pointerEvents: "none", // Allow clicks to pass through
      }}
    >
      <Monitor />
      <span>{customText}</span>
    </div>
  );
};