"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MainVisual() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* 背景（固定） */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: "url('/main-bg.jpg')", // ← public/main-bg.jpg に画像を置いてね
        }}
      />

      {/* トーン用オーバーレイ */}
      <div className="absolute inset-0" />

      {/* 中央テキスト */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="font-inter relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
      >
        <h1 className="text-2xl md:text-2xl font-bold tracking-widest mb-4">
          KEISUKE TSURUTA PORTFOLIO
        </h1>
        <p className="text-lg md:text-xl">Frontend Engineer / Hair Stylist</p>
      </motion.div>
    </section>
  );
}
