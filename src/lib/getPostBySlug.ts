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
        workDetails {
          pc {
            node {
              sourceUrl
              altText
            }
          }
          mobileThumbnail {
            node {
              sourceUrl
              altText
            }
          }
          usedTech
          period
          role
          overview
          gallery {
            node {
              sourceUrl
              altText
            }
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
  featuredImage?: {
    node?: { sourceUrl?: string; altText?: string };
  } | null;
  projectLink?: {
    projectLink?: {
      url?: string;
    };
  };
  workDetails?: {
    pc?: { node?: { sourceUrl?: string; altText?: string } } | null;
    mobileThumbnail?: { node?: { sourceUrl?: string; altText?: string } } | null;
    usedTech?: string | null;
    period?: string | null;
    role?: string | null;
    overview?: string | null;
    gallery?: { node?: { sourceUrl?: string; altText?: string } } | null;
  } | null;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const variables = { slug };
  const data = await client.request<{ post: Post }>(query, variables);
  return data.post;
}
