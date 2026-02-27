"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Shuffle from "@/components/ui/Shuffle";
import Stack from "@/components/ui/Stack";
import { useState } from "react";

import profile1Img       from "@/assets/images/profile1.jpeg";
import profile2Img       from "@/assets/images/profile2.jpeg";
import profile3Img       from "@/assets/images/profile3.png";
import profile4Img       from "@/assets/images/profile4.jpg";
import pupLogoImg        from "@/assets/images/PUP.png";
import auLogoImg         from "@/assets/images/AU.png";
import pcwhsLogoImg      from "@/assets/images/PCWHS.png";
import publicRelationsImg from "@/assets/images/public-relations.jpg";
import journalismImg     from "@/assets/images/journalism.jpg";
import studentLeaderImg  from "@/assets/images/student-leadership.jpg";

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
    rootMargin: "0px 0px 300px 0px" 
  });

  return (
    <section className="pt-12 lg:pt-16">
      {/* Section Header*/}
      <div 
        ref={headerRef}
        className={`flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 mb-6 scroll-reveal ${headerRevealed ? 'revealed' : ''}`}
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
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed">
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
        
          {/* Profile Picture — clamp() ensures fluid scaling across all screen sizes */}
          <div className="relative group shrink-0 flex justify-center">
            <div
              className="overflow-hidden rounded-2xl"
              style={{ width: "clamp(9rem, 22vw, 18rem)", height: "clamp(9rem, 22vw, 18rem)" }}
            >
              <Stack
                randomRotation={false}
                sensitivity={200}
                sendToBackOnClick={true}
                cards={[
                  profile1Img.src,
                  profile2Img.src,
                  profile3Img.src,
                  profile4Img.src,
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
        className={`grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10 scroll-reveal ${headerRevealed ? 'revealed' : ''}`}
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
            <div className="space-y-4 text-foreground/70">
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
        className={`mt-20 scroll-reveal ${educationRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
          <div className="mb-6">
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
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed mt-2">
            This outlines my educational background and the academic path I have followed to gain the knowledge and skills I have today.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="smooth-card stagger-child group relative overflow-hidden rounded-2xl border border-border/50 hover:!border-red-500/60 bg-card transition-all duration-300 hover:![box-shadow:0_0_22px_4px_rgba(239,68,68,0.30)]">
            <div className="flex items-start justify-between gap-3 p-4 sm:p-5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                  <GraduationCap className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">Bachelor of Science in Computer Engineering</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Polytechnic University of the Philippines – Manila</p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-1">
                2024 – Present
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              <div className="relative w-100 h-100 opacity-20">
                <Image src={pupLogoImg} alt="PUP Logo" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div className="smooth-card stagger-child group relative overflow-hidden rounded-2xl border border-border/50 hover:!border-blue-500/60 bg-card transition-all duration-300 hover:![box-shadow:0_0_22px_4px_rgba(59,130,246,0.30)]">
            <div className="flex items-start justify-between gap-3 p-4 sm:p-5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">STEM – Science, Technology, Engineering, and Mathematics</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Arellano University – Jose Abad Santos Campus</p>
                </div>
              </div>
              <span className="shrink-0 text-xs font-medium text-blue-500 bg-blue-500/10 border border-blue-500/20 rounded-full px-2.5 py-1">
                2022 – 2024
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              <div className="relative w-100 h-100 opacity-20">
                <Image src={auLogoImg} alt="Arellano University Logo" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Skills Section */}
      <div 
        ref={otherSkillsRef}
        className={`mt-20 scroll-reveal ${otherSkillsRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
          <div className="mb-6">
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
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed mt-2">
            Beyond technical expertise, I bring a diverse range of skills from journalism, public relations, and student leadership that enhance my professional versatility.
          </p>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
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
        <div className="max-w-3xl mx-auto px-0 sm:px-4">
          {/* Public Relations Card */}
          {activeTab === 'Public Relations' && (
            <div className="smooth-card rounded-2xl border border-border/50 bg-card overflow-hidden animate-in fade-in duration-500 flex flex-col min-h-[290px] h-auto">
              <div className="relative h-32 overflow-hidden group/image">
                <img
                  src={publicRelationsImg.src}
                  alt="Public Relations"
                  className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-105 group-hover/image:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-base font-bold text-foreground">Public Relations / Partnerships</h3>
                </div>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Since my freshman year, I have served as a core member of the Partnerships and Public Relations team.
                  In this role, I have successfully spearheaded the organization of over 7 major tech events. To date,
                  I have cultivated and managed a network of 80+ community organizations and secured collaborations with 40+ industry sponsors.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Communication", "Event Planning", "Public Relations", "Media Partnerships", "Negotiation & Persuasion"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Journalism Card */}
          {activeTab === 'Journalism' && (
            <div className="smooth-card rounded-2xl border border-border/50 bg-card overflow-hidden animate-in fade-in duration-500 flex flex-col min-h-[290px] h-auto">
              <div className="relative h-32 overflow-hidden group/image">
                <img
                  src={journalismImg.src}
                  alt="Journalism"
                  className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-105 group-hover/image:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-base font-bold text-foreground">Journalism</h3>
                </div>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  A dedicated journalist since primary school, I have contributed to three distinct school publications
                  and competed at the Regional Schools Press Conference (RSPC). My commitment to the craft culminated
                  in graduating with the Journalist of the Year award in high school, reflecting a long-standing
                  expertise in storytelling, technical writing, and competitive editorial work.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Communication", "News Writing", "Literary", "Blogs", "Media", "Opinion Articles"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Student Leadership Card */}
          {activeTab === 'Student Leadership' && (
            <div className="smooth-card rounded-2xl border border-border/50 bg-card overflow-hidden animate-in fade-in duration-500 flex flex-col min-h-[290px] h-auto">
              <div className="relative h-32 overflow-hidden group/image">
                <img
                  src={studentLeaderImg.src}
                  alt="Student Leadership"
                  className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-105 group-hover/image:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="text-base font-bold text-foreground">Student Leadership</h3>
                </div>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  I am a versatile student leader with a decade of experience across four institutions,
                  holding key executive roles including President, Auditor, and PIO.
                  Currently serving as CE Deputy Commissioner for the PUP COMELEC, specializing in electoral
                  oversight and student body administration.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Organizational Governance & Policy", "Leadership", "Finance and Auditing", "Operations Management", "Youth Governance"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-105">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Academic Credentials Section */}
      <div 
        ref={academicRef}
        className={`mt-20 scroll-reveal ${academicRevealed ? 'revealed' : ''}`}
        style={{ isolation: 'isolate', transform: 'translateZ(0)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out' }}
      >
          <div className="mb-6">
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
          <p className="text-base text-foreground/70 max-w-2xl leading-relaxed mt-2">
            Recognition of academic achievements and leadership excellence throughout my educational journey.
          </p>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Arellano University */}
          <div className="smooth-card stagger-child group relative overflow-hidden rounded-2xl border border-border/50 hover:border-accent/40 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500/60 to-transparent" />
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-tight">Arellano University</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Jose Abad Santos Campus</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-1">
                  2022 – 2024
                </span>
              </div>

              {/* Strand */}
              <p className="text-xs text-muted-foreground border-l-2 border-accent/30 pl-3">
                STEM – Science, Technology, Engineering, and Mathematics
              </p>

              {/* Awards grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'With High Honors', icon: '🏅' },
                  { label: 'Class Rank 1', icon: '🥇' },
                  { label: 'Leadership Award', sub: 'STEM Club', icon: '👑' },
                  { label: 'Journalist of the Year', icon: '✍️' },
                ].map(({ label, sub, icon }) => (
                  <div key={label} className="flex items-start gap-2 rounded-xl bg-accent/5 border border-accent/10 px-3 py-2.5">
                    <span className="text-base leading-none mt-0.5">{icon}</span>
                    <div>
                      <p className="text-xs font-semibold leading-tight text-foreground">{label}</p>
                      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra details */}
              <div className="flex flex-col gap-1.5 pt-1 border-t border-border/40">
                {['Rank 15 · Overall Campus', 'The Standard · Outstanding Female Editor'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hover logo overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              <div className="relative w-48 h-48 opacity-20">
                <Image src={auLogoImg} alt="Arellano University Logo" fill className="object-contain" />
              </div>
            </div>
          </div>

          {/* Pasay City West High School */}
          <div className="smooth-card stagger-child group relative overflow-hidden rounded-2xl border border-border/50 hover:border-accent/40 bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
            {/* Top accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-violet-500/60 to-transparent" />
            <div className="p-5 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                    <GraduationCap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-tight">Pasay City West High School</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Junior High School</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-full px-2.5 py-1">
                  2017 – 2020
                </span>
              </div>

              {/* Track */}
              <p className="text-xs text-muted-foreground border-l-2 border-accent/30 pl-3">
                Foreign Language · Mathematics · Journalism & Broadcasting
              </p>

              {/* Awards grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'With High Honors', icon: '🏅' },
                  { label: 'Best In Mandarin', sub: 'FOLA', icon: '🌟' },
                  { label: 'Math Olympics', sub: '2nd Place', icon: '➕' },
                  { label: 'MTAP Representative', icon: '📐' },
                ].map(({ label, sub, icon }) => (
                  <div key={label} className="flex items-start gap-2 rounded-xl bg-accent/5 border border-accent/10 px-3 py-2.5">
                    <span className="text-base leading-none mt-0.5">{icon}</span>
                    <div>
                      <p className="text-xs font-semibold leading-tight text-foreground">{label}</p>
                      {sub && <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra details */}
              <div className="flex flex-col gap-1.5 pt-1 border-t border-border/40">
                {['PCWHS Journalism · News Writer', 'Robotics Participant'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent/70 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hover logo overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              <div className="relative w-48 h-48 opacity-20">
                <Image src={pcwhsLogoImg} alt="PCWHS Logo" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}