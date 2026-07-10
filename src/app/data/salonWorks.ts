export type SalonWork = {
  id: number;
  theme: string;
  title: string;
  description: string;
  url: string;
  bgColor: string;
  textColor: string;
  image: string;
};

export const salonWorks: SalonWork[] = [
  {
    id: 1,
    theme: "高級系",
    title: "Premium",
    description: "洗練されたシックなデザイン。高価格帯・都市型サロンに最適です。",
    url: "https://salon-01-premium.vercel.app",
    bgColor: "#1A1816",
    textColor: "#C8BAA8",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    theme: "ナチュラル系",
    title: "Natural",
    description: "温かみのあるアースカラー。ナチュラル・オーガニック系サロンに。",
    url: "https://salon-02-natural.vercel.app",
    bgColor: "#5C6B3D",
    textColor: "#E8EDD8",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    theme: "メンズ系",
    title: "Men's",
    description: "クールでスタイリッシュなモノトーン。メンズ特化・バーバーに。",
    url: "https://salon-03-mens.vercel.app",
    bgColor: "#2C3E50",
    textColor: "#BDC3C7",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    theme: "韓国系",
    title: "Korean",
    description: "トレンド感あふれるポップなデザイン。韓国系・若年層向けサロンに。",
    url: "https://salon-04-korean.vercel.app",
    bgColor: "#C97B8E",
    textColor: "#FFF0F3",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80",
  },
];
