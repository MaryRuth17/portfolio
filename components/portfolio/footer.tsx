"use client";

import { ArrowUpRight } from "lucide-react";
import Shuffle from "@/components/ui/Shuffle";
import facebookIcon  from "@/assets/images/icons/facebook.png";
import instagramIcon from "@/assets/images/icons/instagram.png";
import linkedinIcon  from "@/assets/images/icons/linkedin.png";
import credlyIcon    from "@/assets/images/icons/credly.png";
import gmailIcon     from "@/assets/images/icons/gmail.png";
import githubIcon    from "@/assets/images/icons/github.png";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/y.maryruth17",
    logo: facebookIcon.src,
    handle: "Mary Ruth Relator",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/its_mary.py",
    logo: instagramIcon.src,
    handle: "@its_mary.py",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/maryruthprelator/",
    logo: linkedinIcon.src,
    handle: "Mary Ruth Prelator",
  },
  {
    name: "Credly",
    href: "https://www.credly.com/users/relator-mary-ruth",
    logo: credlyIcon.src,
    handle: "Mary Ruth Relator",
  },
  {
    name: "Gmail",
    href: "https://mail.google.com/mail/?view=cm&to=maryruth.pesidas.relator@gmail.com",
    logo: gmailIcon.src,
    handle: "maryruth.pesidas.relator@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/MaryRuth17",
    logo: githubIcon.src,
    handle: "Mary Ruth Relator",
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-border/40 py-20 transition-colors duration-500">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base tinted surface */}
        <div className="absolute inset-0 bg-background" />
        {/* Top-left accent glow */}
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[100px]" />
        {/* Bottom-right accent glow */}
        <div className="absolute -bottom-24 -right-24 h-[360px] w-[360px] rounded-full bg-accent/8 blur-[90px]" />
        {/* Center soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Top border glow line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
      <div className="mx-auto w-full max-w-6xl 2xl:max-w-[90rem] flex flex-col gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-14">
          {/* Left: heading + description, vertically centered */}
          <div className="text-left space-y-4 lg:w-[28%] flex flex-col justify-center self-stretch">
            <Shuffle
              text="Let's Work Together!"
              tag="h2"
              textAlign="left"
              className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
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
            <p className="text-muted-foreground max-w-xs">
              {"Don't hesitate to reach out for collaborations, inquiries, or just to say hi!"}
            </p>
          </div>

            {/* Right: Social links grid — 1 col mobile, 2 cols tablet, 3 cols desktop, up to 3 cols ultrawide */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {socialLinks.map((link, index) => {
              const isMailto = link.href.startsWith('mailto:');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={isMailto ? undefined : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  className="smooth-card group relative overflow-hidden flex items-center gap-5 rounded-xl p-5 border border-border/50 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Shimmer sweep */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                    <img src={link.logo} alt={link.name} className="h-6 w-6 object-contain" />
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
    </footer>
  );
}
