import { client } from "@/lib/graphql-client";

const query = `
  {
    posts {
      nodes {
        id
        title
        slug
        excerpt
      }
    }
  }
`;

export default async function Home() {
  const data = await client.request(query);
  const posts = data.posts.nodes;

  return (
    <main className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <ul className="p-20">
        {posts.map((post: any) => (
          <li key={post.id} className="mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
