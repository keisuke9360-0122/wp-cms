"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
};

export default function PostsList({ posts }: { posts: Post[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    const totalWidth = horizontal.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    // 余白を追加して自然な縦→横→縦へ
    const verticalMargin = window.innerHeight; // 1画面分

    container.style.height = `${scrollDistance + verticalMargin * 2}px`;

    gsap.to(horizontal, {
      x: () => -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: `top+=${verticalMargin / 2}px top`,
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onEnter: () => console.log("🟢 横スクロール開始"),
        onLeave: () => console.log("🔴 横スクロール終了（下へ）"),
        onEnterBack: () => console.log("🟢 戻ってきた（上へ）"),
        onLeaveBack: () => console.log("🔴 横スクロール終了（上へ）"),
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  if (!posts?.length) {
    return (
      <p className="text-center text-gray-500 mt-10">記事がありません。</p>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-neutral-950 overflow-hidden"
    >
      {/* 横スクロールエリア */}
      <div
        ref={horizontalRef}
        className="absolute top-0 left-0 flex gap-8 px-8 h-screen items-center"
      >
        {posts.map((post) => (
          <a
            key={post.id}
            href={`/posts/${post.slug}`}
            className="relative min-w-[80vw] md:min-w-[45vw] lg:min-w-[30vw] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 shadow-lg hover:-translate-y-2 transition-all duration-500"
          >
            <div className="relative w-full aspect-square overflow-hidden">
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80">
              <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                {post.title}
              </h2>
              <div
                className="text-neutral-300 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
