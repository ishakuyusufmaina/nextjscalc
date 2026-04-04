"use client";

import { useEffect, useRef, useState } from "react";

const colors = ["green", "yellow", "orange", "red", "black"];

export const BorderTimer = ({
  startTime,
  onStart,
  onFinish,
  size = 12,
}) => {
  const dotRef = useRef(null);
  const parentRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [radius, setRadius] = useState(50);

  useEffect(() => {
    if (dotRef.current) {
      parentRef.current = dotRef.current.parentElement;

      if (parentRef.current) {
        const computed = getComputedStyle(parentRef.current).position;
        if (computed === "static") {
          parentRef.current.style.position = "relative";
        }

        const update = () => {
          const r =
            Math.min(
              parentRef.current.offsetWidth,
              parentRef.current.offsetHeight
            ) / 2;
          setRadius(r);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
      }
    }
  }, []);

  useEffect(() => {
    onStart?.();

    let start = null;
    let animationId;

    const step = (timestamp) => {
      if (!start) start = timestamp;

      const elapsed = (timestamp - start) / 1000;
      const p = Math.min(elapsed / startTime, 1);

      setProgress(p);

      if (p < 1) {
        animationId = requestAnimationFrame(step);
      } else {
        onFinish?.();
      }
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [startTime]);

  const angle = progress * 360;
  const colorIndex = Math.floor(progress * (colors.length - 1));
  const visible = Math.sin(progress * startTime * 10) > 0.3;

  return (
    <div
      ref={dotRef}
      className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: visible ? colors[colorIndex] : "transparent",
        transform: `rotate(${angle}deg) translateY(${radius}px)`,
        transformOrigin: "top center",
      }}
    />
  );
};
