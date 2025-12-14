"use client";

import { useEffect, useRef, useState } from "react";
import MainVisual from "../components/mv";
import Image from "next/image";
import Link from "next/link";
import TechCard from "../components/TechCard";
import { Post } from "@/types";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useLoading } from "@/app/contexts/LoadingContext";

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
  const worksSectionRef = useRef<HTMLDivElement>(null);
  const worksInnerRef = useRef<HTMLDivElement>(null);
  const worksPinRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const { setLoading } = useLoading();
  const contactTitleRef = useRef<HTMLHeadingElement>(null);

  // 下から競り上がるアニメーション
  useEffect(() => {
    const targets = gsap.utils.toArray<HTMLElement>([
      aboutRef.current,
      contactRef.current,
    ]);

    targets.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 150, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    })();
  }, []);

  // Works 横スクロール
  // useEffect(() => {
  //   if (posts.length === 0) return;

  //   const section = worksSectionRef.current;
  //   const inner = worksInnerRef.current;
  //   if (!section || !inner) return;

  //   // 既存のトリガーを消す
  //   ScrollTrigger.getAll()
  //     .filter((t) => t.vars.id === "worksScroll")
  //     .forEach((t) => t.kill());

  //   gsap.killTweensOf(inner);

  //   const totalScroll = inner.scrollWidth - section.clientWidth;

  //   if (window.innerWidth >= 768 && totalScroll > 0) {
  //     // ❗️scrollWidth を高さにしない
  //     // section.style.height = `${inner.scrollWidth}px`;

  //     // 👍 必要なのは “スクロール距離 + 画面の高さ”
  //     section.style.height = `${totalScroll}px`;

  //     gsap.to(inner, {
  //       x: -totalScroll,
  //       ease: "none",
  //       scrollTrigger: {
  //         id: "worksScroll",
  //         trigger: section,
  //         start: "top top",
  //         end: () => `+=${totalScroll}`,
  //         scrub: true,
  //         pin: true,
  //         anticipatePin: 1,
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //   }

  //   ScrollTrigger.refresh();
  // }, [posts]);
  useEffect(() => {
    if (posts.length === 0) return;
    const section = worksSectionRef.current;
    const inner = worksInnerRef.current;
    if (!section || !inner) return;

    const totalScroll = inner.scrollWidth - section.clientWidth;

    gsap.to(inner, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`, // 高さと一致
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.refresh();
  }, [posts]);

  // タイトル流す演出
  useEffect(() => {
    const refs = [
      aboutTitleRef.current,
      worksTitleRef.current,
      contactTitleRef.current,
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
    <main className="text-black">
      <MainVisual />

      {/* About */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-30 w-full py-24 md:py-48 px-2"
      >
        <h2
          ref={aboutTitleRef}
          className="z-10 inline-block whitespace-nowrap 
          text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight
          text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
          drop-shadow-2xl pointer-events-none opacity-30 mb-12"
        >
          About About About About About About
        </h2>

        <div className="mb-16">
          <p className="mb-6 text-gray-700 text-lg font-medium">
            フロントエンドエンジニアとして以下の技術を使った経験があります。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

        <div className="w-full max-w-none flex flex-col md:flex-row md:gap-12 items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex-shrink-0">
            <img
              src="/my_img.jpeg"
              alt="顔写真"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          <div className="md:w-2/3 text-left px-4 md:px-0">
            <h3 className="text-2xl font-bold mb-4">美容師としての自己紹介</h3>
            <p className="text-gray-700 mb-4">
              美容専門学校を卒業後、都内の有名サロンでアシスタントとして勤務。その後スタイリストとして独立し、カット・カラー・パーマ・ヘアセット全般の経験を積みました。
            </p>
            <p className="text-gray-700 mb-4">
              イベントや撮影のヘアメイクサポートも経験があり、幅広い技術とセンスでお客様に似合うスタイルを提供しています。
            </p>
            <p className="text-gray-700">
              現在はフロントエンドの技術と美容師としての経験を活かし、表現力のある仕事を追求しています。
            </p>
          </div>
        </div>
      </section>

      {/* Works */}
      {/* <section ref={worksSectionRef} id="works" className="relative"> */}
      {/* <h2
          ref={worksTitleRef}
          className="absolute top-24 md:top-0 left-0 z-10
          inline-block whitespace-nowrap 
          text-[clamp(3rem,12vw,10rem)]
          font-extrabold uppercase tracking-tight
          text-transparent bg-clip-text
          bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
          drop-shadow-2xl pointer-events-none opacity-30"
        >
          Works Works Works Works Works Works Works Works Works Works Works
          Works Works
        </h2> */}
      {/* <section ref={worksSectionRef} id="works" className="relative">
        <div
          ref={worksInnerRef}
          className="flex h-screen md:overflow-x-hidden"
          style={{ width: `${posts.length * 100}vw` }}
        >
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="w-[80vw] md:w-[60vw] h-[50vh] md:h-[70vh]
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
      </section> */}

      {/* Contact */}
      <section
        id="contact"
        className="relative z-30 py-32 md:py-48 px-8 text-center"
      >
        <h2
          ref={contactTitleRef}
          className="inline-block whitespace-nowrap 
          text-[clamp(3rem,12vw,10rem)]
          font-extrabold uppercase tracking-tight text-transparent bg-clip-text 
          bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-2xl"
        >
          Contact Contact Contact Contact Contact Contact Contact Contact
          Contact Contact Contact Contact
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
            href="https://github.com/keisuke9360-0122/wp-cms"
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
