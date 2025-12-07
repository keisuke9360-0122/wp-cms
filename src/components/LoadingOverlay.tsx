"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/contexts/LoadingContext";

export default function LoadingOverlay() {
  const { loading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({
        onComplete: () => setIsVisible(false),
      });

      // ローディング画面をフェードアウト
      tl.to(".loading-overlay", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // コンテンツをふわっとフェードイン
      tl.fromTo(
        "main",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.4" // ローディングが消える直前からコンテンツを出す
      );
    } else {
      // ローディング開始時の文字アニメーション
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
