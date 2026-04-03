"use client";

import { useEffect, useRef, useState } from "react";

interface BorderTimerProps {
  startTime: number; // seconds
  onStart?: () => void;
  onFinish?: () => void;
  size?: number; // size of the moving dot
}

const colors = ["green", "yellow", "orange", "red", "black"];

export const BorderTimer: React.FC<BorderTimerProps> = ({
  startTime,
  onStart,
  onFinish,
  size = 12,
}) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Get direct parent of the dot
    if (dotRef.current) {
      parentRef.current = dotRef.current.parentElement as HTMLElement;

      if (parentRef.current) {
        // Make parent relative if not already
        const computed = window.getComputedStyle(parentRef.current).position;
        if (computed === "static") {
          parentRef.current.style.position = "relative";
        }
      }
    }

    onStart?.();

    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = (timestamp - start) / 1000; // seconds
      const p = Math.min(elapsed / startTime, 1);
      setProgress(p);

      const colorStep = Math.floor(p * (colors.length - 1));
      setColorIndex(colorStep);

      // blinking effect
      const blink = Math.sin(elapsed * 10) > 0.3;
      setVisible(blink);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        onFinish?.();
      }
    };

    const animation = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animation);
  }, [startTime, onStart, onFinish]);

  // Calculate angle
  const angle = progress * 360;
  const radius = parentRef.current
    ? Math.min(parentRef.current.offsetWidth, parentRef.current.offsetHeight) / 2
    : 50;

  return (
    <div
      ref={dotRef}
      className={`absolute top-0 left-1/2 -translate-x-1/2 w-${size} h-${size} rounded-full`}
      style={{
        backgroundColor: visible ? colors[colorIndex] : "transparent",
        transform: `rotate(${angle}deg) translate(${radius}px)`,
        transformOrigin: "top center",
        transition: "background-color 0.2s",
      }}
    ></div>
  );
};
