import type { Metadata } from "next";

// 転職向けの旧トップページ。メニューには出さず、検索にも載せない。
// 応募書類などで URL を伝えたときだけ見せるためのページ。
export const metadata: Metadata = {
  title: "KEISUKE TSURUTA PORTFOLIO",
  description:
    "美容師として磨いた審美眼と、フロントエンドエンジニアとしての技術を掛け合わせてWebを制作しています。",
  robots: { index: false, follow: false },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="career-bg">{children}</div>;
}
