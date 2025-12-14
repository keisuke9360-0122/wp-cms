"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/contexts/LoadingContext";

export default function LoadingOverlay() {
  const { loading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loading) {
      gsap.to(".loading-overlay", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setIsVisible(false),
      });
    }
  }, [loading]);

  if (!isVisible) return null;

  return (
    <div className="font-sans loading-overlay fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <span className="text-white text-2xl tracking-widest animate-pulse">
        LOADING...
      </span>
    </div>
  );
}
