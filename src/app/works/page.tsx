import { getPosts } from "../../lib/getPosts";
import PostsList from "../../components/PostsList";

export default async function WorksPage() {
  // カテゴリ名やタグで絞り込みたい場合はここで拡張可能
  const posts = await getPosts();
  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Works</h1>
      <PostsList posts={posts} />
    </section>
  );
}
