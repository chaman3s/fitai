'use client';

import { useEffect, useState } from "react";

export default function TopLineLoader({ loading }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!loading) {
      setWidth(0); // reset when loading stops
      return;
    }

    setWidth(10); // start loader

    const interval = setInterval(() => {
      setWidth(prev => (prev < 90 ? prev + 7 : prev));
    }, 8000);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${width}%`,
        height: "4px",
        backgroundColor: "white",
        zIndex: 999999,
        transition: "width 0.3s ease",
      }}
    />
  );
}
