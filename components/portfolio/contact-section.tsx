"use client";

import React from "react"

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Shuffle from "@/components/ui/Shuffle";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    handle: "Your Facebook",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    handle: "Your Instagram",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    handle: "Your LinkedIn",
  },
  {
    name: "Credly",
    href: "https://credly.com",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm4.8-9.6c0 2.651-2.149 4.8-4.8 4.8s-4.8-2.149-4.8-4.8 2.149-4.8 4.8-4.8 4.8 2.149 4.8 4.8z"/>
      </svg>
    ),
    handle: "Your Credly",
  },
  {
    name: "Gmail",
    href: "mailto:your.email@gmail.com",
    icon: Mail,
    handle: "your.email@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    handle: "Your GitHub",
  },
];

export function ContactSection() {
  const { ref: leftRef, isRevealed: leftRevealed } = useScrollReveal();

  return (
    <section className="py-6 lg:py-8">
      <div className="space-y-8">
        <div 
          ref={leftRef}
          className={`space-y-8 scroll-reveal ${leftRevealed ? 'revealed' : ''}`}
        >
          <div className="space-y-4 text-center">
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
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {"I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."}
            </p>
          </div>

          {/* Social links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
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
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
                    <IconComponent />
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
    </section>
  );
}
