export type Post = {
  id: string;
  slug: string;
  title: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  } | null; // null を許容
};
