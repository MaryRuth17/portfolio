"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -100px 0px", triggerOnce = false } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isRevealed };
}

// Component wrapper for scroll reveal
export function useMultipleScrollReveal(count: number, options?: UseScrollRevealOptions) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(new Array(count).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((element, index) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => {
              const newRevealed = [...prev];
              newRevealed[index] = true;
              return newRevealed;
            });
            if (options?.triggerOnce) {
              observer.unobserve(element);
            }
          } else if (!options?.triggerOnce) {
            setRevealed((prev) => {
              const newRevealed = [...prev];
              newRevealed[index] = false;
              return newRevealed;
            });
          }
        },
        { threshold: options?.threshold || 0.1, rootMargin: options?.rootMargin || "0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [options?.threshold, options?.rootMargin, options?.triggerOnce]);

  return { refs, revealed };
}
