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

      // ローディング画面を縮小＋フェードアウト
      tl.to(".loading-overlay", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      });

      // コンテンツをふわっとフェードイン
      tl.fromTo(
        "main",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );
    } else {
      // ローディング開始時の文字アニメーション
      gsap.fromTo(
        ".loading-char",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [loading]);

  if (!isVisible) return null;

  const text = "KEISUKE TSURUTA";

  return (
    <div className="loading-overlay fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div
        className="flex space-x-1 text-[clamp(2rem,8vw,6rem)] font-extrabold tracking-tight 
        bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 bg-clip-text text-transparent"
      >
        {text.split("").map((char, i) => (
          <span key={i} className="loading-char inline-block">
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
