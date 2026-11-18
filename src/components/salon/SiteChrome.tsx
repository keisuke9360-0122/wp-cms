// サロン向けの下層ページ（お問い合わせ・プライバシーポリシーなど）で使う
// ヘッダーとフッター。トップページはスクロールの動きがあるので page.tsx 側に別にある。

import Link from "next/link";

const NAV = [
  { href: "/#works", label: "Works" },
  { href: "/#service", label: "Service" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-en text-[22px] font-semibold tracking-[-0.03em]">Studio K</span>
          <span className="font-en text-sm tracking-[-0.01em] opacity-70">— Hair &amp; Web</span>
        </Link>
        <nav
          aria-label="メインメニュー"
          className="hidden items-center gap-9 font-en text-[13px] font-medium uppercase tracking-[0.04em] md:flex"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="link-line">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          className="font-en text-[13px] font-medium uppercase tracking-[0.04em] md:hidden"
        >
          Top
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 pb-11 pt-7 font-en text-[13px] text-sub md:px-10">
      <span>Hair &amp; Web Studio K</span>
      <div className="flex flex-wrap items-center gap-6">
        <Link href="/privacy" className="link-line">
          プライバシーポリシー
        </Link>
        <span>© 2026 Keisuke Tsuruta</span>
      </div>
    </footer>
  );
}
