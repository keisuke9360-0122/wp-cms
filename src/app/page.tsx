"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainVisual from "../components/mv";
import Image from "next/image";
import Link from "next/link";
import TechCard from "../components/TechCard";
import {
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const worksSectionRef = useRef<HTMLDivElement>(null);
  const worksInnerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    })();
  }, []);

  // Works 横スクロール (PCのみ)
  useEffect(() => {
    const section = worksSectionRef.current;
    const inner = worksInnerRef.current;
    if (!section || !inner) return;

    // いったんクリア
    section.style.height = "auto";
    gsap.killTweensOf(inner);
    ScrollTrigger.getAll().forEach((t) => t.kill());

    // PCサイズだけで横スクロール演出を有効化
    if (window.innerWidth >= 1024) {
      const totalScroll = inner.scrollWidth - section.clientWidth;

      if (totalScroll > 0) {
        // PCだけ縦スクロール量を設定
        section.style.height = `${inner.scrollWidth}px`;

        gsap.to(inner, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalScroll}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }
  }, [posts]);

  // タイトル流れる演出
  useEffect(() => {
    if (aboutTitleRef.current) {
      gsap.to(aboutTitleRef.current, {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }
    if (contactTitleRef.current) {
      gsap.to(contactTitleRef.current, {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }
    if (worksTitleRef.current) {
      gsap.to(worksTitleRef.current, {
        xPercent: -100,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }
  }, []);

  return (
    <main className="bg-white text-black">
      <MainVisual />

      {/* About */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-30 max-w-4xl mx-auto md:py-48 py-24 px-8 text-center"
      >
        <div className="relative mx-auto px-0 py-0 md:px-12 md:py-24 bg-white/70">
          <h2
            ref={aboutTitleRef}
            className="z-10
  inline-block whitespace-nowrap 
  text-[clamp(3rem,12vw,10rem)]
  font-extrabold uppercase tracking-tight
  text-transparent bg-clip-text
  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
  drop-shadow-2xl pointer-events-none opacity-30"
          >
            About About About About About
          </h2>

          <p className="mb-12 text-gray-700 text-lg">
            フロントエンドエンジニアとして以下の技術を使った経験があります。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-8 max-w-4xl mx-auto">
            <TechCard
              icon={<FaReact className="text-sky-500" />}
              title="React"
            />
            <TechCard
              icon={<SiNextdotjs className="text-black" />}
              title="Next.js"
            />
            <TechCard
              icon={<FaWordpress className="text-blue-600" />}
              title="WordPress"
            />
            <TechCard
              icon={<SiTailwindcss className="text-teal-400" />}
              title="Tailwind CSS"
            />
            <TechCard
              icon={<FaHtml5 className="text-orange-500" />}
              title="HTML"
            />
            <TechCard
              icon={<FaCss3Alt className="text-blue-500" />}
              title="CSS"
            />
            <TechCard
              icon={<FaJsSquare className="text-yellow-400" />}
              title="JavaScript"
            />
          </div>
        </div>
      </section>

      {/* Works */}
      <section ref={worksSectionRef} id="works" className="relative bg-gray-50">
        {/* 背面に流れるタイトル */}
        <h2
          ref={worksTitleRef}
          className="absolute top-24 md:top-0 left-0 z-10
  inline-block whitespace-nowrap 
  text-[clamp(3rem,12vw,10rem)]
  font-extrabold uppercase tracking-tight
  text-transparent bg-clip-text
  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
  drop-shadow-2xl pointer-events-none opacity-30"
        >
          Works Works Works Works Works Works
        </h2>

        {/* 制作実績カード一覧 */}
        <div
          ref={worksInnerRef}
          className="flex gap-8 px-6 pt-36 md:pt-24
    w-full
    md:w-max
    overflow-x-auto md:overflow-x-hidden
    snap-x snap-mandatory"
        >
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="w-[85vw] md:w-[70vw] h-[50vh] md:h-[70vh]
       bg-white border border-gray-200 rounded-2xl
       overflow-hidden shadow-md flex-shrink-0 relative snap-start"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover transition-all duration-500"
                />
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-30 py-32 md:py-48 px-8 text-center"
      >
        <h2
          ref={contactTitleRef}
          className="z-10
  inline-block whitespace-nowrap 
  text-[clamp(3rem,12vw,10rem)]
  font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-2xl"
        >
          Contact Contact Contact Contact Contact
        </h2>
        <p className="mb-6 text-gray-800 text-lg">
          ご連絡は以下のSNSからお願いいたします。
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener"
            className="text-black hover:underline font-semibold"
          >
            Twitter
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener"
            className="text-black hover:underline font-semibold"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
