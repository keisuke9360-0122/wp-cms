# Salon HP制作セクション 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ポートフォリオ（keisuketsuruta.com）に美容室HP制作の案件獲得セクションを追加する。トップページにSalon Worksカルーセルを置き、/salon 詳細LPページを新設する。

**Architecture:** 静的TypeScriptデータファイル（salonWorks.ts / salonPricing.ts）でコンテンツを管理。トップページ（`"use client"`）にカルーセルセクションを追加、/salon ページはServer Componentとして新規作成。横スクロールはGSAP pinを使わずCSS `overflow-x: auto`で実装（既存Web Worksのpin処理と競合させない）。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, GSAP（トップページ既存アニメーションのみ拡張）

---

## ファイルマップ

| ファイル | 種別 | 内容 |
|----------|------|------|
| `src/app/data/salonWorks.ts` | 新規 | 4テーマのデモサイトデータ |
| `src/app/data/salonPricing.ts` | 新規 | 3料金プランデータ |
| `src/app/page.tsx` | 変更 | Salon Worksセクション追加・マーキーref追加 |
| `src/components/mv.tsx` | 変更 | CTAにSalonボタン追加 |
| `src/app/salon/page.tsx` | 新規 | /salon 詳細LPページ（全7セクション） |

---

## Task 1: データファイル作成

**Files:**
- Create: `src/app/data/salonWorks.ts`
- Create: `src/app/data/salonPricing.ts`

- [ ] **Step 1: salonWorks.ts を作成する**

```typescript
// src/app/data/salonWorks.ts

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
```

- [ ] **Step 2: salonPricing.ts を作成する**

```typescript
// src/app/data/salonPricing.ts

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
```

- [ ] **Step 3: コミット**

```bash
git add src/app/data/salonWorks.ts src/app/data/salonPricing.ts
git commit -m "feat: add salon works and pricing data files"
```

---

## Task 2: トップページ Salon Worksセクション追加

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: import と ref を追加する**

`page.tsx` の先頭 import に追記：
```tsx
import { salonWorks } from "./data/salonWorks";
```

既存の ref 宣言ブロック（`const worksSectionRef = ...` の並び）に追記：
```tsx
const salonTitleRef = useRef<HTMLDivElement>(null);
```

- [ ] **Step 2: マーキーアニメーションの refs 配列に salonTitleRef を追加する**

既存コード（`page.tsx:267-284` 付近）の `const refs = [...]` を以下に変更：
```tsx
const refs = [
  aboutTitleRef.current,
  worksTitleRef.current,
  contactTitleRef.current,
  hairTitleRef.current,
  salonTitleRef.current,
];
```

- [ ] **Step 3: Salon WorksセクションのJSXを追加する**

`{/* ── Web Works ── */}` セクションの終了タグ `</section>` の直後、`{/* ── Hair Works ── */}` の直前に挿入：

```tsx
{/* ── Salon Works ── */}
<section id="salon-works" className="relative w-full py-16 md:py-32 overflow-hidden">
  {/* 背景装飾円 */}
  <div
    className="absolute -left-32 bottom-10 w-[500px] h-[500px] rounded-full bg-amber-100 blur-2xl pointer-events-none"
    style={{ opacity: 0.55 }}
  />

  {/* マーキータイトル */}
  <div className="overflow-hidden mb-16 pointer-events-none">
    <h2
      ref={salonTitleRef}
      className="inline-block whitespace-nowrap
      text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight
      text-transparent bg-clip-text
      bg-gradient-to-r from-amber-400 via-stone-500 to-amber-700
      opacity-20"
    >
      Salon Works&nbsp;&nbsp;Salon Works&nbsp;&nbsp;Salon Works&nbsp;&nbsp;Salon Works&nbsp;&nbsp;Salon Works&nbsp;&nbsp;Salon Works&nbsp;&nbsp;
    </h2>
  </div>

  {/* 装飾ライン */}
  <div className="h-[2px] w-full mb-10 bg-gradient-to-r from-amber-400 via-stone-300 to-transparent" />

  {/* セクション紹介テキスト */}
  <div className="px-6 mb-10 max-w-2xl">
    <p className="text-xs tracking-[0.3em] text-[#9C8468] uppercase mb-3">Salon HP 制作</p>
    <h3 className="font-display font-light text-2xl md:text-3xl text-[#1A1816] mb-4 leading-relaxed">
      現役美容師だからわかる、<br />サロンのためのHP制作
    </h3>
    <p className="text-stone-500 text-sm leading-loose">
      4つのテーマをベースにカスタマイズして納品します。<br />
      業界を内側から理解しているから、本当に必要なものがわかります。
    </p>
  </div>

  {/* 横スクロールカルーセル */}
  <div className="flex gap-5 px-6 overflow-x-auto pb-4 snap-x snap-mandatory">
    <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
    {salonWorks.map((work) => (
      <a
        key={work.id}
        href={work.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-none w-[180px] md:w-[240px] rounded-2xl overflow-hidden relative group shadow-md snap-start"
        style={{ backgroundColor: work.bgColor, aspectRatio: "9/16" }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-1"
            style={{ color: work.textColor, opacity: 0.6 }}
          >
            {work.theme}
          </p>
          <h4 className="font-display font-light text-xl mb-2" style={{ color: work.textColor }}>
            {work.title}
          </h4>
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: work.textColor, opacity: 0.7 }}>
            {work.description}
          </p>
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="text-[10px] tracking-widest uppercase border rounded-full px-3 py-1"
            style={{ color: work.textColor, borderColor: work.textColor, opacity: 0.7 }}
          >
            Open ↗
          </span>
        </div>
      </a>
    ))}
  </div>

  {/* 詳しく見るボタン */}
  <div className="px-6 mt-10">
    <Link
      href="/salon"
      className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#9C8468] border border-[#C8BAA8] rounded-full px-8 py-3 hover:border-[#9C8468] hover:bg-[#9C8468] hover:text-white transition-all duration-300"
    >
      詳しく見る →
    </Link>
  </div>
</section>
```

- [ ] **Step 4: 開発サーバーで表示確認する**

```bash
cd "/Users/tsurutakeisuke/Local Sites/wp-cms/portfolio-next"
npm run dev
```

ブラウザで `http://localhost:3000` を開き確認：
- Web Worksセクションの下にSalon Worksセクションが表示される
- マーキータイトルが左スクロールしている
- 縦長カード4枚が横スクロールできる
- 各カードのリンクが正しいVercel URLへ飛ぶ
- 「詳しく見る →」が `/salon` へ遷移する（404でOK、次のタスクで作る）

- [ ] **Step 5: コミット**

```bash
git add src/app/page.tsx
git commit -m "feat: add salon works carousel section to top page"
```

---

## Task 3: MV CTAにSalonボタン追加

**Files:**
- Modify: `src/components/mv.tsx`

- [ ] **Step 1: CTAボタン群に Salon ボタンを追加する**

`mv.tsx:81-94` の `<motion.div>` 内、既存の2ボタンの間に挿入：

```tsx
{/* 変更前 */}
<a
  href="#works"
  className="px-8 py-3 bg-[#1A1816] text-[#FDFCF8] text-xs tracking-widest uppercase font-medium rounded-full hover:bg-[#3A3630] transition-colors"
>
  Works
</a>
<a
  href="#contact"
  className="px-8 py-3 border border-[#C8BAA8] text-[#7A7068] text-xs tracking-widest uppercase font-medium rounded-full hover:border-[#9C8468] hover:text-[#9C8468] transition-colors"
>
  Contact
</a>
```

```tsx
{/* 変更後 */}
<a
  href="#works"
  className="px-8 py-3 bg-[#1A1816] text-[#FDFCF8] text-xs tracking-widest uppercase font-medium rounded-full hover:bg-[#3A3630] transition-colors"
>
  Works
</a>
<a
  href="#salon-works"
  className="px-8 py-3 border border-[#C8BAA8] text-[#7A7068] text-xs tracking-widest uppercase font-medium rounded-full hover:border-[#9C8468] hover:text-[#9C8468] transition-colors"
>
  Salon
</a>
<a
  href="#contact"
  className="px-8 py-3 border border-[#C8BAA8] text-[#7A7068] text-xs tracking-widest uppercase font-medium rounded-full hover:border-[#9C8468] hover:text-[#9C8468] transition-colors"
>
  Contact
</a>
```

- [ ] **Step 2: 開発サーバーで確認する**

`http://localhost:3000` のMVセクションで「Works」「Salon」「Contact」の3ボタンが横並びに表示されることを確認。「Salon」クリックでSalon Worksセクションへスクロールすることを確認。

- [ ] **Step 3: コミット**

```bash
git add src/components/mv.tsx
git commit -m "feat: add salon CTA button to main visual"
```

---

## Task 4: /salon ページ作成（前半：Hero + Story + デモサイト）

**Files:**
- Create: `src/app/salon/page.tsx`

- [ ] **Step 1: ファイルを作成し Hero + Story セクションを実装する**

```tsx
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
```

- [ ] **Step 2: 開発サーバーで確認する**

`http://localhost:3000/salon` にアクセスし確認：
- Heroセクション：ダーク背景に白いキャッチコピーが表示される
- Storyセクション：クリーム背景にテキストが表示される
- デモサイトセクション：4枚のカードが2カラムグリッドで表示される
- 各カードの「デモを見る ↗」が正しいVercel URLへ飛ぶ

- [ ] **Step 3: コミット**

```bash
git add src/app/salon/page.tsx
git commit -m "feat: add /salon page hero, story, demo sections"
```

---

## Task 5: /salon ページ（後半：強み + 料金プラン + FAQ + CTA）

**Files:**
- Modify: `src/app/salon/page.tsx`

- [ ] **Step 1: 強み・料金プラン・FAQ・CTAセクションを追加する**

`page.tsx` の `{/* ③ デモサイト */}` の `</section>` 直後、`</main>` の直前に追記：

```tsx
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
```

- [ ] **Step 2: 開発サーバーで全セクション確認する**

`http://localhost:3000/salon` で確認：
- 強みセクション：3カラムで表示される
- 料金プランセクション：スタンダードカードが黒背景で強調表示される
- FAQセクション：`<details>` クリックで展開・収納できる
- CTAセクション：「お問い合わせはこちら」が `/contact` へ遷移する
- 「ポートフォリオに戻る」が `/` へ遷移する

- [ ] **Step 3: レスポンシブ確認（SP幅：375px）**

ブラウザのデベロッパーツールでSP幅に切り替えて確認：
- Hero：文字が適切なサイズで表示される（clamp使用済み）
- デモサイト：1カラムで縦に並ぶ
- 料金プラン：1カラムで縦に並ぶ
- 強みセクション：1カラムで縦に並ぶ

- [ ] **Step 4: コミット**

```bash
git add src/app/salon/page.tsx
git commit -m "feat: complete /salon LP page with all sections"
```

---

## Task 6: .gitignore と最終確認

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: .superpowers/ を .gitignore に追加する**

`.gitignore` を開き末尾に追記（ビジュアルコンパニオンの作業ファイルをコミットしないため）：
```
# Superpowers brainstorm files
.superpowers/
```

- [ ] **Step 2: 本番ビルドが通ることを確認する**

```bash
cd "/Users/tsurutakeisuke/Local Sites/wp-cms/portfolio-next"
npm run build
```

Expected: ビルドエラーなし。`/salon` ルートが静的ページとして生成される。

- [ ] **Step 3: 最終コミットとVercelデプロイ**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm directory"
git push origin main
```

Vercelの自動デプロイが走ることを確認。`https://keisuketsuruta.com/salon` にアクセスして本番で表示されることを確認。
