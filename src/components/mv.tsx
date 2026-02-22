"use client";

import { motion } from "framer-motion";

export default function MainVisual() {
  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center bg-neutral-950">
      {/* 背景：上部から青みがかったグラデーション */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950 to-neutral-950" />

      {/* 背景：サブタルなグリッドパターン */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-blue-400 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium"
        >
          Frontend Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-none"
        >
          KEISUKE
          <br />
          TSURUTA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-neutral-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed"
        >
          React / Next.js / WordPress を軸に
          <br />
          Web制作・フロントエンド開発に取り組んでいます。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex gap-4 justify-center"
        >
          <a
            href="#works"
            className="px-8 py-3 bg-white text-neutral-950 font-semibold rounded-full hover:bg-neutral-200 transition-colors text-sm"
          >
            Works
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-neutral-600 text-white rounded-full hover:border-white transition-colors text-sm"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-neutral-500 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-neutral-500"
        />
      </motion.div>
    </section>
  );
}
