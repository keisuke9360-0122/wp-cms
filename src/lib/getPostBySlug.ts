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

function toHttps(url?: string | null): string | undefined {
  return url?.replace(/^http:\/\//, "https://");
}

function normalizePost(post: Post | null): Post | null {
  if (!post) return null;
  const w = post.workDetails;
  return {
    ...post,
    featuredImage: post.featuredImage?.node
      ? { node: { ...post.featuredImage.node, sourceUrl: toHttps(post.featuredImage.node.sourceUrl) } }
      : post.featuredImage,
    workDetails: w
      ? {
          ...w,
          pc: w.pc?.node ? { node: { ...w.pc.node, sourceUrl: toHttps(w.pc.node.sourceUrl) } } : w.pc,
          mobileThumbnail: w.mobileThumbnail?.node
            ? { node: { ...w.mobileThumbnail.node, sourceUrl: toHttps(w.mobileThumbnail.node.sourceUrl) } }
            : w.mobileThumbnail,
          gallery: w.gallery?.node
            ? { node: { ...w.gallery.node, sourceUrl: toHttps(w.gallery.node.sourceUrl) } }
            : w.gallery,
        }
      : w,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const variables = { slug };
  const data = await client.request<{ post: Post }>(query, variables);
  return normalizePost(data.post);
}
