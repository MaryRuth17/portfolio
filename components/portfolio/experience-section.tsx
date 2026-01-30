"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Shuffle from "@/components/ui/Shuffle";

const experience = [
  {
    period: "2024 — Present",
    title: "Senior Frontend Engineer",
    company: "TechCorp",
    link: "https://example.com",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&auto=format",
    description:
      "Leading the frontend architecture for the main product, implementing design systems, and mentoring junior developers. Focus on performance optimization and accessibility.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
  },
  {
    period: "2022 — 2024",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    link: "https://example.com",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=200&auto=format",
    description:
      "Built and maintained multiple web applications from scratch, working closely with design and product teams to deliver pixel-perfect interfaces.",
    technologies: ["Node.js", "React", "PostgreSQL", "AWS"],
  },
  {
    period: "2020 — 2022",
    title: "Frontend Developer",
    company: "DigitalAgency",
    link: "https://example.com",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=200&auto=format",
    description:
      "Developed responsive websites and web applications for various clients, focusing on clean code and modern web standards.",
    technologies: ["JavaScript", "Vue.js", "SCSS", "WordPress"],
  },
];

export function ExperienceSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: contentRef, isRevealed: contentRevealed } = useScrollReveal({ triggerOnce: false });

  return (
    <section className="py-12 lg:py-20">
      {/* Section Header */}
      <div 
        ref={headerRef}
        className={`mb-12 scroll-reveal ${headerRevealed ? 'revealed' : ''}`}
      >
        <Shuffle
          text="Experience"
          tag="h2"
          className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
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
        <p className="text-muted-foreground max-w-2xl">
          My professional journey and the roles that shaped my career.
        </p>
      </div>

      {/* Experience Cards */}
      <div 
        ref={contentRef}
        className={`space-y-4 scroll-reveal ${contentRevealed ? 'revealed' : ''}`}
      >
        {experience.map((job, index) => (
          <div
            key={index}
            className="smooth-card group relative rounded-xl border border-border/50 bg-card/50 p-6 transition-all hover:bg-card hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-6">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-right sm:pt-1">
                {job.period}
              </span>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  {job.logo && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-secondary border border-border/50">
                      <img 
                        src={job.logo} 
                        alt={`${job.company} logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-snug">
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
                      >
                        {job.title} · {job.company}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {job.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="rounded-full px-3 py-0.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
