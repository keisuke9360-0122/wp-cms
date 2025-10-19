import { client } from "@/lib/graphql-client";

const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projectLink {
          projectLink {
            url
          }
        }
      }
    }
  `;

type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  projectLink?: {
    projectLink?: {
      url?: string;
    };
  };
};

type PostResponse = {
  post: Post | null;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const variables = { slug };
  const data = await client.request<{ post: Post }>(query, variables);
  return data.post;
}
