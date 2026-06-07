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

      {/* ④ 3つの強み */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-4">Why choose us</p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-[#1A1816] mb-16 leading-relaxed">
          3つの強み
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="w-10 h-px bg-amber-400 mb-6" />
            <h3 className="text-base font-medium mb-3">美容師目線のヒアリング</h3>
            <p className="text-stone-500 text-sm leading-loose">
              「どんな雰囲気のサロンか」「どんなお客様に来てほしいか」を美容師として理解した上でデザインを提案します。
            </p>
          </div>
          <div>
            <div className="w-10 h-px bg-amber-400 mb-6" />
            <h3 className="text-base font-medium mb-3">フロントエンドエンジニアの技術力</h3>
            <p className="text-stone-500 text-sm leading-loose">
              スピード・スマホ対応・SEO基盤——Web制作会社と同等の技術品質を、より柔軟に提供します。
            </p>
          </div>
          <div>
            <div className="w-10 h-px bg-amber-400 mb-6" />
            <h3 className="text-base font-medium mb-3">顧客カルテアプリとのセット提案</h3>
            <p className="text-stone-500 text-sm leading-loose">
              HP制作と合わせて顧客カルテ管理PWAアプリ（salon-karte）もご提供。施術記録を音声入力で残せます。
            </p>
          </div>
        </div>
      </section>

      {/* ⑤ 料金プラン */}
      <section className="py-24 px-6 bg-[#FAF7F1]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-4">Pricing</p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-[#1A1816] mb-4 leading-relaxed">
            料金プラン
          </h2>
          <p className="text-stone-500 text-sm mb-16 leading-loose">
            詳細な金額はご要望・ボリュームに応じてご相談ください。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salonPricing.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 border transition-shadow ${
                  plan.recommended
                    ? "border-[#9C8468] bg-[#1A1816] text-[#FDFCF8] shadow-lg"
                    : "border-stone-200 bg-white"
                }`}
              >
                {plan.recommended && (
                  <p className="text-[10px] tracking-[0.3em] text-[#9C8468] uppercase mb-4">
                    Recommended
                  </p>
                )}
                <h3 className={`text-xl font-medium mb-2 ${plan.recommended ? "text-[#FDFCF8]" : "text-[#1A1816]"}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-6 leading-relaxed ${plan.recommended ? "text-[#9C8468]" : "text-stone-500"}`}>
                  {plan.subtitle}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${plan.recommended ? "text-[#C8BAA8]" : "text-stone-600"}`}
                    >
                      <span className="text-[#9C8468] mt-0.5 flex-shrink-0">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-stone-400 text-xs mt-10 tracking-wide">
            ※ 料金はお気軽にご相談ください。まずはお話を聞かせていただきます。
          </p>
        </div>
      </section>

      {/* ⑥ FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-4">FAQ</p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-[#1A1816] mb-16 leading-relaxed">
          よくある質問
        </h2>
        <div className="space-y-0 divide-y divide-stone-200">
          {[
            {
              q: "納期はどのくらいですか？",
              a: "ベーシックプランで2〜4週間が目安です。ご要望のボリュームによって変わりますのでご相談ください。",
            },
            {
              q: "WordPressで作ってもらえますか？",
              a: "対応可能です。更新作業をご自身でされたい場合はWordPressをおすすめします。静的サイトとどちらが良いかもご相談の上で決めましょう。",
            },
            {
              q: "制作後のサポートはありますか？",
              a: "納品後1ヶ月間は無償で修正対応します。その後は内容によってご相談ください。",
            },
            {
              q: "美容室以外でも対応できますか？",
              a: "ネイルサロン・まつエクサロン・エステサロンなど美容系であれば対応可能です。まずはお気軽にご相談ください。",
            },
            {
              q: "写真素材は用意が必要ですか？",
              a: "可能であればご提供いただけると最も効果的です。ご用意が難しい場合はフリー素材を使用して対応します。",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group py-6 cursor-pointer">
              <summary className="flex items-start justify-between gap-4 text-sm font-medium text-[#1A1816] list-none">
                <span>{q}</span>
                <span className="text-[#9C8468] flex-shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200">
                  ✦
                </span>
              </summary>
              <p className="mt-4 text-stone-500 text-sm leading-loose">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ⑦ CTA */}
      <section className="py-24 px-6 text-center bg-[#1A1816]">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-[#9C8468]" />
            <span className="text-[#9C8468] text-[11px] tracking-[0.45em] uppercase">Contact</span>
            <div className="h-px w-10 bg-[#9C8468]" />
          </div>
          <h2 className="font-display font-light text-[#FDFCF8] text-3xl md:text-4xl mb-6 leading-relaxed">
            まずはお気軽に<br />ご相談ください
          </h2>
          <p className="text-[#9C8468] text-sm leading-loose mb-10">
            「こんなサイトにしたい」というイメージだけでも大丈夫です。<br />
            一緒に考えましょう。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#9C8468] text-[#FDFCF8] text-xs tracking-widest uppercase rounded-full hover:bg-[#B89878] transition-colors duration-300"
          >
            お問い合わせはこちら →
          </Link>
          <div className="mt-6">
            <Link
              href="/"
              className="text-xs text-stone-500 tracking-wider hover:text-[#9C8468] transition-colors"
            >
              ← ポートフォリオに戻る
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
