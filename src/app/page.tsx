"use client";

import { useEffect, useRef, useState } from "react";
import MainVisual from "../components/mv";
import Image from "next/image";
import Link from "next/link";
import TechCard from "../components/TechCard";
import { Post } from "@/types";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useLoading } from "@/app/contexts/LoadingContext";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { hairWorks } from "./data/hairWorks";

import {
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedHairIndex, setSelectedHairIndex] = useState<number | null>(null);
  const worksSectionRef = useRef<HTMLDivElement>(null);
  const worksInnerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const hairTitleRef = useRef<HTMLDivElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const { setLoading } = useLoading();

  // ライトボックス：ESC・矢印キー操作 + body スクロールロック
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedHairIndex === null) return;
      if (e.key === "Escape") setSelectedHairIndex(null);
      if (e.key === "ArrowRight")
        setSelectedHairIndex((prev) =>
          prev !== null ? Math.min(prev + 1, hairWorks.length - 1) : null
        );
      if (e.key === "ArrowLeft")
        setSelectedHairIndex((prev) =>
          prev !== null ? Math.max(prev - 1, 0) : null
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = selectedHairIndex !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedHairIndex]);

  // Contact セクションの競り上がりアニメーション
  useEffect(() => {
    if (!contactRef.current) return;
    gsap.fromTo(
      contactRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 85%",
        },
      }
    );
    ScrollTrigger.refresh();
  }, []);

  // About セクション：写真・テキストの個別アニメーション
  useEffect(() => {
    // 写真：下からふんわり＋わずかにスケール
    gsap.fromTo(
      ".about-photo",
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-photo",
          start: "top 85%",
        },
      }
    );

    // テキスト各要素：少しずつずれてスタッガー入場
    gsap.fromTo(
      ".about-text-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".about-text-item",
          start: "top 88%",
        },
      }
    );

    ScrollTrigger.refresh();
  }, []);

  // 投稿データ取得
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    })();
  }, []);

  // PC: 横スクロール / SP: 通常スクロール
  useEffect(() => {
    if (posts.length === 0) return;
    const section = worksSectionRef.current;
    const inner = worksInnerRef.current;
    if (!section || !inner) return;

    const totalScroll = inner.scrollWidth - window.innerWidth;

    if (window.innerWidth >= 768 && totalScroll > 0) {
      gsap.set(inner, { x: 0 });

      const tween = gsap.to(inner, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          id: "worksScroll",
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.vars.id === "worksScroll")
          .forEach((t) => t.kill());
      };
    } else {
      gsap.set(inner, { clearProps: "all" });
    }
  }, [posts]);

  // Hair Works カードのスタッガー入場アニメーション
  // ※ postsロード後に実行して Works pin スペーサー分の位置ズレを防ぐ
  useEffect(() => {
    if (posts.length === 0) return;
    const cards = gsap.utils.toArray<HTMLElement>(".hair-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            invalidateOnRefresh: true,
          },
        }
      );
    });
    ScrollTrigger.refresh();
  }, [posts]);

  // セクションタイトルの流れるマーキーアニメーション
  useEffect(() => {
    const refs = [
      aboutTitleRef.current,
      worksTitleRef.current,
      contactTitleRef.current,
      hairTitleRef.current,
    ];

    refs.forEach((el) => {
      if (!el) return;
      const width = el.offsetWidth / 2;
      gsap.set(el, { x: 0 });
      gsap.to(el, {
        x: -width,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    });
  }, []);

  return (
    <main>
      <MainVisual />

      {/* ── About ── */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-30 w-full py-16 md:py-32 px-4"
      >
        {/* マーキータイトル */}
        <div className="overflow-hidden mb-16 pointer-events-none -mx-4">
          <h2
            ref={aboutTitleRef}
            className="inline-block whitespace-nowrap
            text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight
            text-transparent bg-clip-text
            bg-gradient-to-r from-amber-400 via-stone-500 to-amber-700
            opacity-20"
          >
            Skill & About&nbsp;&nbsp;Skill & About&nbsp;&nbsp;Skill &
            About&nbsp;&nbsp;Skill & About&nbsp;&nbsp;Skill &
            About&nbsp;&nbsp;Skill & About&nbsp;&nbsp;
          </h2>
        </div>

        {/* スキルカード */}
        <div className="mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <TechCard
              icon={<FaWordpress className="text-blue-600" />}
              title="WordPress"
              years={6}
              maxYears={6}
            />
            <TechCard
              icon={<FaReact className="text-sky-500" />}
              title="React"
              years={2}
              maxYears={6}
            />
            <TechCard
              icon={<SiNextdotjs />}
              title="Next.js"
              years={1}
              maxYears={6}
            />
            <TechCard
              icon={<FaHtml5 className="text-orange-500" />}
              title="HTML"
              years={6}
              maxYears={6}
            />
            <TechCard
              icon={<FaCss3Alt className="text-blue-500" />}
              title="CSS"
              years={6}
              maxYears={6}
            />
            <TechCard
              icon={<FaJsSquare className="text-yellow-400" />}
              title="JavaScript"
              years={4}
              maxYears={6}
            />
            <TechCard
              icon={<SiTailwindcss className="text-teal-400" />}
              title="Tailwind CSS"
              years={2}
              maxYears={6}
            />
          </div>
        </div>

        {/* プロフィール */}
        <div className="w-full flex flex-col md:flex-row md:gap-16 items-start max-w-5xl mx-auto">
          {/* 写真 */}
          <div className="about-photo md:w-[35%] mb-10 md:mb-0 flex-shrink-0">
            <img
              src="/my_img.jpeg"
              alt="鶴田圭介"
              className="w-full rounded-xl shadow-md object-cover"
            />
          </div>

          {/* テキスト */}
          <div className="md:w-[65%] text-left">
            <p className="about-text-item text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-3">
              Profile
            </p>
            <h3
              className="about-text-item font-display font-light text-3xl md:text-4xl tracking-wide text-[#1A1816] mb-8"
            >
              Keisuke Tsuruta
            </h3>

            <p className="about-text-item text-stone-600 mb-5 leading-loose text-sm md:text-base">
              美容専門学校を卒業後、上京して都内のヘアサロンへ。
              アシスタント期間を経て28歳でスタイリストとしてデビューし、
              カットセミナーの講師や、撮影現場でのヘアメイクも経験しました。
            </p>
            <p className="about-text-item text-stone-600 mb-5 leading-loose text-sm md:text-base">
              「人の見た目を整える」という仕事を通して、バランス・質感・
              細部への感覚が自然と身についていきました。
              その経験が、のちにWebのUIを制作するうえで大きな武器になるとは、
              当時は思いもしませんでした。
            </p>
            <p className="about-text-item text-stone-600 leading-loose text-sm md:text-base">
              30歳で地元・福岡へ戻り、サロン勤務を続けながら独学でHTMLから学び始め、
              JavaScript・React・Next.jsへと発展。
              37歳でWeb制作会社に転職し、現在はフロントエンドの制作に向き合っています。
              美容師時代に磨いた審美眼は、今もUIの細部やクライアントとのやり取りに生きています。
            </p>

            <div className="about-text-item flex gap-6 mt-10">
              <a
                href="https://instagram.com/keitsuru0122"
                target="_blank"
                rel="noopener"
                className="text-stone-400 hover:text-[#9C8468] transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/keisuke9360-0122/wp-cms"
                target="_blank"
                rel="noopener"
                className="text-stone-400 hover:text-[#9C8468] transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Web Works ── */}
      <section
        ref={worksSectionRef}
        id="works"
        className="relative py-16 md:py-0 md:h-screen md:flex md:flex-col"
      >
        {/* マーキータイトル */}
        <div className="overflow-hidden mb-16 pointer-events-none">
          <h2
            ref={worksTitleRef}
            className="inline-block whitespace-nowrap
            text-[clamp(3rem,12vw,10rem)]
            font-extrabold uppercase tracking-tight
            text-transparent bg-clip-text
            bg-gradient-to-r from-amber-400 via-stone-500 to-amber-700
            opacity-20"
          >
            WebWorks&nbsp;&nbsp;WebWorks&nbsp;&nbsp;WebWorks&nbsp;&nbsp;WebWorks&nbsp;&nbsp;WebWorks&nbsp;&nbsp;WebWorks&nbsp;&nbsp;
          </h2>
        </div>

        <div
          ref={worksInnerRef}
          className="flex flex-col gap-6 px-6
          md:flex-row md:gap-8
          md:flex-1 md:items-center
          md:overflow-visible"
        >
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="w-full md:w-auto md:min-w-[50vw] md:flex-shrink-0 aspect-[16/9]
              bg-white border border-stone-200 rounded-2xl
              overflow-hidden shadow-md relative
              group"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-6">
                <h3 className="text-base md:text-xl font-semibold text-white drop-shadow-md">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Hair Works ── */}
      <section id="hair-works" className="relative w-full py-16 md:py-32 px-4">
        {/* マーキータイトル */}
        <div className="overflow-hidden mb-16 pointer-events-none -mx-4">
          <h2
            ref={hairTitleRef}
            className="inline-block whitespace-nowrap
            text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight
            text-transparent bg-clip-text
            bg-gradient-to-r from-rose-300 via-amber-400 to-stone-500
            opacity-20"
          >
            Hair Works&nbsp;&nbsp;Hair Works&nbsp;&nbsp;Hair Works&nbsp;&nbsp;Hair Works&nbsp;&nbsp;Hair Works&nbsp;&nbsp;
          </h2>
        </div>

        {/* セクション説明 */}
        <p className="text-stone-500 text-sm leading-loose max-w-xl mx-auto text-center mb-16">
          美容師として10年以上、カット・カラー・ヘアセットを担当してきました。
          <br />
          この仕事を通じて磨かれた審美眼と手仕事の精度が、今のフロントエンド開発に活きています。
        </p>

        {/* 1枚目：フィーチャー（全幅） */}
        <div className="mb-6 max-w-screen-xl mx-auto">
          <div
            className="hair-card w-full aspect-[3/2] relative rounded-2xl overflow-hidden shadow-lg group cursor-zoom-in"
            onClick={() => setSelectedHairIndex(0)}
          >
            <Image
              src={hairWorks[0].src}
              alt={hairWorks[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white text-sm font-medium tracking-widest uppercase">
                {hairWorks[0].title}
              </p>
            </div>
          </div>
        </div>

        {/* 2枚目以降：2カラムグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-xl mx-auto">
          {hairWorks.slice(1).map((item, i) => (
            <div
              key={item.id}
              className="hair-card w-full aspect-[3/2] relative rounded-2xl overflow-hidden shadow-md group cursor-zoom-in"
              onClick={() => setSelectedHairIndex(i + 1)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white text-sm font-medium tracking-widest uppercase">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        ref={contactRef}
        className="relative z-30 pt-16 md:pt-32 px-8 text-center pb-16"
      >
        {/* マーキータイトル */}
        <div className="overflow-hidden mb-16 pointer-events-none -mx-8">
          <h2
            ref={contactTitleRef}
            className="inline-block whitespace-nowrap
            text-[clamp(3rem,12vw,10rem)]
            font-extrabold uppercase tracking-tight text-transparent bg-clip-text
            bg-gradient-to-r from-amber-400 via-stone-500 to-amber-700
            opacity-20"
          >
            Contact&nbsp;&nbsp;Contact&nbsp;&nbsp;Contact&nbsp;&nbsp;Contact&nbsp;&nbsp;Contact&nbsp;&nbsp;Contact&nbsp;&nbsp;
          </h2>
        </div>

        <p className="mb-8 text-stone-500 text-sm leading-loose">
          ご連絡は以下のフォームからお願いいたします。
        </p>

        <form
          action="/api/contact"
          method="POST"
          className="max-w-lg mx-auto space-y-6 text-left"
        >
          <div>
            <label className="block text-xs font-medium text-stone-500 tracking-wider mb-1">
              お名前
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full rounded-lg border border-stone-200 bg-white/70 shadow-sm px-4 py-3 text-sm
              focus:border-[#9C8468] focus:ring-[#9C8468] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 tracking-wider mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full rounded-lg border border-stone-200 bg-white/70 shadow-sm px-4 py-3 text-sm
              focus:border-[#9C8468] focus:ring-[#9C8468] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-500 tracking-wider mb-1">
              メッセージ
            </label>
            <textarea
              name="message"
              rows={4}
              className="mt-1 block w-full rounded-lg border border-stone-200 bg-white/70 shadow-sm px-4 py-3 text-sm
              focus:border-[#9C8468] focus:ring-[#9C8468] focus:outline-none transition-colors resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#1A1816] text-[#FDFCF8] text-xs tracking-widest uppercase font-medium rounded-full
            transition-all duration-200 hover:bg-[#3A3630] hover:-translate-y-0.5 hover:shadow-lg"
          >
            送信する
          </button>
        </form>

        <div className="flex justify-center gap-8 mt-20">
          <a
            href="https://instagram.com/keitsuru0122"
            target="_blank"
            rel="noopener"
            className="text-stone-400 hover:text-[#9C8468] transition-colors"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/keisuke9360-0122/wp-cms"
            target="_blank"
            rel="noopener"
            className="text-stone-400 hover:text-[#9C8468] transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </section>

      <footer className="py-8 text-center text-xs text-stone-400 tracking-wider">
        © 2025 Keisuke Tsuruta. All Rights Reserved.
      </footer>

      {/* ── Hair Works ライトボックス ── */}
      <AnimatePresence>
        {selectedHairIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedHairIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 画像 */}
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={hairWorks[selectedHairIndex].src}
                  alt={hairWorks[selectedHairIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* タイトル */}
              <p className="mt-4 text-center text-white/70 text-xs tracking-[0.3em] uppercase">
                {hairWorks[selectedHairIndex].title}
                <span className="ml-4 text-white/40">
                  {selectedHairIndex + 1} / {hairWorks.length}
                </span>
              </p>

              {/* 閉じるボタン */}
              <button
                onClick={() => setSelectedHairIndex(null)}
                className="absolute -top-12 right-0 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="閉じる"
              >
                <FaXmark className="w-5 h-5" />
              </button>

              {/* 前へ */}
              {selectedHairIndex > 0 && (
                <button
                  onClick={() => setSelectedHairIndex((p) => (p ?? 0) - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="前の画像"
                >
                  <FaChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* 次へ */}
              {selectedHairIndex < hairWorks.length - 1 && (
                <button
                  onClick={() => setSelectedHairIndex((p) => (p ?? 0) + 1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  aria-label="次の画像"
                >
                  <FaChevronRight className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
