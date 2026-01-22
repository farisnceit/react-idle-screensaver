import React, { useEffect, useState } from "react";

export const SimpleTestScreensaver: React.FC = () => {
  const [time, setTime] = useState(() => new Date());
  const [color, setColor] = useState("#ff0000");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
    let index = 0;
    const colorTimer = setInterval(() => {
      index = (index + 1) % colors.length;
      setColor(colors[index]);
    }, 2000);
    return () => clearInterval(colorTimer);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          fontSize: "120px",
          fontWeight: "bold",
          color: color,
          textShadow: "0 0 20px rgba(255,255,255,0.5)",
          marginBottom: "20px",
          transition: "color 1s ease",
        }}
      >
        {time.toLocaleTimeString()}
      </div>
      <div
        style={{
          fontSize: "32px",
          opacity: 0.8,
        }}
      >
        SCREENSAVER IS ACTIVE ✓
      </div>
      <div
        style={{
          fontSize: "18px",
          opacity: 0.6,
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        Move your mouse or press any key to exit
      </div>
    </div>
  );
};
