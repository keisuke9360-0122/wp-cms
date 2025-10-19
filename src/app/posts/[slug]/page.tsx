import { getPostBySlug } from "@/lib/getPostBySlug";
import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
}

export default async function PostDetail({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();
  return (
    <article className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {/* 実績リンクボタン */}
      {post.projectLink?.projectLink?.url && (
        <a
          href={post.projectLink.projectLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-neutral-900 text-white font-semibold hover:bg-neutral-700 transition-all duration-300"
        >
          実績を見る →
        </a>
      )}
    </article>
  );
}
