import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/salon/SiteChrome";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "送信が完了しました｜Hair & Web Studio K",
  robots: { index: false, follow: false },
};

export default function ContactThanksPage() {
  return (
    <div className="salon-site flex min-h-screen flex-col bg-white text-ink">
      <SiteHeader />
      <main className="flex flex-1 items-center px-5 pb-[100px] pt-[150px] md:px-10">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-10">
          <h1 className="font-en text-[clamp(56px,9vw,128px)] font-semibold leading-[0.88] tracking-[-0.06em]">
            Thank you.
          </h1>
          <div className="flex flex-col gap-8 border-t border-ink pt-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">送信が完了しました。</p>
              <p className="text-[13px] leading-[1.9] text-sub">
                お問い合わせありがとうございます。内容を確認し、24時間以内にお返事します。
                <br />
                返信が届かない場合は、迷惑メールのフォルダもご確認ください。
              </p>
            </div>
            <Link href="/" className="link-arrow self-start md:self-auto">
              トップへ戻る <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
