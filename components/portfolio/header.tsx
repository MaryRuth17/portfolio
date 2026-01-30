"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Github, Linkedin, Twitter } from "lucide-react";
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
  const navRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg transition-colors duration-500">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
<a
          href="#"
          className="text-lg font-semibold tracking-tight transition-all duration-300 hover:text-accent hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="gradient-text">YRIE</span>
        </a>

        {/* Navigation - Desktop */}
        <nav ref={navRef} className="relative hidden items-center gap-1 sm:flex" role="navigation" aria-label="Main navigation">
          {/* Animated background indicator */}
          <span 
            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-secondary/80 transition-all duration-300 ease-out"
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
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Social links - Desktop */}
          <div className="hidden items-center gap-1 sm:flex">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>

          <ThemeSwitcher />
        </div>
      </div>

{/* Mobile Navigation */}
      <nav ref={mobileNavRef} className="relative flex items-center justify-center gap-1 border-t border-border/50 py-2 sm:hidden" role="navigation" aria-label="Mobile navigation">
        {/* Mobile animated indicator */}
        <span 
          className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-secondary/80 transition-all duration-300 ease-out"
          style={{ left: mobileIndicatorStyle.left, width: mobileIndicatorStyle.width }}
        />
        {navItems.map((item) => (
          <button
            key={item.id}
            data-section={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300",
              activeSection === item.id && activeSection !== "home"
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
