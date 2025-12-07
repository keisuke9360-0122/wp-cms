"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/contexts/LoadingContext";

export default function LoadingOverlay() {
  const { loading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (loading) {
      // 一文字ずつ下からフェードイン
      gsap.fromTo(
        ".loading-char",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    } else {
      // 読み込み完了時に上に飛んで消える
      gsap.to(".loading-char", {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => setIsVisible(false),
      });
    }
  }, [loading]);

  if (!isVisible) return null;

  const text = "LOADING...";

  return (
    <div className="loading-overlay fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="flex space-x-1 text-white text-2xl tracking-widest font-sans">
        {text.split("").map((char, i) => (
          <span key={i} className="loading-char">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
