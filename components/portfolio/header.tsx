"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  // Track scroll for shadow + progress bar
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update indicator position on section change
  useEffect(() => {
    const updateIndicator = () => {
      // If we're on home section (hero), hide the indicator or default to about
      const targetSection = activeSection === "home" ? "about" : activeSection;
      
      // Desktop nav
      if (navRef.current) {
        const activeButton = navRef.current.querySelector(`[data-section="${targetSection}"]`) as HTMLButtonElement;
        if (activeButton) {
          setIndicatorStyle({
            left: activeButton.offsetLeft,
            width: activeSection === "home" ? 0 : activeButton.offsetWidth,
          });
        }
      }
      // Mobile nav
      if (mobileNavRef.current) {
        const activeButton = mobileNavRef.current.querySelector(`[data-section="${targetSection}"]`) as HTMLButtonElement;
        if (activeButton) {
          setMobileIndicatorStyle({
            left: activeButton.offsetLeft,
            width: activeSection === "home" ? 0 : activeButton.offsetWidth,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-start justify-center pt-4 px-4 pointer-events-none">
      {/* Scroll progress bar — full width behind pill */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-accent transition-[width] duration-75 ease-linear pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ── Floating pill — Desktop ── */}
      <div
        className={cn(
          "pointer-events-auto hidden sm:flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border px-5 py-3 backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-border/70 bg-background/90 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]"
            : "border-border/40 bg-background/75 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)]"
        )}
      >
        {/* Logo */}
        <a
          href="#"
          className="group flex flex-col items-start leading-none shrink-0 transition-all duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="gradient-text text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-accent">
            YRIE
          </span>
          <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-muted-foreground/60 transition-colors duration-300 group-hover:text-accent/60">
            Portfolio
          </span>
        </a>

        {/* Navigation */}
        <nav
          ref={navRef}
          className="relative flex items-center gap-0.5"
          role="navigation"
          aria-label="Main navigation"
        >
          <span
            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-accent/10 transition-all duration-300 ease-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
          {navItems.map((item) => (
            <button
              key={item.id}
              data-section={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300",
                activeSection === item.id && activeSection !== "home"
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent transition-all duration-300",
                  activeSection === item.id && activeSection !== "home"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                )}
              />
            </button>
          ))}
        </nav>

        {/* Right: theme */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeSwitcher />
        </div>
      </div>

      {/* ── Floating pill — Mobile ── */}
      <div
        className={cn(
          "pointer-events-auto flex sm:hidden w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3 backdrop-blur-xl transition-all duration-500",
          scrolled
            ? "border-border/70 bg-background/90 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]"
            : "border-border/40 bg-background/75 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)]"
        )}
      >
        {/* Logo */}
        <a
          href="#"
          className="group flex flex-col items-start leading-none shrink-0 transition-all duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="gradient-text text-base font-bold tracking-tight">YRIE</span>
          <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-muted-foreground/60">Portfolio</span>
        </a>

        {/* Nav items */}
        <nav
          ref={mobileNavRef}
          className="relative flex items-center gap-0.5"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <span
            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-accent/10 transition-all duration-300 ease-out"
            style={{ left: mobileIndicatorStyle.left, width: mobileIndicatorStyle.width }}
          />
          {navItems.map((item) => (
            <button
              key={item.id}
              data-section={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "relative z-10 px-3 py-2 text-xs font-medium transition-all duration-300",
                activeSection === item.id && activeSection !== "home"
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent transition-all duration-300",
                  activeSection === item.id && activeSection !== "home"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                )}
              />
            </button>
          ))}
        </nav>

        {/* Theme */}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
