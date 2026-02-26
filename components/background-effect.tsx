"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LightRays from "@/components/ui/LightRays";

export function BackgroundEffect() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!mounted) return null;

  // Theme-specific colors with pink tint
  const colors = {
    light: "#e998bb",     // Light pink-gray for day mode
    dark: "#8B7A8F",      // Dark pink-gray for night mode  
    pink: "#e24d98"       // Hot pink for pink mode
  };

  const currentColor = colors[theme as keyof typeof colors] || colors.dark;

  return (
    <div 
      key={theme}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <LightRays
        key={`lightrays-${theme}`}
        raysOrigin="top-center"
        raysColor={currentColor}
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={hasFinePointer}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />
    </div>
  );
}