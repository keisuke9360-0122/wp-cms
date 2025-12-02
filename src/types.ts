export interface ProjectLinkField {
  projectLink?: {
    url?: string;
  };
}

export type Post = {
  id: string;
  slug: string;
  title: string;
  content?: string;
  projectLink?: ProjectLinkField | null;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  } | null; // null を許容
};
