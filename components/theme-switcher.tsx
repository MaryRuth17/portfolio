"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { id: "light", icon: Sun, label: "Daylight mode" },
  { id: "dark", icon: Moon, label: "Night mode" },
  { id: "pink", icon: Flower2, label: "Pink mode" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update indicator position
  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    
    const activeIndex = themes.findIndex(t => t.id === theme);
    if (activeIndex !== -1) {
      // Each button is 32px (h-8 w-8) + 4px gap
      setIndicatorStyle({ left: 4 + activeIndex * 36 });
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-full bg-secondary/50 p-1">
        <div className="h-8 w-8 rounded-full" />
        <div className="h-8 w-8 rounded-full" />
        <div className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center gap-1 rounded-full bg-secondary/50 p-1 backdrop-blur-sm transition-colors duration-500"
    >
      {/* Animated indicator */}
      <span 
        className="absolute top-1 h-8 w-8 rounded-full bg-background shadow-sm transition-all duration-300 ease-out"
        style={{ left: indicatorStyle.left }}
      />
      
      {themes.map((themeOption) => {
        const IconComponent = themeOption.icon;
        return (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={cn(
              "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300",
              theme === themeOption.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={themeOption.label}
          >
            <IconComponent className={cn(
              "h-4 w-4 transition-transform duration-300",
              theme === themeOption.id && "scale-110"
            )} />
          </button>
        );
      })}
    </div>
  );
}
