export type PricingPlan = {
  id: string;
  name: string;
  subtitle: string;
  features: string[];
  recommended?: boolean;
};

export const salonPricing: PricingPlan[] = [
  {
    id: "basic",
    name: "ベーシック",
    subtitle: "まずはシンプルに始めたい方へ",
    features: [
      "デモサイトベースのカスタマイズ",
      "スマートフォン完全対応",
      "お問い合わせフォーム設置",
      "Google Analytics設置",
      "SSL対応",
    ],
  },
  {
    id: "standard",
    name: "スタンダード",
    subtitle: "必要な機能を揃えたい方へ",
    recommended: true,
    features: [
      "ベーシックの全機能",
      "予約ボタン設置（HPBなど）",
      "Google Map埋め込み",
      "メニューページ制作",
      "スタッフ紹介ページ制作",
      "SNSリンク設置",
    ],
  },
  {
    id: "premium",
    name: "プレミアム",
    subtitle: "顧客管理まで一括でお任せ",
    features: [
      "スタンダードの全機能",
      "顧客カルテ管理アプリ（salon-karte）",
      "音声入力で施術記録",
      "顧客情報・写真管理",
      "PWAアプリ対応",
    ],
  },
];
