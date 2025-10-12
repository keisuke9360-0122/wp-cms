import { getPosts } from "../lib/getPosts";
import PostsList from "../components/PostsList";
import MainVisual from "../components/mv";

export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="bg-w">
      <MainVisual />
      <div className="container max-w-screen-lg mx-auto px-2">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <PostsList posts={posts} />
      </div>
    </main>
  );
}
