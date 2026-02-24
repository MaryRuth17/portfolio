"use client";

import { Github, Linkedin, Twitter, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 py-8 transition-colors duration-500">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-125"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-125"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-125"
            aria-label="Twitter"
          >
            <Twitter className="h-4 w-4" />
          </a>
        </div>
        
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          Crafted with{" "}
          <Heart className="h-3.5 w-3.5 text-accent animate-pulse" style={{ animationDuration: "2s" }} />{" "}
          and passion
        </p>
        
        <p className="text-sm text-muted-foreground transition-colors duration-300">
          &copy; {currentYear} Alex Chen
        </p>
      </div>
    </footer>
  );
}
