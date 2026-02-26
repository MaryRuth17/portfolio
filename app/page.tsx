"use client";

import { useState, useEffect, useRef } from "react";
import { CustomCursor } from "@/components/custom-cursor";
import { LoadingScreen } from "@/components/loading-screen";
import { BackgroundEffect } from "@/components/background-effect";
import { Header } from "@/components/portfolio/header";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { Footer } from "@/components/portfolio/footer";
import { ScrollVelocity } from "@/components/ui/scroll-velocity";
import { FloatingActionButton } from "@/components/portfolio/floating-action-button";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [showHeader, setShowHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Pre-seed all section IDs so content is visible on first paint.
  // The IntersectionObserver will remove/re-add them to drive the
  // hide → slide-in animation when sections scroll out and back in.
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(
    new Set(["about", "projects", "contact"])
  );
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll to about section from hero
  const scrollToAbout = () => {
    scrollToSection("about");
  };

  // Update active section and header visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.3;
      
      setLastScrollY(scrollPosition);
      
      // Show header after scrolling past hero
      setShowHeader(scrollPosition > heroHeight);

      const sections = ["about", "projects", "contact"];
      const scrollWithOffset = scrollPosition + 200;

      // Check if we're still in hero section
      const aboutSection = document.getElementById("about");
      if (aboutSection && scrollPosition < aboutSection.offsetTop - 300) {
        setActiveSection("home");
        return;
      }

      // If the footer (contact section) is visible in the viewport, activate contact
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          setActiveSection("contact");
          return;
        }
      }

      // If near the bottom of the page, activate contact (fallback)
      const nearBottom =
        scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 200;
      if (nearBottom) {
        setActiveSection("contact");
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollWithOffset >= offsetTop && scrollWithOffset < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dedicated IntersectionObserver for footer/contact section
  useEffect(() => {
    const contactEl = document.getElementById("contact");
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection("contact");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver to trigger smooth animations when sections enter viewport
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Prefer data-section attribute over element id so wrapper divs
            // (e.g. the footer wrapper) can participate without overriding scroll targets.
            const sectionId =
              (entry.target as HTMLElement).dataset.section ?? entry.target.id;

            if (entry.isIntersecting) {
              // Section is entering viewport - trigger animation
              setAnimatedSections((prev) => new Set(prev).add(sectionId));
            } else {
              // Section is leaving viewport - reset so it can animate again on re-entry
              setAnimatedSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete(sectionId);
                return newSet;
              });
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -60px 0px",
        }
      );

      // Observe all sections
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <BackgroundEffect />
      <CustomCursor />
      
      {/* Header - appears after scrolling past hero */}
      <div className={`transition-all duration-700 ease-out ${showHeader ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Header activeSection={activeSection} onNavigate={scrollToSection} />
      </div>
      
      <main>
        {/* Hero Section - Full viewport */}
        <HeroSection onScrollDown={scrollToAbout} />

        {/* Scroll Velocity Transition - Large and tilted */}
        <div className="overflow-hidden -rotate-2 sm:scale-110 my-6 sm:my-8">
          <ScrollVelocity
            texts={["Software Development", "Cybersecurity"]}
            velocity={120}
            damping={50}
            stiffness={400}
            numCopies={6}
            className="text-[15vw] sm:text-[13vw] md:text-[10vw] font-bold tracking-tighter text-foreground py-12 sm:py-16 leading-none"
            velocityMapping={{ input: [0, 1000], output: [0, 5] }}
          />
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* About Section */}
          <section
            ref={(el) => { sectionRefs.current.about = el; }}
            id="about"
            data-section="about"
            className={`scroll-mt-28 section-transition ${
              animatedSections.has("about")
                ? "section-visible-state"
                : "section-hidden-state"
            }`}
          >
            <AboutSection />
          </section>

          {/* Projects Section */}
          <section
            ref={(el) => { sectionRefs.current.projects = el; }}
            id="projects"
            data-section="projects"
            className={`scroll-mt-28 section-transition ${
              animatedSections.has("projects")
                ? "section-visible-state"
                : "section-hidden-state"
            }`}
          >
            <ProjectsSection />
          </section>
        </div>

        {/* Contact / Footer — animated wrapper */}
        <div
          ref={(el) => { sectionRefs.current.contact = el; }}
          data-section="contact"
          className={`section-transition ${
            animatedSections.has("contact")
              ? "section-visible-state"
              : "section-hidden-state"
          }`}
        >
          <Footer />
        </div>
      </main>

      <FloatingActionButton />
    </>
  );
}
