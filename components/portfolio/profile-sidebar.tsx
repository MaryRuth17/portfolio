"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    name: "Website",
    icon: "/zeke.jpg",
    url: "https://www.heyzeke.me/",
    label: "heyzeke.me",
    color: "hover:border-zinc-400/60 hover:bg-zinc-500/10",
    glow: "hover:shadow-[0_0_12px_rgba(161,161,170,0.15)]",
  },
  {
    name: "LinkedIn",
    icon: "/icons/linkedin.png",
    url: "https://www.linkedin.com/in/ezekielgbustamante/",
    label: "Ezekiel Bustamante",
    color: "hover:border-blue-400/60 hover:bg-blue-500/10",
    glow: "hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]",
  },
  {
    name: "Instagram",
    icon: "/icons/instagram.png",
    url: "https://www.instagram.com/kielsough/",
    label: "@kielsough",
    color: "hover:border-pink-400/60 hover:bg-pink-500/10",
    glow: "hover:shadow-[0_0_12px_rgba(244,114,182,0.20)]",
  },
  {
    name: "Facebook",
    icon: "/icons/facebook.png",
    url: "https://www.facebook.com/ezekiel.bustamante.549",
    label: "Ezekiel Bustamante",
    color: "hover:border-blue-500/60 hover:bg-blue-600/10",
    glow: "hover:shadow-[0_0_12px_rgba(99,102,241,0.15)]",
  },
];

const featuredPhotos = [
  { src: "/feature.jpg"},
  { src: "/feature2.jpg"},
  { src: "/feature3.jpg"},
];

interface ProfileSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ProfileSidebar({ isOpen, onToggle }: ProfileSidebarProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoDir, setPhotoDir] = useState(1);

  const goPhoto = (dir: number) => {
    setPhotoDir(dir);
    setPhotoIndex((prev) => (prev + dir + featuredPhotos.length) % featuredPhotos.length);
  };

  return (
    <>
      {/* ── Sidebar panel ── */}
      <div
        className={cn(
          "fixed left-0 top-1/2 -translate-y-1/2 z-40",
          /* Sidebar panel — width is capped at 85 vw so it never overflows on tiny phones */
          "flex flex-col h-[82svh] overflow-hidden",
          "w-[min(15rem,85vw)]",
          "bg-background/[0.97] backdrop-blur-2xl",
          "border border-border/50 rounded-r-3xl",
          "shadow-[6px_0_48px_-8px_rgba(0,0,0,0.5)]",
          "transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Decorative top-right glow blob */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />

        {/* ── Profile header banner ── */}
        <div
          className="relative flex flex-col items-center gap-3 px-6 pt-12 pb-6"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklch, var(--accent) 18%, transparent) 0%, transparent 70%)",
          }}
        >
          {/* Subtle dot grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Avatar with animated glow ring */}
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute -inset-1 rounded-full opacity-60 blur-md animate-pulse"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--accent), transparent, var(--accent))",
              }}
            />
            {/* Inner ring border */}
            <div className="relative w-24 h-24 rounded-full p-[2.5px] bg-gradient-to-br from-accent/80 via-accent/30 to-transparent">
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-background/60 shadow-xl">
                <Image
                  src="/ezekiel.jpg"
                  alt="Ezekiel Bustamante"
                  fill
                  className="object-cover scale-105"
                  sizes="96px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Name + role */}
          <div className="relative text-center">
            <p className="text-sm font-bold tracking-wide text-foreground drop-shadow-sm">
              Ezekiel Bustamante
            </p>
            <div className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 bg-accent/15 border border-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-medium text-accent uppercase tracking-widest">
                Get to know me
              </span>
            </div>
          </div>
        </div>

        {/* Divider with gradient fade */}
        <div className="h-px mx-4 bg-gradient-to-r from-transparent via-border/80 to-transparent" />

        {/* ── Tabbed content ── */}
        <div className="flex-1 overflow-hidden px-3 pt-4">
          <Tabs defaultValue="information" className="h-full flex flex-col">
            <TabsList className="w-full rounded-xl h-9 bg-muted/50 border border-border/40 p-[3px] gap-1">
              <TabsTrigger
                value="information"
                className="flex-1 text-[11px] font-semibold tracking-wider uppercase rounded-lg
                  data-[state=active]:bg-accent data-[state=active]:text-accent-foreground
                  data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                  transition-all duration-250"
              >
                About Him
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="flex-1 text-[11px] font-semibold tracking-wider uppercase rounded-lg
                  data-[state=active]:bg-accent data-[state=active]:text-accent-foreground
                  data-[state=active]:shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                  transition-all duration-250"
              >
                About Us
              </TabsTrigger>
            </TabsList>

            {/* ── Information tab ── */}
            <TabsContent value="information" className="flex-1 overflow-y-auto mt-3 scrollbar-thin">
              <div className="flex flex-col gap-2 pb-6">
                {socialLinks.map((link, i) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{ animationDelay: `${i * 40}ms` }}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5",
                      "border border-border/40 bg-card/40",
                      "transition-all duration-250",
                      link.color,
                      link.glow
                    )}
                  >
                    {/* Icon with subtle bg pill */}
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 border border-border/30 shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <div className="relative w-5 h-5">
                        <Image
                          src={link.icon}
                          alt={link.name}
                          fill
                          className="object-contain"
                          sizes="20px"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate leading-tight">
                        {link.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground/55 truncate mt-0.5 leading-tight">
                        {link.label}
                      </p>
                    </div>

                    {/* External link arrow */}
                    <ExternalLink className="w-3 h-3 text-muted-foreground/30 group-hover:text-accent/60 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </TabsContent>

            {/* ── Featured photo tab ── */}
            <TabsContent value="featured" className="flex-1 overflow-y-auto mt-3">
              <div className="flex flex-col gap-3 pb-4">
                {/* Photo card */}
                <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-accent/50 via-accent/10 to-transparent shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
                  <div className="relative w-full aspect-[4/5] rounded-[14px] overflow-hidden bg-muted">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={photoIndex}
                        initial={{ opacity: 0, x: photoDir * 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: photoDir * -40 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={featuredPhotos[photoIndex].src}
                          alt={`Featured photo ${photoIndex + 1} of Ezekiel Bustamante`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 240px) 100vw, 240px"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Prev / Next arrows */}
                    <button
                      onClick={() => goPhoto(-1)}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-white" />
                    </button>
                    <button
                      onClick={() => goPhoto(1)}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-1.5">
                  {featuredPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setPhotoDir(i > photoIndex ? 1 : -1); setPhotoIndex(i); }}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === photoIndex
                          ? "w-4 h-1.5 bg-accent"
                          : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      )}
                    />
                  ))}
                </div>

                {/* Decorative accent line */}
                <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px] sm:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
