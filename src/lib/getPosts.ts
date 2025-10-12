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
      }
    }
  }
`;

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
};

type PostsResponse = {
  posts: {
    nodes: Post[];
  };
};

export async function getPosts() {
  const data = await client.request<PostsResponse>(query);
  // const posts = data.posts.nodes;
  return data.posts?.nodes ?? [];
}
