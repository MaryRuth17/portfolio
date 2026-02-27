"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setIsMobile(!hasFinePointer);
    if (!hasFinePointer) return () => {};

    document.body.classList.add("custom-cursor");

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!(
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("a") ||
          target.closest("button") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer") ||
          target.closest("[data-interactive]")
        )
      );
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

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
    };
  }, [isVisible]);

  if (isMobile) return null;

  // Default: small diamond (square rotated 45°)
  // Hover: larger square (0° rotation)
  // Click: compress scale
  const size = isHovering ? 20 : 8;
  const rotate = isHovering ? 0 : 45;
  const scale = isClicking ? 0.6 : 1;
  const bg = isHovering ? "transparent" : "#ffffff";
  const border = isHovering ? "1.5px solid #ffffff" : "none";

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
        opacity: isVisible ? 1 : 0,
        backgroundColor: bg,
        border,
        mixBlendMode: "difference",
        transition:
          "width 0.3s cubic-bezier(0.25,1,0.5,1), height 0.3s cubic-bezier(0.25,1,0.5,1), transform 0.3s cubic-bezier(0.25,1,0.5,1), background-color 0.3s ease, border 0.3s ease, opacity 0.2s ease",
      }}
    />
  );
}
