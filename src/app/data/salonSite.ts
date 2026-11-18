// サロンオーナー向けトップページ（src/app/page.tsx）で使う中身。
// 文章・料金・作品を変えるときは、このファイルだけ直せば反映されます。

export type HeroPhoto = {
  src: string;
  alt: string;
  // PC表示での傾き（度）とずれ（px）
  rotate: number;
  x: number;
  y: number;
};

// 下の行ほど手前に重なります
export const heroPhotos: HeroPhoto[] = [
  { src: "/salon/hero-4.jpg", alt: "", rotate: -11, x: -36, y: 14 },
  { src: "/salon/hero-2.jpg", alt: "", rotate: 8, x: 30, y: 6 },
  { src: "/salon/hero-3.jpg", alt: "", rotate: -4, x: 0, y: 0 },
  { src: "/salon/works/work-11.jpg", alt: "鶴田が手がけたヘアスタイル作品", rotate: 2, x: 0, y: 0 },
];

export const concepts: string[] = [
  "お客様が見るポイントから、ページの順番を設計",
  "ホットペッパーやLINEの予約ボタンを、押しやすい位置に",
  "公開後も、予約ボタンの反応を数字で確かめる",
];

export const clientWork = {
  name: "8SPA",
  category: "アロマリラクゼーションサロン ／ 福岡市",
  description:
    "福岡市のお家サロン。WordPressのオリジナルテーマで、落ち着いた空気を余白と写真で表現しました。メニュー、セラピストの紹介、Instagramからの予約導線まで設計しています。",
  tags: ["WordPress", "オリジナルテーマ", "Instagram連携", "スマホ対応"],
  url: "https://8spa-salon.com/",
  image: "/salon/sp-8spa.jpg",
};

export type DemoWork = {
  name: string;
  category: string;
  url: string;
  image: string;
};

export const demoWorks: DemoWork[] = [
  {
    name: "LUMIÈRE",
    category: "髪質改善サロン ／ 高価格帯",
    url: "https://salon-01-premium.vercel.app",
    image: "/salon/sp-lumiere.jpg",
  },
  {
    name: "mori hair",
    category: "オーガニックサロン ／ ナチュラル",
    url: "https://salon-02-natural.vercel.app",
    image: "/salon/sp-mori.jpg",
  },
  {
    name: "EDGE BARBER",
    category: "メンズバーバー ／ モノトーン",
    url: "https://salon-03-mens.vercel.app",
    image: "/salon/sp-edge.jpg",
  },
  {
    name: "HANA SALON",
    category: "韓国風トレンドサロン ／ 若年層",
    url: "https://salon-04-korean.vercel.app",
    image: "/salon/sp-hana.jpg",
  },
  {
    name: "Aube",
    category: "プライベートエステ ／ 個室",
    url: "https://salon-05-esthe.vercel.app",
    image: "/salon/sp-aube.jpg",
  },
];

export type Service = {
  label: string;
  // 見出しは2つに分けて、読点の位置でだけ改行させる
  headline: [string, string];
  description: string;
  tags: string[];
  price: string;
};

export const services: Service[] = [
  {
    label: "A",
    headline: ["予約まで迷わない、", "サロンのホームページを。"],
    description: "ホームページ制作。メニュー・スタッフ・アクセス・予約ボタンまで。",
    tags: ["スマホ対応", "メニュー・スタッフ紹介", "Googleマップ", "予約ボタン設置", "WordPress"],
    price: "20,000円〜",
  },
  {
    label: "B",
    headline: ["新メニューやキャンペーンを、", "1ページで伝える。"],
    description: "LP（1ページ）制作。新しいメニューや初回限定の集客に。",
    tags: ["1ページ完結", "初回限定の訴求", "SNSからの導線"],
    // フリーランスの相場（1万〜30万円）の中で、HP制作（3ページ 20,000円〜）より少し下に設定
    price: "15,000円〜",
  },
  {
    label: "C",
    headline: ["表示崩れや差し替えを、", "すぐに直す。"],
    description: "WordPressの修正。いまのサイトを活かしたまま整えます。",
    tags: ["表示崩れ", "文字・写真の差し替え", "予約ボタン設置"],
    price: "3,000円〜",
  },
];

export const profile = {
  nameEn: ["Keisuke", "Tsuruta"],
  nameJa: "鶴田 啓介 ／ 美容師・Webデザイナー",
  bio: "都内のヘアサロンでスタイリストとして経験を積み、地元・福岡へ。サロンに立ちながら独学でWebを学び、いまはWeb制作の仕事をしています。カットやカラーで培った「バランスと質感」を見る目で、サロンのホームページをつくっています。",
  tags: ["美容師免許", "HTML / CSS / JS", "WordPress", "Next.js"],
  image: "/salon/profile.jpg",
};

// 美容師時代の作品（Hair Works）。2段に分けて、スクロールに合わせて左右に流す
export type HairPhoto = { src: string; alt: string };

export const hairPhotos: HairPhoto[] = [
  { src: "/salon/works/work-1.jpg", alt: "パーマのショートスタイル" },
  { src: "/salon/works/work-12.jpg", alt: "ウェーブのロングヘア" },
  { src: "/salon/works/work-3.jpg", alt: "ボブ" },
  { src: "/salon/hero-1.jpg", alt: "パーマのショートスタイル" },
  { src: "/salon/works/work-2.jpg", alt: "ミディアムヘア" },
  { src: "/salon/works/work-10.jpg", alt: "前髪ありのボブ" },
  { src: "/salon/works/work-6.jpg", alt: "パーマのショートスタイル（モノクロ）" },
  { src: "/salon/works/work-13.jpg", alt: "ウェーブのミディアムヘア" },
  { src: "/salon/works/work-7.jpg", alt: "ボブ" },
  { src: "/salon/works/work-9.jpg", alt: "ダークトーンのロングヘア" },
  { src: "/salon/works/work-5.jpg", alt: "ミディアムヘア" },
  { src: "/salon/works/work-4.jpg", alt: "ショートヘア" },
];
