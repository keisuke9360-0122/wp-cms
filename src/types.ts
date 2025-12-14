// featuredImage 用の型
export type FeaturedImage = {
  node: {
    sourceUrl: string;
    altText?: string | null;
  };
};

// projectLink の WordPress の ACF フィールド型
export type ProjectLinkField = {
  projectLink?: {
    url?: string | null;
  };
};

// 出力用の型（url は必須にするならこれ）
export type ProjectLink = {
  projectLink?: {
    url: string;
  } | null;
};

// 投稿データの型
export type Post = {
  id: string;
  slug: string;
  title: string;
  content?: string | null;
  excerpt: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
  projectLink?: ProjectLink | null;
};
