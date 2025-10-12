import { client } from "@/lib/graphql-client";

const query = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      slug
    }
  }
`;

type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
};

type PostResponse = {
  post: Post | null;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await client.request<PostResponse>(query, { slug });
  return data.post;
}
