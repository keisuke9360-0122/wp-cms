"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainVisual from "../components/mv";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const worksSectionRef = useRef<HTMLDivElement>(null);
  const worksInnerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    })();
  }, []);

  useEffect(() => {
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
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [posts]);

  // 🪶 Aboutセクション：背景パララックス
  useEffect(() => {
    if (!aboutRef.current) return;
    gsap.to(aboutRef.current, {
      backgroundPositionY: "40%",
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // 💫 Contactセクション：ふわっとフェードアップ
  useEffect(() => {
    if (!contactRef.current) return;
    gsap.from(contactRef.current.querySelectorAll("h2, p, a"), {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 1,
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <main className="bg-neutral-950 text-white">
      <MainVisual />

      {/* About */}
      <section
        ref={aboutRef}
        className="max-w-2xl mx-auto py-32 px-4 text-center bg-[url('/53B8AC27-ABD3-4C1D-B0F6-A81FD066E592_1_105_c.jpeg')] bg-cover bg-center bg-fixed"
        id="about"
      >
        <div className="bg-black/50 p-10 rounded-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            フロントエンドエンジニアのポートフォリオサイトです。
            React/Next.js・WordPress・Tailwind
            CSSを使った制作実績やブログを掲載しています。
          </p>
          <Link href="/about" className="text-blue-400 hover:underline">
            もっと見る
          </Link>
        </div>
      </section>

      {/* Works（縦→横スクロールゾーン） */}
      <section
        ref={worksSectionRef}
        className="relative h-screen overflow-hidden bg-neutral-900"
        id="works"
      >
        <h2 className="absolute top-8 left-8 text-3xl font-bold z-10">Works</h2>

        <div
          ref={worksInnerRef}
          className="flex h-screen items-center gap-10 px-20"
        >
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="min-w-[70vw] h-[70vh] bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 relative"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover opacity-90 hover:opacity-100 transition-all duration-500"
                />
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-xl font-semibold">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        ref={contactRef}
        className="max-w-xl mx-auto py-32 px-4 text-center bg-neutral-950"
        id="contact"
      >
        <h2 className="text-3xl font-bold mb-6">Contact</h2>
        <p className="mb-4 text-gray-300">
          ご連絡は以下のSNSからお願いいたします。
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener"
            className="text-blue-400 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener"
            className="text-gray-300 hover:underline"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  );
}
