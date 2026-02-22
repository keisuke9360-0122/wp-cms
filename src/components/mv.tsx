"use client";

import { motion } from "framer-motion";

export default function MainVisual() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFCF8] via-[#FAF7F1] to-[#F5EFE4]" />

      {/* 装飾ライン（上下） */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#DDD5C8]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#DDD5C8]" />

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

        {/* コンセプトタグ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="h-px w-10 bg-[#9C8468]" />
          <span className="text-[#9C8468] text-[11px] tracking-[0.45em] uppercase font-medium">
            Sense × Code
          </span>
          <div className="h-px w-10 bg-[#9C8468]" />
        </motion.div>

        {/* 名前 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display font-light tracking-[0.12em] text-[#1A1816] leading-none mb-6"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
        >
          KEISUKE
          <br />
          TSURUTA
        </motion.h1>

        {/* ロール */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-[#9C8468] text-xs tracking-[0.3em] uppercase mb-7"
        >
          Frontend Engineer
        </motion.p>

        {/* 区切り */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="w-16 h-px bg-[#C8BAA8] mx-auto mb-7"
        />

        {/* コンセプト文 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-[#7A7068] text-sm leading-loose"
        >
          美容師として磨いた審美眼を、
          <br />
          フロントエンド開発に活かしています。
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-10 flex gap-4 justify-center"
        >
          <a
            href="#works"
            className="px-8 py-3 bg-[#1A1816] text-[#FDFCF8] text-xs tracking-widest uppercase font-medium rounded-full hover:bg-[#3A3630] transition-colors"
          >
            Works
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-[#C8BAA8] text-[#7A7068] text-xs tracking-widest uppercase font-medium rounded-full hover:border-[#9C8468] hover:text-[#9C8468] transition-colors"
          >
            Contact
          </a>
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#B8ADA0] text-[10px] tracking-[0.4em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-[#C8BAA8]"
        />
      </motion.div>
    </section>
  );
}
