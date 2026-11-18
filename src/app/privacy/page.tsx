import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/salon/SiteChrome";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜Hair & Web Studio K",
  description: "Hair & Web Studio K の個人情報の取り扱いについて。",
};

// 文章を変えるときは、この配列を直してください。
// 最終更新日（ESTABLISHED / UPDATED）も一緒に書き換えます。
const ESTABLISHED = "2026年11月18日";
const UPDATED = "2026年11月18日";

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: "取得する情報",
    body: (
      <>
        <p>当サイトでは、次の情報を取得します。</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>お問い合わせフォームに入力された、お名前・サロン名・メールアドレス・ホームページのURL・ご相談内容</li>
          <li>アクセス解析ツールによって取得される、閲覧したページや利用環境などの情報（個人を特定するものではありません）</li>
        </ul>
      </>
    ),
  },
  {
    title: "利用目的",
    body: (
      <>
        <p>取得した情報は、次の目的に限って利用します。</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>お問い合わせへの回答や、ご連絡のため</li>
          <li>お見積もりや、ホームページ制作のご提案のため</li>
          <li>当サイトの内容やサービスを改善するため</li>
        </ul>
      </>
    ),
  },
  {
    title: "第三者への提供",
    body: (
      <p>
        法令にもとづく場合を除き、ご本人の同意なく、個人情報を第三者に提供することはありません。
      </p>
    ),
  },
  {
    title: "個人情報の管理",
    body: (
      <p>
        取得した個人情報は、漏えい・紛失・改ざんなどが起きないよう、適切に管理します。目的を果たして不要になった情報は、すみやかに削除します。
      </p>
    ),
  },
  {
    title: "アクセス解析ツールについて",
    body: (
      <>
        <p>
          当サイトでは、Googleが提供するアクセス解析ツール「Googleアナリティクス」を利用しています。Googleアナリティクスは、Cookieを使って利用状況のデータを集めます。このデータは匿名で集められ、個人を特定するものではありません。
        </p>
        <p>
          Cookieを無効にすると、データの収集を拒否できます。お使いのブラウザの設定をご確認ください。データの扱いについては
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Googleのポリシーと規約
          </a>
          をご覧ください。
        </p>
      </>
    ),
  },
  {
    title: "開示・訂正・削除のご請求",
    body: (
      <p>
        ご本人から、個人情報の開示・訂正・利用停止・削除のご請求があった場合は、ご本人であることを確認したうえで、すみやかに対応します。
        <Link href="/contact" className="underline underline-offset-4">
          お問い合わせフォーム
        </Link>
        からご連絡ください。
      </p>
    ),
  },
  {
    title: "このポリシーの変更",
    body: (
      <p>
        法令の変更などにあわせて、このポリシーを変更することがあります。変更後の内容は、このページに掲載した時点から有効になります。
      </p>
    ),
  },
  {
    title: "お問い合わせ窓口",
    body: (
      <p>
        Hair &amp; Web Studio K（運営者：鶴田 啓介）
        <br />
        個人情報の取り扱いについてのご質問は、
        <Link href="/contact" className="underline underline-offset-4">
          お問い合わせフォーム
        </Link>
        からお送りください。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div className="salon-site min-h-screen bg-white text-ink">
      <SiteHeader />
      <main className="px-5 pb-[120px] pt-[150px] md:px-10 lg:pt-[180px]">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <div className="flex flex-col gap-3">
            <p className="font-en text-lg font-medium tracking-[-0.01em]">Privacy Policy</p>
            <p className="text-[13px] leading-[1.9] text-sub">
              制定日：{ESTABLISHED}
              <br />
              最終更新日：{UPDATED}
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-14">
            <div className="flex flex-col gap-6">
              <h1 className="text-[clamp(28px,3vw,40px)] font-bold leading-[1.4]">プライバシーポリシー</h1>
              <p className="text-[15px] leading-[2.1] text-sub">
                Hair &amp; Web Studio K（以下「当サイト」）は、お預かりする個人情報を大切に扱い、次の方針にもとづいて取り扱います。
              </p>
            </div>
            <ol className="flex flex-col">
              {SECTIONS.map((section, i) => (
                <li
                  key={section.title}
                  className="grid gap-4 border-t border-line py-10 md:grid-cols-[64px_1fr]"
                >
                  <span className="font-en text-[15px] font-medium text-sub">
                    {String(i + 1).padStart(2, "0")} /
                  </span>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold">{section.title}</h2>
                    <div className="flex flex-col gap-3 text-[15px] leading-[2.1] text-[#3A3A38]">
                      {section.body}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
