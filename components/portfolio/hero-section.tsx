"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Shuffle from "@/components/ui/Shuffle";
import Image from "next/image";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export function HeroSection({ onScrollDown }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 sm:px-6 lg:px-8 animate-fade-in">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/50 blur-3xl" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left lg:pl-8 order-2 lg:order-1">
            {/* Greeting */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in-up" style={{animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards"}}>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium">
                Hello, I am
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="gradient-text">Mary Ruth Relator</span>
              </h1>
            </div>

            {/* Title */}
            <div className="animate-fade-in-up" style={{animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards"}}>
              <div className="flex items-center justify-center lg:justify-start gap-3">
            <Shuffle
              text="Technology Enthusiast"
              tag="p"
              className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover
              respectReducedMotion={true}
              loop={false}
              loopDelay={0}
            />
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
          </div>
        </div>
        
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-2 sm:pt-4 animate-fade-in-up" style={{animationDelay: "0.8s", opacity: 0, animationFillMode: "forwards"}}>
              <Button
                size="lg"
                className="h-12 px-8 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => {
                  const featuredProjects = document.getElementById("projects");
                  if (featuredProjects) {
                    featuredProjects.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base transition-all duration-300 hover:scale-105 bg-transparent"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right Side - Profile Picture */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 animate-fade-in-up" style={{animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards"}}>
            <div className="relative group">
              <div className="w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-accent/20 via-secondary to-muted flex items-center justify-center border-4 border-border/50 shadow-2xl animate-scale-in overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-accent/20 hover:shadow-3xl">
                <Image 
                  src="/profile.jpg" 
                  alt="Mary Ruth Relator" 
                  width={400} 
                  height={400} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Status dot - bigger and more prominent */}
              <div className="absolute bottom-4 right-4 flex items-center justify-center">
                <span className="relative flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500 border-4 border-background"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground animate-fade-in-up"
        style={{animationDelay: "1.2s", opacity: 0, animationFillMode: "forwards"}}
        aria-label="Scroll down"
      >
        <span className="text-sm font-medium">Scroll</span>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
