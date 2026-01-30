"use client";

import { useEffect, useState } from "react";
import "./loading-screen.css";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onLoadingComplete, 500);
    }, 3000); // Show loading for 3 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${!isLoading ? 'fade-out' : ''}`}>
      <p className="loader">
        <span>Yrie</span>
      </p>
    </div>
  );
}
