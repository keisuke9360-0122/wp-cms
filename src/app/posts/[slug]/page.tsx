import { getPostBySlug } from "@/lib/getPostBySlug";
import { getPosts } from "@/lib/getPosts";
import { notFound } from "next/navigation";
import { Post } from "@/types";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostDetail({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg">
        {post.title}
      </h1>

      <div
        className="prose prose-lg text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />

      {post.projectLink?.projectLink?.url && (
        <a
          href={post.projectLink.projectLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 px-8 py-4 rounded-full bg-black text-white text-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
        >
          実績を見る →
        </a>
      )}
    </article>
  );
}
