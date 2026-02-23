import { client } from "@/lib/graphql-client";

const query = `
  {
    posts {
      nodes {
        id
        title
        slug
        excerpt
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
  }
`;

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  projectUrl: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
};

type PostsResponse = {
  posts: {
    nodes: Post[];
  };
};

function toHttps(url?: string | null): string | undefined {
  return url?.replace(/^http:\/\//, "https://");
}

export async function getPosts() {
  const data = await client.request<PostsResponse>(query);
  const nodes = data.posts?.nodes ?? [];
  return nodes.map((post) => ({
    ...post,
    featuredImage: post.featuredImage?.node
      ? { node: { ...post.featuredImage.node, sourceUrl: toHttps(post.featuredImage.node.sourceUrl) ?? post.featuredImage.node.sourceUrl } }
      : post.featuredImage,
  }));
}
