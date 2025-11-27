import React, { useMemo, useRef } from "react";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const Tilt = ({
  children,
  className = "",
  options = {},
  ...rest
}) => {
  const {
    max = 15,
    perspective = 600,
    scale = 1.02,
    speed = 200,
  } = options;

  const wrapperRef = useRef(null);

  const style = useMemo(
    () => ({
      transition: `transform ${speed}ms ease-out`,
      transform: "perspective(" + perspective + "px)",
    }),
    [perspective, speed]
  );

  const handleMove = (event) => {
    const node = wrapperRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = clamp(((x / rect.width) * 2 - 1) * max, -max, max);
    const rotateX = clamp(((y / rect.height) * -2 + 1) * max, -max, max);

    node.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
  };

  const handleLeave = () => {
    const node = wrapperRef.current;
    if (!node) return;
    node.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Tilt;
