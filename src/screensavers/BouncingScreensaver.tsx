import React, { useEffect, useRef } from "react";
import { Monitor } from "lucide-react";
import { BouncingScreensaverProps } from "../types";

export const BouncingScreensaver: React.FC<BouncingScreensaverProps> = ({
  customText = "System Standby",
}) => {
  const elRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 100, y: 100 });
  const vel = useRef({ x: 2.5, y: 2.5 });

  useEffect(() => {
    let id: number;

    const animate = () => {
      if (!elRef.current) return;

      const { innerWidth, innerHeight } = window;
      const el = elRef.current;
      const maxX = innerWidth - el.offsetWidth;
      const maxY = innerHeight - el.offsetHeight;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      if (pos.current.x <= 0 || pos.current.x >= maxX) vel.current.x *= -1;
      if (pos.current.y <= 0 || pos.current.y >= maxY) vel.current.y *= -1;

      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      id = requestAnimationFrame(animate);
    };

    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
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
      }}
    >
      <Monitor />
      <span>{customText}</span>
    </div>
  );
};
