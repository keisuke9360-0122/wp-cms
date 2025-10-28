"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import leftImg from "@/public/620E83AD-CD60-4417-A226-E22FDD60889F_1_105_c.jpeg";
import rightImg from "@/public/53B8AC27-ABD3-4C1D-B0F6-A81FD066E592_1_105_c.jpeg";

export default function MainVisual() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* 背景（左右画像固定） */}
      <div className="absolute inset-0 flex">
        <div className="relative w-1/2 h-full">
          <Image
            src={leftImg}
            alt="Left"
            fill
            className="object-cover opacity-70"
          />
        </div>
        <div className="relative w-1/2 h-full">
          <Image
            src={rightImg}
            alt="Right"
            fill
            className="object-cover opacity-70"
          />
        </div>
      </div>

      {/* 波マスク */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: "url('/wave-mask.svg')",
          WebkitMaskImage: "url('/wave-mask.svg')",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "cover",
          WebkitMaskSize: "cover",
          background: "rgba(255,255,255,0.25)",
        }}
        animate={{
          y: ["-2%", "2%", "-2%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* テキスト */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-light z-20">
        <p className="tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          Stylish Wave Visual
        </p>
      </div>
    </section>
  );
}
