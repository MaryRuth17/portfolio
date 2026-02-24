"use client";

import { Badge } from "@/components/ui/badge";
import { Github, Award, ExternalLinkIcon } from "lucide-react";
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
    image: "/by7equest.jpg",
    gradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    technologies: ["Unity", "Microsoft PlayFab", "ShaderLab", "HLSL"],
    github: "https://github.com/mjcarant0/by7equest",
    featured: true,
  },
  {
    title: "Kaching!",
    description:
      "A gamified budget tracker featuring an AI-driven financial guide, interactive mini-games, and social leaderboards. It leverages a rewards-based leveling system to encourage financial discipline through social connectivity and personalized AI insights.",
    image: "/kaching.jpg",
    gradient: "from-pink-500/20 via-rose-500/10 to-orange-500/20",
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
    <section className="py-6 lg:py-8">
      <div className="space-y-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`space-y-4 scroll-reveal ${headerRevealed ? 'revealed' : ''}`}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <Shuffle
            text="Featured Projects"
            tag="h2"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
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
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed">
            {"Showcase of my most impactful projects that demonstrate creativity, technical skills, and problem-solving abilities."}
          </p>
        </div>

        {/* Featured Projects - Enhanced 2-column layout */}
        <div 
          ref={gridRef}
          className={`grid gap-5 lg:grid-cols-2 scroll-reveal ${gridRevealed ? 'revealed' : ''}`}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          {featuredProjects.map((project, index) => {
            return (
              <article
                key={project.title}
                className="smooth-card glow-effect stagger-child group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card hover:border-accent/40 hover:shadow-md hover:shadow-accent/10"
                style={{ transitionDelay: `${index * 120}ms`, transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease' }}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project image */}
                <div className={cn(
                  "relative h-36 w-full overflow-hidden bg-gradient-to-br",
                  project.gradient
                )}>
                  {project.image && (
                    <div className="absolute inset-0">
                      <Image 
                        src={project.image} 
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Hover overlay — GitHub button */}
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm transition-all duration-300",
                    hoveredProject === project.title ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl translate-y-2 group-hover:translate-y-0"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-3.5 w-3.5" />
                      View on GitHub
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-base font-bold text-foreground leading-tight mb-1.5 transition-colors duration-300 group-hover:text-accent">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/80 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
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
        <div>
          <div 
          ref={certHeaderRef}
          className={`space-y-3 mb-6 scroll-reveal ${certHeaderRevealed ? 'revealed' : ''}`}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <Shuffle
            text="Certifications"
            tag="h2"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
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
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed mt-2">
            Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.
          </p>
        </div>
        
          <div 
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 scroll-reveal ${certGridRevealed ? 'revealed' : ''}`}
          ref={certGridRef}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        > 
            {certifications.map((cert, index) => (
              <a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="smooth-card stagger-child group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card hover:border-accent/50 hover:shadow-md hover:shadow-accent/5 transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Top accent bar */}
                <div className="h-0.5 w-full bg-gradient-to-r from-accent via-accent/50 to-transparent shrink-0" />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start gap-2.5 mb-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                      <Award className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-foreground leading-tight mb-0.5 group-hover:text-accent transition-colors duration-300">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 space-y-2 border-t border-border/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Issued</span>
                      <span className="text-xs font-semibold text-foreground">{cert.date}</span>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono bg-muted/30 rounded-md px-2 py-1">
                      ID: {cert.credentialId}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                      <span>View Certificate</span>
                      <ExternalLinkIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
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
