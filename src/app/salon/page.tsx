// src/app/salon/page.tsx
import Link from "next/link";
import { salonWorks } from "@/app/data/salonWorks";
import { salonPricing } from "@/app/data/salonPricing";

export const metadata = {
  title: "サロンHP制作 | KEISUKE TSURUTA",
  description:
    "現役美容師 × フロントエンドエンジニアが作る、美容室専門のホームページ制作サービス。4つのデザインテーマから選べます。",
};

export default function SalonPage() {
  return (
    <main className="bg-[#FDFCF8] text-[#1A1816]">

      {/* ① Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#1A1816]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1816] via-[#2A2520] to-[#1A1816]" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-10 bg-[#9C8468]" />
            <span className="text-[#9C8468] text-[11px] tracking-[0.45em] uppercase font-medium">
              Salon HP 制作
            </span>
            <div className="h-px w-10 bg-[#9C8468]" />
          </div>
          <h1
            className="font-display font-light text-[#FDFCF8] leading-tight mb-8"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            現役美容師だからわかる、<br />
            サロンのための<br />
            HP制作
          </h1>
          <div className="w-16 h-px bg-[#C8BAA8] mx-auto mb-8" />
          <p className="text-[#9C8468] text-sm leading-loose mb-10">
            業界を内側から理解しているから、<br />
            本当に必要なものがわかります。
          </p>
          <a
            href="#demos"
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#9C8468] text-[#9C8468] text-xs tracking-widest uppercase rounded-full hover:bg-[#9C8468] hover:text-[#1A1816] transition-all duration-300"
          >
            デモサイトを見る ↓
          </a>
        </div>
      </section>

      {/* ② Story */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-4">Why a hairdresser?</p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-[#1A1816] mb-10 leading-relaxed">
          なぜ美容師が<br />HPを作るのか
        </h2>
        <div className="h-[2px] w-full mb-10 bg-gradient-to-r from-amber-400 via-stone-300 to-transparent" />
        <div className="space-y-6 text-stone-600 text-sm leading-loose">
          <p>
            美容師として10年以上、現場でお客様と向き合ってきました。
            予約が入らない悩み、SNSだけでは伝えきれない雰囲気、
            他のサロンとの差別化——そういった課題を、自分自身が体験してきました。
          </p>
          <p>
            30歳からエンジニアに転身し、今はフロントエンド開発の現場で働いています。
            美容業界の課題とWeb制作の技術、両方を持つ人間は多くありません。
          </p>
          <p>
            「このサロンの雰囲気、どう伝えればいい？」——その問いに、
            美容師目線で答えられるHP制作を提供しています。
          </p>
        </div>
      </section>

      {/* ③ デモサイト */}
      <section id="demos" className="py-24 px-6 bg-[#FAF7F1]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-4">Demo Sites</p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-[#1A1816] mb-4 leading-relaxed">
            4つのデザインテーマ
          </h2>
          <p className="text-stone-500 text-sm mb-16 leading-loose">
            サロンのコンセプトに合わせてテーマを選び、カラー・テキスト・写真をカスタマイズして納品します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {salonWorks.map((work) => (
              <div
                key={work.id}
                className="rounded-2xl overflow-hidden shadow-md"
                style={{ backgroundColor: work.bgColor }}
              >
                <div className="aspect-[16/9] flex items-center justify-center relative">
                  <div className="text-center px-8">
                    <p
                      className="text-[10px] tracking-[0.4em] uppercase mb-3"
                      style={{ color: work.textColor, opacity: 0.5 }}
                    >
                      {work.theme}
                    </p>
                    <p
                      className="font-display font-light text-4xl"
                      style={{ color: work.textColor }}
                    >
                      {work.title}
                    </p>
                  </div>
                </div>
                <div className="p-6" style={{ backgroundColor: work.bgColor }}>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: work.textColor, opacity: 0.8 }}>
                    {work.description}
                  </p>
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border rounded-full px-5 py-2 transition-opacity hover:opacity-70"
                    style={{ color: work.textColor, borderColor: work.textColor, opacity: 0.8 }}
                  >
                    デモを見る ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
