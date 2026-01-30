"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github, ExternalLink, Star, GitFork, Layers, Palette, Camera, Award, ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Shuffle from "@/components/ui/Shuffle";
import Image from 'next/image';

const featuredProjects = [
  {
    title: "By7eQuest",
    description:
      "By7eQuest is a gamified approach to mastering Data Structures and Algorithms. It transforms complex concepts into interactive minigames to enhance student engagement and retention.",
    icon: Layers,
    image: "/by7equest.jpg",
    gradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    iconColor: "text-blue-500",
    technologies: ["Unity", "Microsoft PlayFab", "ShaderLab", "HLSL"],
    github: "https://github.com/mjcarant0/by7equest",
    featured: true,
  },
  {
    title: "Kaching!",
    description:
      "A gamified budget tracker featuring an AI-driven financial guide, interactive mini-games, and social leaderboards. It leverages a rewards-based leveling system to encourage financial discipline through social connectivity and personalized AI insights.",
    icon: Palette,
    image: "/kaching.jpg",
    gradient: "from-pink-500/20 via-rose-500/10 to-orange-500/20",
    iconColor: "text-pink-500",
    technologies: ["Unity", "C#", "ShaderLab"],
    github: "https://github.com/mjcarant0/Kaching",
    featured: true,
  },
];

const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    link: "https://example.com/cert1",
    credentialId: "AWS-12345",
  },
  {
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "2023",
    link: "https://example.com/cert2",
    credentialId: "PSM-67890",
  },
  {
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    link: "https://example.com/cert3",
    credentialId: "GCP-54321",
  },
];

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: certHeaderRef, isRevealed: certHeaderRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: certGridRef, isRevealed: certGridRevealed } = useScrollReveal({ triggerOnce: false });

  return (
    <section className="py-12 lg:py-16">
      <div className="space-y-16">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`space-y-4 scroll-reveal-left ${headerRevealed ? 'revealed' : ''}`}
        >
          <Shuffle
            text="Featured Projects"
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
          <p className="max-w-2xl text-lg text-muted-foreground">
            {"Showcase of my most impactful projects that demonstrate creativity, technical skills, and problem-solving abilities."}
          </p>
        </div>

        {/* Featured Projects - Enhanced 2-column layout */}
        <div 
          ref={gridRef}
          className={`grid gap-8 lg:grid-cols-2 scroll-reveal-scale ${gridRevealed ? 'revealed' : ''}`}
        >
          {featuredProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <article
                key={project.title}
                className="smooth-card glow-effect group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project image/preview card */}
                <div className={cn(
                  "relative h-48 w-full overflow-hidden bg-gradient-to-br",
                  project.gradient
                )}>
                  {project.image && (
                    <div className="absolute inset-0">
                      <Image 
                        src={project.image} 
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-4 left-4 w-32 h-32 rounded-full bg-accent/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-accent/10 blur-xl transition-transform duration-700 group-hover:scale-125" />
                  </div>
                  
                  {/* Hover overlay with actions */}
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center gap-4 bg-background/90 backdrop-blur-md transition-all duration-400",
                    hoveredProject === project.title ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 hover:scale-110 hover:shadow-lg transform translate-y-4 group-hover:translate-y-0"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-accent">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-full px-2.5 py-0.5 text-xs transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <div 
          ref={certHeaderRef}
          className={`space-y-4 mb-10 scroll-reveal-left ${certHeaderRevealed ? 'revealed' : ''}`}
        >
          <Shuffle
            text="Certifications"
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
          <p className="max-w-2xl text-muted-foreground">
            Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.
          </p>
        </div>
        
          <div 
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 scroll-reveal-scale ${certGridRevealed ? 'revealed' : ''}`}
          ref={certGridRef}
        > 
            {certifications.map((cert, index) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="smooth-card group relative flex flex-col rounded-xl border border-border/50 bg-card p-6 hover:bg-card hover:border-accent/50 transition-all duration-300"
                style={{ animationDelay: `${500 + index * 75}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-4 space-y-3 border-t border-border/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Issued</span>
                    <span className="text-xs font-medium text-foreground">{cert.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono bg-muted/30 rounded px-2 py-1.5">
                    ID: {cert.credentialId}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-accent pt-1">
                    <span>View Certificate</span>
                    <ExternalLinkIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
