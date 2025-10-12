import Image from "next/image";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
};

export default function PostsList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">記事がありません。</p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10 bg-neutral-950 min-h-screen">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
        >
          {post.featuredImage?.node?.sourceUrl && (
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          )}

          <div className="p-6 text-neutral-100">
            <h2 className="text-lg font-semibold mb-3 tracking-wide hover:text-white transition-colors line-clamp-2">
              {post.title}
            </h2>
            <div
              className="text-neutral-400 text-sm line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
