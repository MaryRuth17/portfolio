"use client";

import { Heart, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function Header({ activeSection, onNavigate, sidebarOpen, onToggleSidebar }: HeaderProps) {
  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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

        {/* Right: theme + heart */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeSwitcher />
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                sidebarOpen
                  ? "text-accent"
                  : "text-muted-foreground hover:text-accent"
              )}
            >
              <Heart
                size={18}
                strokeWidth={2}
                className="transition-all duration-300"
                fill={sidebarOpen ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>
      </div>

      {/* ── Floating pill — Mobile (hamburger) ── */}
      <div
        className={cn(
          "pointer-events-auto flex sm:hidden w-full flex-col rounded-2xl border backdrop-blur-xl transition-all duration-500 overflow-hidden",
          scrolled
            ? "border-border/70 bg-background/90 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.25)]"
            : "border-border/40 bg-background/75 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.12)]"
        )}
      >
        {/* ── Top row: logo | controls + hamburger ── */}
        <div className="flex items-center justify-between gap-2 px-4 py-3">
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

          {/* Right controls */}
          <div className="flex items-center gap-1 shrink-0">
            <ThemeSwitcher />
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                className={cn(
                  "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                  "hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  sidebarOpen ? "text-accent" : "text-muted-foreground hover:text-accent"
                )}
              >
                <Heart size={16} strokeWidth={2} className="transition-all duration-300" fill={sidebarOpen ? "currentColor" : "none"} />
              </button>
            )}
            {/* Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {mobileMenuOpen
                ? <X size={18} strokeWidth={2} className="transition-transform duration-300" />
                : <Menu size={18} strokeWidth={2} className="transition-transform duration-300" />}
            </button>
          </div>
        </div>

        {/* ── Dropdown nav (vertically stacked) ── */}
        <nav
          role="navigation"
          aria-label="Mobile navigation"
          className={cn(
            "flex flex-col gap-1 px-3 overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-48 pb-3 opacity-100" : "max-h-0 pb-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="h-px w-full bg-border/40 mb-1" />
          {navItems.map((item) => (
            <button
              key={item.id}
              data-section={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                activeSection === item.id && activeSection !== "home"
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-accent/5 hover:text-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full bg-accent transition-all duration-300",
                    activeSection === item.id && activeSection !== "home" ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                />
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
