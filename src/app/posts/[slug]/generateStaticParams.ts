import { getPosts } from "@/lib/getPosts";
import { Post } from "@/types";

export async function generateStaticParams() {
  const posts: Post[] = await getPosts();
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
