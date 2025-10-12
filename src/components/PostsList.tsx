"use client";
import { useRef, useEffect } from "react";
import { useScrollAnimation } from "../lib/useScrollAnimation";
import Image from "next/image";
import Link from "next/link";

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
  useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // スクロール領域内でのみ横スクロール
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">記事がありません。</p>
    );
  }
  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 py-10 bg-neutral-950 min-h-[60vh]"
      tabIndex={0}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="flex gap-8 px-8 min-w-max">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="min-w-[320px] max-w-xs flex-shrink-0 block group"
            tabIndex={-1}
          >
            <article
              className="w-full h-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1 opacity-0 group-hover:shadow-[0_0_32px_rgba(0,200,255,0.15)]"
              data-animate
            >
              {post.featuredImage?.node?.sourceUrl && (
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              )}

              <div className="p-6 text-neutral-100">
                <h2 className="text-lg font-semibold mb-3 tracking-wide group-hover:text-white transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <div
                  className="text-neutral-400 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
