"use client";

import { getPosts } from "../lib/getPosts";
import PostsList from "../components/PostsList";
import MainVisual from "../components/mv";

import Link from "next/link";
import Image from "next/image";

import React, { useRef, useEffect } from "react";

export default function HomeWrapper() {
  // サーバー側でデータ取得
  // クライアント側でwheelイベントを付与
  return <HomeClient />;
}

function HomeClient() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const worksScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    })();
  }, []);

  useEffect(() => {
    const el = worksScrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [worksScrollRef]);

  return (
    <main className="bg-w">
      <MainVisual />

      {/* Aboutセクション */}
      <section className="max-w-2xl mx-auto py-16 px-4 text-center" id="about">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="mb-4 text-gray-300">
          フロントエンドエンジニアのポートフォリオサイトです。React/Next.js・WordPress・Tailwind
          CSSを使った制作実績やブログを掲載しています。
        </p>
        <Link href="/about" className="text-blue-400 hover:underline">
          もっと見る
        </Link>
      </section>

      {/* Worksセクション */}
      <section className="px-4" id="works">
        <h2 className="text-2xl font-bold mb-4">Works</h2>
        <div className="mb-4 text-gray-300">
          WordPressで管理している制作実績の一部を紹介します。
        </div>
        <div
          className="overflow-x-auto"
          ref={worksScrollRef}
          tabIndex={0}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-8 px-2 min-w-max">
            {posts.slice(0, 6).map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="w-96 min-w-[24rem] max-w-[24rem] flex-shrink-0 block group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
              >
                {post.featuredImage?.node?.sourceUrl && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div
                    className="text-neutral-400 text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 text-right">
          <Link href="/works" className="text-blue-400 hover:underline">
            もっと見る
          </Link>
        </div>
      </section>

      {/* Contactセクション */}
      <section className="max-w-xl mx-auto py-16 px-4 text-center" id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="mb-4">ご連絡は以下のSNSからお願いいたします。</p>
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
