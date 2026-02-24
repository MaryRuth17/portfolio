"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import Shuffle from "@/components/ui/Shuffle";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    logo: "/icons/facebook.png",
    handle: "Mary Ruth Relator",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    logo: "/icons/instagram.png",
    handle: "Your Instagram",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    logo: "/icons/linkedin.png",
    handle: "Your LinkedIn",
  },
  {
    name: "Credly",
    href: "https://credly.com",
    logo: "/icons/credly.png",
    handle: "Your Credly",
  },
  {
    name: "Gmail",
    href: "mailto:your.email@gmail.com",
    logo: "/icons/gmail.png",
    handle: "your.email@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    logo: "/icons/github.png",
    handle: "Your GitHub",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border/50 py-10 transition-colors duration-500">
      <div className="flex flex-col gap-10">
        {/* Contact content */}
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: text */}
            <div className="space-y-4 lg:w-2/5 lg:sticky lg:top-28">
              <Shuffle
                text="Let's Work Together"
                tag="h2"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={false}
                triggerOnHover
                respectReducedMotion={true}
                loop={false}
                loopDelay={0}
              />
              <p className="max-w-sm text-muted-foreground">
                {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
              </p>
            </div>

            {/* Right: social links grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((link, index) => {
              const isMailto = link.href.startsWith('mailto:');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  className="smooth-card group flex items-center gap-4 rounded-xl p-4 border border-border/50 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                    <img src={link.logo} alt={link.name} className="h-6 w-6 object-contain" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold transition-colors duration-300 group-hover:text-foreground">{link.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{link.handle}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              );
            })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="w-full pt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground transition-colors duration-300">
            &copy; {currentYear} Mary Ruth Relator
          </p>
        </div>
      </div>
    </footer>
  );
}
