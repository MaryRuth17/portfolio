"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [delayedPosition, setDelayedPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsMobile(!hasFinePointer);

    if (!hasFinePointer) return () => {};

    document.body.classList.add("custom-cursor");
    
    // Smooth follow for the ring
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;

    const animate = () => {
      const ease = 0.15;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      setDelayedPosition({ x: currentX, y: currentY });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const updatePosition = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("[data-interactive]");
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (isMobile) return null;

  const dotSize = isClicking ? 12 : isHovering ? 10 : 8;
  const ringSize = isClicking ? 40 : isHovering ? 56 : 40;

  return (
    <>
      {/* Dot - follows cursor exactly */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-normal"
        style={{
          left: position.x,
          top: position.y,
          width: dotSize,
          height: dotSize,
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? 1 : 0,
          background: "oklch(0.65 0.22 350)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
      {/* Ring - follows with smooth delay */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border-2 mix-blend-normal"
        style={{
          left: delayedPosition.x,
          top: delayedPosition.y,
          width: ringSize,
          height: ringSize,
          transform: `translate(-50%, -50%)`,
          opacity: isVisible ? (isHovering ? 0.6 : 0.8) : 0,
          borderColor: "oklch(0.65 0.22 350)",
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
