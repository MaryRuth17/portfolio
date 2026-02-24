"use client";

import { Badge } from "@/components/ui/badge";
import { Github, Award, ExternalLinkIcon, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
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

// Total slides = real projects + 1 "More to Come" card
const TOTAL_SLIDES = featuredProjects.length + 1;

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: certHeaderRef, isRevealed: certHeaderRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: certGridRef, isRevealed: certGridRevealed } = useScrollReveal({ triggerOnce: false });

  const goPrev = () => setCurrentIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  const goNext = () => setCurrentIndex((i) => (i + 1) % TOTAL_SLIDES);

  const isMoreToGo = currentIndex === featuredProjects.length;
  const project = !isMoreToGo ? featuredProjects[currentIndex] : null;

  return (
    <section className="py-6 lg:py-8">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
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
            Showcase of my most impactful projects that demonstrate creativity, technical skills, and problem-solving abilities.
          </p>
        </div>

        {/* Featured Projects — Carousel */}
        <div
          ref={gridRef}
          className={`scroll-reveal ${gridRevealed ? 'revealed' : ''}`}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          {/* Slide */}
          <div className="max-w-[780px] mx-auto">
            {isMoreToGo ? (
              /* ── More to Come card ── */
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Left placeholder — mirrors the image card */}
                <div className="group relative shrink-0 w-full sm:w-[380px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border border-dashed border-accent/40 bg-accent/5 flex items-center justify-center transition-all duration-300 hover:border-accent hover:shadow-md hover:shadow-accent/10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="h-8 w-8 text-accent" />
                  </div>
                </div>

                {/* Text — matches real project text panel */}
                <div className="flex flex-1 flex-col justify-between gap-4 py-1 sm:py-3">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Coming Next</p>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">More to Go</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      More projects are on the way. Stay tuned for upcoming builds, experiments, and collaborations.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["In Progress", "Coming Soon", "Stay Tuned"].map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ── Real project — image card + outside text ── */
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Image card — no text inside */}
                <div
                  className={cn(
                    "group relative shrink-0 w-full sm:w-[380px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br shadow-md",
                    project!.gradient
                  )}
                  onMouseEnter={() => setHoveredProject(project!.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {project!.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={project!.image}
                        alt={`${project!.title} screenshot`}
                        fill
                        sizes="400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  {/* GitHub hover overlay */}
                  <div className={cn(
                    "absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm transition-all duration-300",
                    hoveredProject === project!.title ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}>
                    <a
                      href={project!.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      aria-label={`View ${project!.title} on GitHub`}
                    >
                      <Github className="h-3.5 w-3.5" />
                      View on GitHub
                    </a>
                  </div>
                </div>

                {/* Text — outside the card, no background */}
                <div className="flex flex-1 flex-col justify-between gap-4 py-1 sm:py-3">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Featured Project</p>
                    <h3 className="text-2xl font-bold text-foreground leading-tight">{project!.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{project!.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project!.technologies.map((tech) => (
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
              </div>
            )}
          </div>

          {/* Navigation controls */}
          <div className="mt-5 max-w-[780px] mx-auto flex items-center justify-between gap-4">
            {/* Back button */}
            <button
              onClick={goPrev}
              className="group flex items-center gap-2 rounded-xl border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === currentIndex
                      ? "h-2.5 w-6 bg-accent"
                      : "h-2 w-2 bg-border hover:bg-accent/50"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={goNext}
              className="group flex items-center gap-2 rounded-xl border border-border/60 bg-card px-5 py-2.5 text-sm font-semibold text-muted-foreground shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30 hover:scale-105 active:scale-95"
              aria-label="Next project"
            >
              Next
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Certifications */}
        <div
          ref={certHeaderRef}
          className={`scroll-reveal ${certHeaderRevealed ? 'revealed' : ''}`}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <div className="space-y-3 mb-6">
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
          className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}
          ref={certGridRef}
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
