import { getPosts } from "../../lib/getPosts";
import Link from "next/link";
import Image from "next/image";

export default async function WorksPage() {
  const posts = await getPosts();
  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Works</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="block group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-1"
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
            <div className="p-6 text-neutral-100">
              <h2 className="text-lg font-semibold mb-3 tracking-wide group-hover:text-white transition-colors line-clamp-2">
                {post.title}
              </h2>
              <div
                className="text-neutral-400 text-sm line-clamp-3"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
