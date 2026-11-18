import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/salon/SiteChrome";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ｜Hair & Web Studio K",
  description:
    "サロンのホームページ制作・LP制作・WordPressの修正のご相談はこちらから。ご相談は無料です。",
};

export default function ContactPage() {
  return (
    <div className="salon-site min-h-screen bg-white text-ink">
      <SiteHeader />
      <main className="px-5 pb-[120px] pt-[150px] md:px-10 lg:pt-[180px]">
        <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="font-en text-lg font-medium tracking-[-0.01em]">Contact</p>
            <div className="flex flex-col gap-3 text-[13px] leading-[1.9] text-sub">
              <p>ご相談は無料です。</p>
              <p>24時間以内にお返事します。</p>
              <p>
                「何から始めればいいかわからない」
                <br />
                という段階でも大丈夫です。
              </p>
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-14">
            <h1 className="font-en text-[clamp(56px,9vw,128px)] font-semibold leading-[0.88] tracking-[-0.06em]">
              Let’s talk.
            </h1>
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
