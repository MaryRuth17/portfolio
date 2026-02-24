"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, GraduationCap, Code2, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Shuffle from "@/components/ui/Shuffle";
import Stack from "@/components/ui/Stack";
import CircularGallery from "@/components/ui/CircularGallery";
import { useState } from "react";

const skillsfront = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "Flutter",
  "React Native",
];

const skillsback = [
  "Node.js", 
  "Express.js",
  "C# (.NET)",             
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Azure PlayFab",         
  "Firebase",
];

const cybersec = [
  "Python (Scripting)",    
  "Linux (Kali/Ubuntu)",   
  "Wireshark",            
  "Nmap",                        
  "Git / GitHub",          
  "Identity Management",   
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<'Public Relations' | 'Journalism' | 'Student Leadership'>('Public Relations');
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal({ 
    triggerOnce: false, 
    threshold: 0.05, 
    rootMargin: "200px 0px -100px 0px" 
  });
  const { ref: educationRef, isRevealed: educationRevealed } = useScrollReveal({ 
    triggerOnce: false, 
    threshold: 0.05, 
    rootMargin: "0px 0px -100px 0px" 
  });
  const { ref: otherSkillsRef, isRevealed: otherSkillsRevealed } = useScrollReveal({ 
    triggerOnce: false, 
    threshold: 0.05, 
    rootMargin: "0px 0px -100px 0px" 
  });
  const { ref: academicRef, isRevealed: academicRevealed } = useScrollReveal({ 
    triggerOnce: false, 
    threshold: 0.05, 
    rootMargin: "0px 0px -100px 0px" 
  });

  return (
    <section className="py-12 lg:py-20">
      {/* Section Header*/}
      <div 
        ref={headerRef}
        className={`flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 mb-12 scroll-reveal ${headerRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
        <div className="space-y-3 flex-1">
          <Shuffle
            text="About Me"
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
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Developing code. Securing data. Communicating value. I'm a tech student exploring the intersection of software engineering and digital defense, with a unique eye for public relations and community engagement.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <MapPin className="h-4 w-4" />
              Manila City, PH
            </span>
            <span className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Briefcase className="h-4 w-4" />
              Open to work
            </span>
            <span className="flex items-center gap-1.5 transition-colors hover:text-foreground">
              <GraduationCap className="h-4 w-4" />
              CPE @ PUP Manila
            </span>
          </div>
        </div>
        
          {/* Profile Picture*/}
          <div className="relative group shrink-0">
            <div className="overflow-hidden rounded-2xl w-60 h-60 sm:w-72 sm:h-72">
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={[
                  "/profile1.JPEG",
                  "/profile2.JPEG",
                  "/profile3.png",
                  "/profile4.JPG"
                ].map((src, i) => (
                  <img 
                    key={i} 
                    src={src} 
                    alt={`card-${i + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ))}
                autoplay={false}
                autoplayDelay={3000}
                pauseOnHover={false}
              />
            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background"></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div 
        className={`grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 scroll-reveal ${headerRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
        {/* Left column - Personal info */}
        <div className="space-y-6">

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              FRONT END
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsfront.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              BACKEND
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillsback.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              CYBERSECURITY
            </h3>
            <div className="flex flex-wrap gap-2">
              {cybersec.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        

        {/* Right column - Bio & Experience */}
        <div className="space-y-8">
          {/* Bio Card */}
          <div className="smooth-card rounded-2xl border border-border/50 bg-card p-5 sm:p-6 h-full flex flex-col justify-center">
            <div className="space-y-4 text-muted-foreground">
              <p className="text-base leading-relaxed">
                {"Mary Ruth Relator is a Computer Engineering student at PUP Manila, specializing in software development and cybersecurity. A dedicated builder and problem-solver, she actively participates in hackathons and technical projects, focusing on creating secure, scalable applications."}
              </p>
              <p className="text-base leading-relaxed">
                {"Beyond the codebase, she is a prominent student leader who has held executive roles across eight organizations including VP for Business Development and Chief Public Relations Officer. She uniquely bridges the gap between engineering and industry, leveraging her technical foundation to lead partnerships and manage stakeholder interests for major tech events."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div 
        ref={educationRef}
        className={`mt-16 mb-12 scroll-reveal ${educationRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
        <div className="mb-8">
          <Shuffle
            text="Education"
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
          <p className="text-base text-muted-foreground mt-1">
            This outlines my educational background and the academic path I have followed to gain the knowledge and skills I have today.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="smooth-card group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 sm:p-6">
            <div className="flex items-start gap-3 relative z-10" 
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <GraduationCap className="h-5 w-5 text-accent" 
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Bachelor of Science in Computer Engineering</h3>
                <p className="text-sm text-muted-foreground">Polytechnic University of the Philippines - Manila</p>
                <p className="text-xs text-muted-foreground">2024 - Present</p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="relative w-200 h-200 sm:w-200 sm:h-200 opacity-20">
                <Image
                  src="/PUP.png"
                  alt="PUP Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="smooth-card group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 sm:p-6">
          <div className="flex items-start gap-3 relative z-10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <GraduationCap className="h-5 w-5 text-accent" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">STEM - Science, Technology, Engineering, and Mathematics</h3>
              <p className="text-sm text-muted-foreground">Arellano University - Jose Abad Santos Campus</p>
              <p className="text-xs text-muted-foreground">2022 - 2024</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="relative w-200 h-200 sm:w-200 sm:h-200 opacity-20">
              <Image
                src="/AU.png"
                alt="Arellano University Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Other Skills Section */}
      <div 
        ref={otherSkillsRef}
        className={`mt-16 mb-12 scroll-reveal ${otherSkillsRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
        <div className="mb-8">
          <Shuffle
            text="Other Skills"
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
          <p className="text-base text-muted-foreground mt-1">
            Beyond technical expertise, I bring a diverse range of skills from journalism, public relations, and student leadership that enhance my professional versatility.
          </p>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab('Public Relations')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'Public Relations'
                ? 'bg-accent text-white shadow-lg shadow-accent/50 scale-105'
                : 'bg-card border border-border/50 text-muted-foreground hover:bg-accent/10 hover:border-accent/30'
            }`}
          >
            Public Relations
          </button>
          <button
            onClick={() => setActiveTab('Journalism')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'Journalism'
                ? 'bg-accent text-white shadow-lg shadow-accent/50 scale-105'
                : 'bg-card border border-border/50 text-muted-foreground hover:bg-accent/10 hover:border-accent/30'
            }`}
          >
            Journalism
          </button>
          <button
            onClick={() => setActiveTab('Student Leadership')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === 'Student Leadership'
                ? 'bg-accent text-white shadow-lg shadow-accent/50 scale-105'
                : 'bg-card border border-border/50 text-muted-foreground hover:bg-accent/10 hover:border-accent/30'
            }`}
          >
            Student Leadership
          </button>
        </div>

        {/* Cards Container */}
        <div className="max-w-[900px] mx-auto px-4">
          {/* Organizational - Public Relations Card */}
          {activeTab === 'Public Relations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
              <div className="smooth-card rounded-2xl border border-border/50 bg-card p-5 h-[340px] flex flex-col">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold">Public Relations / Partnerships</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      Since my freshman year, I have served as a core member of the Partnerships and Public Relations team. 
                      In this role, I have successfully spearheaded the organization of over 7 major tech events. To date, 
                      I have cultivated and managed a network of 80+ community organizations and secured collaborations with 40+ industry sponsors.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Communication", "Event Planning", "Public Relations", "Media Partnerships", "Negotiation & Persuasion" ].map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[340px] overflow-hidden rounded-2xl group/image shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-shadow duration-500">
                <img
                  src="/public-relations.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent group-hover/image:from-card/60 transition-all duration-500" />
              </div>
            </div>
          )}

          {/* Competitive - Journalism Card */}
          {activeTab === 'Journalism' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
              <div className="relative w-full h-[340px] overflow-hidden rounded-2xl group/image shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-shadow duration-500">
                <img
                  src="/journalism.jpg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent group-hover/image:from-card/60 transition-all duration-500" />
              </div>
              <div className="smooth-card rounded-2xl border border-border/50 bg-card p-5 h-[340px] flex flex-col">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold">Journalism</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      A dedicated journalist since primary school, I have contributed to three distinct 
                      school publications and competed at the Regional Schools Press Conference (RSPC). 
                      My commitment to the craft culminated in graduating with the Journalist of the Year 
                      award in high school, reflecting a long-standing expertise in storytelling, technical 
                      writing, and competitive editorial work.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Communication", "News Writing", "Literary", "Blogs", "Media", "Opinion Articles"].map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Professional - Student Leadership Card */}
          {activeTab === 'Student Leadership' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
              <div className="smooth-card rounded-2xl border border-border/50 bg-card p-5 h-[340px] flex flex-col">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-lg font-semibold">Student Leadership</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs">
                      I am a versatile student leader with a decade of experience across four institutions, 
                      holding key executive roles including President, Auditor, and PIO. Proven track record 
                      in organizational governance and community service through extensive non-profit volunteerism. 
                      Currently serving as CE Deputy Commissioner for the PUP COMELEC, specializing in electoral 
                      oversight and student body administration
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Organizational Governance & Policy", "Leadership", "Stakeholder Management", "Finance and Auditing", "Operations Management", "Youth Governance" ].map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[340px] overflow-hidden rounded-2xl group/image shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-shadow duration-500">
                <img
                  src="/student-leadership.jpg"
                  alt="Student leadership"
                  className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110 group-hover/image:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent group-hover/image:from-card/60 transition-all duration-500" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Circular Gallery Section */}
      <div className="mt-8 overflow-hidden" style={{ height: '600px', position: 'relative', isolation: 'isolate', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
        <CircularGallery 
          bend={1}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      {/* Academic Credentials Section */}
      <div 
        ref={academicRef}
        className={`mt-16 mb-12 scroll-reveal ${academicRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
        <div className="mb-8">
          <Shuffle
            text="Academic Credentials"
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
          <p className="text-base text-muted-foreground mt-1">
            Recognition of academic achievements and leadership excellence throughout my educational journey.
          </p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Arellano University */}
          <div className="smooth-card group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-accent/5 p-5 hover:border-accent/50">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Arellano University</h3>
                    <p className="text-xs text-muted-foreground">Jose Abad Santos Campus · 2022 – 2024</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'With High Honors' },
                    { label: 'Class Rank 1' },
                    { label: 'Leadership Award', sub: 'STEM Club' },
                    { label: 'Journalist of the Year' },
                  ].map(({ label, sub }) => (
                    <div key={label} className="rounded-lg bg-accent/5 border border-accent/10 p-2 space-y-0.5">
                      <Award className="h-3.5 w-3.5 text-accent" />
                      <p className="text-xs font-semibold leading-tight">{label}</p>
                      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {['Rank 15 · Overall Campus', 'The Standard · Outstanding Female Editor'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="relative w-200 h-200 sm:w-200 sm:h-200 opacity-20">
                  <Image src="/AU.png" alt="Arellano University Logo" fill className="object-contain" />
                </div>
              </div>
          </div>

          {/* Pasay City West High School */}
          <div className="smooth-card group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-accent/5 p-5 hover:border-accent/50">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Pasay City West High School</h3>
                    <p className="text-xs text-muted-foreground">2017 – 2020</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'With High Honors' },
                    { label: 'Best In Mandarin', sub: 'FOLA' },
                    { label: 'Math Olympics', sub: '2nd Place' },
                    { label: 'MTAP Representative' },
                  ].map(({ label, sub }) => (
                    <div key={label} className="rounded-lg bg-accent/5 border border-accent/10 p-2 space-y-0.5">
                      <Award className="h-3.5 w-3.5 text-accent" />
                      <p className="text-xs font-semibold leading-tight">{label}</p>
                      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {['PCWHS Journalism · News Writer', 'Robotics Participant'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="relative w-200 h-200 sm:w-200 sm:h-200 opacity-20">
                  <Image src="/PCWHS.png" alt="PCWHS Logo" fill className="object-contain" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
