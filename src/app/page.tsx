import { getPosts } from "../lib/getPosts";
import PostsList from "../components/PostsList";
export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-10 bg-w">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <PostsList posts={posts} />
    </main>
  );
}
