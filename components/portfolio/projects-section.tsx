"use client";

import { Badge } from "@/components/ui/badge";
import { Github, Award, ExternalLinkIcon, ChevronLeft, ChevronRight, Sparkles, Linkedin, ArrowUpRight } from "lucide-react";
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
    image: "/By7equest.jpg",
    gradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    technologies: ["Unity", "Microsoft PlayFab", "ShaderLab", "HLSL"],
    github: "https://github.com/mjcarant0/by7equest",
    featured: true,
  },
  {
    title: "Kaching!",
    description:
      "A gamified budget tracker featuring an AI-driven financial guide, interactive mini-games, and social leaderboards. It leverages a rewards-based leveling system to encourage financial discipline through social connectivity and personalized AI insights.",
    image: "/Kaching.jpg",
    gradient: "from-pink-500/20 via-rose-500/10 to-orange-500/20",
    technologies: ["Unity", "C#", "ShaderLab"],
    github: "https://github.com/mjcarant0/Kaching",
    featured: true,
  },
];

const certifications = [
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2026",
    link: "https://www.credly.com/badges/e617c446-8a7c-4c02-868d-1c960cd9cf16/public_url",
    credentialId: "",
    logo: "/icons/cisco.png",
  },
  {
    title: "Machine Learning, Artificial Intelligence (AI), and Cybersecurity",
    issuer: "Coursera",
    date: "2026",
    link: "https://www.coursera.org/account/accomplishments/badge/Rs3kDOjJSxCN5AzoyQsQCA",
    credentialId: "Rs3kDOjJSxCN5AzoyQsQCA",
    logo: "/icons/coursera.png",
  },
  {
    title: "See All Certifications",
    issuer: "View my full list of certifications on LinkedIn",
    date: "",
    link: "https://www.linkedin.com/in/maryruthprelator/details/certifications/",
    credentialId: "",
    isLinkedIn: true,
  },
];

const organizationalExperience = [
  {
    period: "2025 — Present",
    title: "VP For Business Development",
    company: "CyberPH",
    link: "https://www.facebook.com/LearnCyberPH",
    logo: "cyberph.jpg",
    description:
      "Driving strategic growth and industry partnerships to expand CyberPH's impact within the Philippine cybersecurity ecosystem.",
  },
  {
    period: "2024 — Present",
    title: "External Relations Officer - Executive Auditor",
    company: "ICPEP SE - PUP",
    link: "https://www.facebook.com/icpepse.pupmanila",
    logo: "icpep.jpg",
    description:
      "Managing external organizational relations to ensuring financial transparency and procedural compliance through rigorous executive auditing.",
  },
  {
    period: "2024 — Present",
    title: "Cybersecurity Cadet / Industry Partnerships Co-Lead",
    company: "GDG on Campus PUP",
    link: "https://gdg.community.dev/gdg-on-campus-polytechnic-university-of-the-philippines-manila-philippines/?fbclid=IwY2xjawQNoctleHRuA2FlbQIxMABicmlkETJrRlZHeWJKVU0yUGZRcVVTc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHokqQmKpkdiL74wWUJLKL-6rP4W2sWyeiGACGbJeybdgVocphaVGOGX6a-Rj_aem_29iMPkxLaZQfij4_ZRuomw",
    logo: "gdg.jpg",
    description:
      "Cultivating high-impact industry partnerships andadvancing technical proficiency within the cybersecurity cadetship program.",
  },
  {
    period: "2025 & 2026",
    title: "Partnerships Committee",
    company: "Arduino Day Philippines",
    link: "https://www.facebook.com/arduinodayph",
    logo: "adph.jpg",
    description:
      "Securing strategic sponsorships and community collaborations to drive the success of nationwide hardware and IoT initiatives.",
  },
  {
    period: "2025",
    title: "External Relations Officer",
    company: "AWS Cloud Clubs Philippines - SCD 2025",
    link: "https://www.facebook.com/AWSCloudClubsPhilippines",
    logo: "awscd.jpg",
    description:
      "Managing external organizational relations and coordinating with industry partners to support AWS Cloud Clubs Philippines' initiatives.",
  },
];

const professionalExperience: typeof organizationalExperience = [];

const TOTAL_SLIDES = featuredProjects.length + 1;

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref: gridRef, isRevealed: gridRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: certHeaderRef, isRevealed: certHeaderRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: certGridRef, isRevealed: certGridRevealed } = useScrollReveal({ triggerOnce: false });
  const { ref: expHeaderRef, isRevealed: expHeaderRevealed } = useScrollReveal({
    triggerOnce: false,
    threshold: 0.05,
    rootMargin: "200px 0px -100px 0px",
  });
  const { ref: expContentRef, isRevealed: expContentRevealed } = useScrollReveal({
    triggerOnce: false,
    threshold: 0.02,
    rootMargin: "200px 0px -50px 0px",
  });

  const [activeExpTab, setActiveExpTab] = useState<"professional" | "organizational">("organizational");

  const goPrev = () => setCurrentIndex((i) => (i - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  const goNext = () => setCurrentIndex((i) => (i + 1) % TOTAL_SLIDES);

  const isMoreToGo = currentIndex === featuredProjects.length;
  const activeExperience = activeExpTab === "professional" ? professionalExperience : organizationalExperience;
  const project = !isMoreToGo ? featuredProjects[currentIndex] : null;

  return (
    <section className="pb-12 lg:pb-16">
      <div className="space-y-20">
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
          <div className="max-w-3xl mx-auto">
            {isMoreToGo ? (
              /* ── More to Come card ── */
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* Left placeholder — mirrors the image card with fluid sizing */}
                <div className="group relative shrink-0 w-full sm:w-[clamp(14rem,45%,24rem)] aspect-[16/10] rounded-2xl overflow-hidden border border-dashed border-accent/40 bg-accent/5 flex items-center justify-center transition-all duration-300 hover:border-accent hover:shadow-md hover:shadow-accent/10">
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
                {/* Image card — aspect-ratio used instead of fixed height for fluid scaling */}
                <div
                  className={cn(
                    "group relative shrink-0 w-full sm:w-[clamp(14rem,45%,24rem)] aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br shadow-md",
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
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 24rem"
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
          <div className="mt-5 max-w-3xl mx-auto flex items-center justify-between gap-4">
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

        {/* Experience */}
        <div
          ref={expHeaderRef}
          className={`scroll-reveal ${expHeaderRevealed ? 'revealed' : ''}`}
          style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
        >
          <div className="space-y-3 mb-6">
            <Shuffle
              text="Experience"
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
              My journey across professional roles and organizational involvement.
            </p>
            {/* Tab switcher */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveExpTab("organizational")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold border transition-all duration-300",
                  activeExpTab === "organizational"
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/30"
                    : "bg-transparent text-muted-foreground border-border/60 hover:border-accent hover:text-accent"
                )}
              >
                Organizational
              </button>
              <button
                onClick={() => setActiveExpTab("professional")}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold border transition-all duration-300",
                  activeExpTab === "professional"
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/30"
                    : "bg-transparent text-muted-foreground border-border/60 hover:border-accent hover:text-accent"
                )}
              >
                Professional
              </button>
            </div>
          </div>
          <div
            ref={expContentRef}
            className={`space-y-4 scroll-reveal ${expContentRevealed ? 'revealed' : ''}`}
            style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
          >
            {activeExpTab === "professional" && activeExperience.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-accent/40 bg-accent/5 py-12 px-6 text-center">
                <div className="space-y-1.5">
                  <p className="text-base font-bold text-foreground">Coming Soon!</p>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                    No professional experience listed yet, but I&apos;m open to work and excited for what&apos;s next!
                  </p>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  Open to Work
                </Badge>
              </div>
            )}
            {activeExperience.map((job, index) => (
              <div
                key={index}
                className="smooth-card stagger-child group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:bg-gradient-to-br hover:from-card hover:to-accent/5"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Left accent glow bar */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-transparent via-accent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:top-3 group-hover:bottom-3" />
                {/* Corner glow */}
                <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* Shimmer sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                <div className="grid gap-4 sm:grid-cols-[140px_1fr] sm:gap-6 p-4 sm:p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-accent/70 sm:text-right sm:pt-1">
                    {job.period}
                  </span>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      {job.logo && (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-muted/30 border border-border/50 transition-all duration-300 group-hover:scale-110 group-hover:border-accent/40 group-hover:shadow-md group-hover:shadow-accent/20">
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-foreground leading-tight transition-transform duration-300 group-hover:-translate-y-0.5">
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
                    <p className="text-sm leading-relaxed text-foreground/80 transition-all duration-300 group-hover:text-foreground/95 group-hover:translate-y-[-1px]">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                {/* Shimmer sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                {(cert as any).isLinkedIn ? (
                  /* LinkedIn "See All" card */
                  <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                      <Linkedin className="h-6 w-6 text-accent" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-base font-bold text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {cert.issuer}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-accent mt-auto">
                      <span>View on LinkedIn</span>
                      <ExternalLinkIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start gap-2.5 mb-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 overflow-hidden transition-transform duration-300 group-hover:scale-110">
                        {(cert as any).logo ? (
                          <Image
                            src={(cert as any).logo}
                            alt={cert.issuer}
                            width={36}
                            height={36}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <Award className="h-4 w-4 text-accent" />
                        )}
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
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
