export type SalonWork = {
  id: number;
  theme: string;
  title: string;
  description: string;
  url: string;
  bgColor: string;
  textColor: string;
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
  },
  {
    id: 2,
    theme: "ナチュラル系",
    title: "Natural",
    description: "温かみのあるアースカラー。ナチュラル・オーガニック系サロンに。",
    url: "https://salon-02-natural.vercel.app",
    bgColor: "#5C6B3D",
    textColor: "#E8EDD8",
  },
  {
    id: 3,
    theme: "メンズ系",
    title: "Men's",
    description: "クールでスタイリッシュなモノトーン。メンズ特化・バーバーに。",
    url: "https://salon-03-mens.vercel.app",
    bgColor: "#2C3E50",
    textColor: "#BDC3C7",
  },
  {
    id: 4,
    theme: "韓国系",
    title: "Korean",
    description: "トレンド感あふれるポップなデザイン。韓国系・若年層向けサロンに。",
    url: "https://salon-04-korean.vercel.app",
    bgColor: "#C97B8E",
    textColor: "#FFF0F3",
  },
];
