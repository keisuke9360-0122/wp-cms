import { getPosts } from "@/lib/getPosts";
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
}
