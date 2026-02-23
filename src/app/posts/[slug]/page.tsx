import { getPosts } from "@/lib/getPosts";
import { getPostBySlug } from "@/lib/getPostBySlug";
import { notFound } from "next/navigation";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const w = post.workDetails;
  const desktopSrc = w?.desktopThumbnail?.node?.sourceUrl ?? post.featuredImage?.node?.sourceUrl;
  const mobileSrc  = w?.mobileThumbnail?.node?.sourceUrl  ?? desktopSrc;

  return (
    <main className="min-h-screen">

      {/* ── ヒーロー画像（レスポンシブ切り替え） ── */}
      {desktopSrc && (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          {/* スマホ用 */}
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrc} />
            <img
              src={mobileSrc ?? desktopSrc}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* ── コンテンツ ── */}
      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* 戻るリンク */}
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#9C8468] hover:text-stone-600 transition-colors mb-10"
        >
          ← Works
        </Link>

        {/* タイトル */}
        <h1 className="font-display font-light text-4xl md:text-5xl tracking-wide text-[#1A1816] mb-10 leading-snug">
          {post.title}
        </h1>

        {/* メタ情報 */}
        {(w?.period || w?.role || w?.usedTech) && (
          <div className="flex flex-col gap-4 border-t border-b border-stone-200 py-8 mb-10">
            {w?.period && (
              <div className="flex gap-6 text-sm">
                <span className="w-24 flex-shrink-0 text-xs tracking-widest uppercase text-[#9C8468]">
                  Period
                </span>
                <span className="text-stone-700">{w.period}</span>
              </div>
            )}
            {w?.role && (
              <div className="flex gap-6 text-sm">
                <span className="w-24 flex-shrink-0 text-xs tracking-widest uppercase text-[#9C8468]">
                  Role
                </span>
                <span className="text-stone-700">{w.role}</span>
              </div>
            )}
            {w?.usedTech && (
              <div className="flex gap-6 text-sm">
                <span className="w-24 flex-shrink-0 text-xs tracking-widest uppercase text-[#9C8468]">
                  Tech
                </span>
                <div className="flex flex-wrap gap-2">
                  {w.usedTech.split(/[,、・]/).map((t) => t.trim()).filter(Boolean).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-stone-100 text-stone-600 border border-stone-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 概要 */}
        {w?.overview && (
          <p className="text-stone-600 leading-loose text-base mb-10">
            {w.overview}
          </p>
        )}

        {/* 本文（WordPress エディタ） */}
        {post.content && (
          <div
            className="prose prose-stone prose-sm md:prose-base max-w-none mb-12
            prose-headings:font-display prose-headings:font-light prose-headings:tracking-wide
            prose-a:text-[#9C8468] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* ギャラリー */}
        {w?.gallery?.nodes && w.gallery.nodes.length > 0 && (
          <div className="mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#9C8468] mb-6">Gallery</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {w.gallery.nodes.map((img, i) => (
                <div key={i} className="relative aspect-[3/2] rounded-xl overflow-hidden">
                  <Image
                    src={img.sourceUrl}
                    alt={img.altText ?? `gallery-${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 実績リンク */}
        {post.projectLink?.projectLink?.url && (
          <a
            href={post.projectLink.projectLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#1A1816] text-[#FDFCF8] text-xs tracking-widest uppercase font-medium rounded-full
            hover:bg-[#3A3630] transition-colors"
          >
            実績を見る →
          </a>
        )}

      </article>
    </main>
  );
}
