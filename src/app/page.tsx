"use client";

// サロンオーナー向けトップページ（2026-11 デザイン確定版）
// 文章・作品・料金は src/app/data/salonSite.ts にまとめています。
// 動きは https://bleibtgleich.dev/ を参考にしています：
//   ・読み込み中に「0% → 100%」の数字
//   ・文字は1行ずつ下からせり上がり、ぼかしが取れながら表示
//   ・写真はフェードではなく、下から幕が上がるように切り抜いて表示
//   ・マウスを乗せると文字が1文字ずつ上に入れ替わる

import { useEffect, useRef } from "react";
import type { MouseEvent, RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useLoading } from "@/app/contexts/LoadingContext";
import {
  heroPhotos,
  concepts,
  clientWork,
  demoWorks,
  services,
  profile,
} from "./data/salonSite";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, CustomEase);

// 動きの速さと緩急（bleibtgleich.dev と同じ値）
CustomEase.create("InOut", "0.76,0,0.24,1");
CustomEase.create("Out", "0.25,1,0.5,1");

// ファーストビューの写真を次に切り替えるまでの待ち時間（秒）
const HERO_PHOTO_INTERVAL = 6;

// 写真を切り抜く形（下から上へ幕が上がる）
const CLIP_HIDDEN_BOTTOM = "inset(100% 0% 0% 0%)";
const CLIP_HIDDEN_TOP = "inset(0% 0% 100% 0%)";
const CLIP_VISIBLE = "inset(0% 0% 0% 0%)";

const NAV = [
  { href: "#works", label: "Works" },
  { href: "#service", label: "Service" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// ページ内リンク：なめらかスクロール中は ScrollSmoother で移動する
function scrollToHash(e: MouseEvent<HTMLAnchorElement>, hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, true, "top 76px");
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(false);

    const header = headerRef.current;
    const mm = gsap.matchMedia();

    // ※ ScrollSmoother はほかの ScrollTrigger より先に作る必要があるので、
    //   動きの設定（mm.add）を先に、ヘッダーの設定を後に書いています。
    mm.add("(prefers-reduced-motion: no-preference)", setupMotion);
    mm.add("(prefers-reduced-motion: reduce)", () => {
      // 動きを減らす設定の人には、読み込み画面をすぐに消す
      gsap.set(".preloader", { display: "none" });
    });

    // ヘッダー：下へスクロールで隠れ、上へ戻すと出る。黒背景の ABOUT では文字を白に
    const headerTriggers = [
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (!header) return;
          header.dataset.hidden =
            self.direction === 1 && self.scroll() > 160 ? "true" : "false";
        },
      }),
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 76px",
        end: "bottom 76px",
        onToggle: (self) => {
          if (header) header.dataset.dark = self.isActive ? "true" : "false";
        },
      }),
    ];

    return () => {
      headerTriggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, [setLoading]);

  return <SalonPage headerRef={headerRef} rootRef={rootRef} />;
}

// 動きの設定。「動きを減らす」設定の人には呼ばれない
function setupMotion() {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    smoothTouch: 0,
  });
  smoother.paused(true);

  // 読み込み画面が上がる前に、ファーストビューを隠しておく
  gsap.set(".hero-photo-inner", { clipPath: CLIP_HIDDEN_BOTTOM });
  gsap.set([".hero-title", ".hero-fade"], { autoAlpha: 0 });

  // マウスを乗せると1文字ずつ入れ替わるリンク
  gsap.utils.toArray<HTMLElement>("[data-roll]").forEach((el) => {
    const split = SplitText.create(el, { type: "chars", charsClass: "roll-char" });
    split.chars.forEach((char, i) => {
      (char as HTMLElement).style.transitionDelay = `${i * 0.018}s`;
    });
  });

  // ---- 読み込み画面：0% → 100% ----
  const counter = document.querySelector<HTMLElement>(".preloader-count");
  const progress = { value: 0 };
  let stopHeroLoop: (() => void) | null = null;

  const intro = gsap.timeline();
  intro
    .to(progress, {
      value: 100,
      duration: 2,
      ease: "InOut",
      onUpdate: () => {
        if (counter) counter.textContent = `${Math.round(progress.value)}%`;
      },
    })
    .to(".preloader-bar", { scaleX: 1, duration: 2, ease: "InOut" }, 0)
    .to(".preloader-inner", { yPercent: -110, duration: 0.6, ease: "InOut" }, "+=0.15")
    .to(".preloader", { clipPath: CLIP_HIDDEN_TOP, duration: 1, ease: "InOut" }, "-=0.2")
    .set(".preloader", { display: "none" })
    .add(() => {
      smoother.paused(false);
      stopHeroLoop = playHero();
    }, "-=0.55");

  // ---- 英語の見出し：1行ずつ下からせり上がる ----
  gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    const split = SplitText.create(el, { type: "lines", mask: "lines" });
    gsap.from(split.lines, {
      yPercent: 105,
      duration: 1.2,
      ease: "InOut",
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // ---- 日本語の文章：ぼかしが取れながら表示 ----
  gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      filter: "blur(16px)",
      duration: 1.2,
      ease: "power2.out",
      clearProps: "filter",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  // ---- 区切り線：左から右へ伸びる ----
  gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "InOut",
      scrollTrigger: { trigger: el, start: "top 94%", once: true },
    });
  });

  // ---- 写真・スマホ画面：下から幕が上がるように表示 ----
  gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
    if (el.closest(".demo-grid")) return; // WORKS のデモはまとめて順番に出す
    revealClip(el, { trigger: el, start: "top 85%", once: true });
  });
  gsap.utils.toArray<HTMLElement>(".demo-grid [data-clip]").forEach((el, i) => {
    revealClip(el, { trigger: ".demo-grid", start: "top 80%", once: true }, i * 0.12);
  });

  return () => {
    stopHeroLoop?.();
    smoother.kill();
  };
}

// 写真を切り抜いて表示（中の写真は少し縮みながら）
function revealClip(el: HTMLElement, scrollTrigger: ScrollTrigger.Vars, delay = 0) {
  const round = getComputedStyle(el).borderRadius;
  const shape = (inset: string) =>
    round && round !== "0px" ? inset.replace(")", ` round ${round})`) : inset;
  const img = el.querySelector("img");
  const tl = gsap.timeline({ scrollTrigger, delay });
  tl.fromTo(
    el,
    { clipPath: shape(CLIP_HIDDEN_BOTTOM) },
    { clipPath: shape(CLIP_VISIBLE), duration: 1.2, ease: "InOut" }
  );
  if (img) {
    tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "Out" }, 0);
  }
}

// ファーストビュー：見出しが立ち上がり、写真が1枚ずつゆっくり重なる。
// そのあとは HERO_PHOTO_INTERVAL 秒ごとに、いちばん手前の写真を後ろへ回す。
function playHero(): () => void {
  const title = SplitText.create(".hero-title", { type: "chars", mask: "chars" });
  const cards = gsap.utils.toArray<HTMLElement>(".hero-photo");
  const inners = cards.map((c) => c.querySelector<HTMLElement>(".hero-photo-inner"));

  gsap.set(".hero-title", { autoAlpha: 1 });

  const tl = gsap.timeline();
  tl.from(title.chars, {
    yPercent: 105,
    duration: 1.2,
    ease: "InOut",
    stagger: { amount: 0.35 },
  })
    .fromTo(
      inners,
      { clipPath: CLIP_HIDDEN_BOTTOM },
      {
        clipPath: CLIP_VISIBLE,
        duration: 1.4,
        ease: "InOut",
        stagger: 0.7,
      },
      0.2
    )
    .fromTo(
      cards.map((c) => c.querySelector("img")),
      { scale: 1.3 },
      { scale: 1, duration: 2.2, ease: "Out", stagger: 0.7 },
      0.2
    )
    .fromTo(
      ".hero-fade",
      { autoAlpha: 0, y: 16, filter: "blur(12px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.1,
        clearProps: "filter",
      },
      0.6
    );

  // いちばん手前の写真を、上へ切り抜いて後ろに回し、下から戻す
  let order = [...cards]; // 配列の最後が手前
  let stopped = false;
  let next: gsap.core.Tween | gsap.core.Timeline | null = null;

  const cycle = () => {
    if (stopped) return;
    const front = order[order.length - 1];
    const inner = front.querySelector<HTMLElement>(".hero-photo-inner");
    next = gsap
      .timeline({
        onComplete: () => {
          if (!stopped) next = gsap.delayedCall(HERO_PHOTO_INTERVAL, cycle);
        },
      })
      .to(inner, { clipPath: CLIP_HIDDEN_TOP, duration: 1.2, ease: "InOut" })
      .add(() => {
        order = [front, ...order.slice(0, -1)];
        order.forEach((card, i) => {
          card.style.zIndex = String(i + 1);
        });
      })
      .set(inner, { clipPath: CLIP_HIDDEN_BOTTOM })
      .to(inner, { clipPath: CLIP_VISIBLE, duration: 1.2, ease: "InOut" });
  };

  tl.add(() => {
    next = gsap.delayedCall(HERO_PHOTO_INTERVAL, cycle);
  });

  return () => {
    stopped = true;
    tl.kill();
    next?.kill();
    title.revert();
  };
}

type SalonPageProps = {
  headerRef: RefObject<HTMLElement | null>;
  rootRef: RefObject<HTMLDivElement | null>;
};

function SalonPage({ headerRef, rootRef }: SalonPageProps) {
  return (
    <div ref={rootRef} className="salon-site bg-white text-ink">
      {/* 読み込み画面：0% → 100% */}
      <div className="preloader fixed inset-0 z-[100] bg-white" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-line">
          <div className="preloader-bar h-full bg-ink" style={{ transform: "scaleX(0)", transformOrigin: "left center" }} />
        </div>
        <div className="absolute left-5 top-6 font-en text-sm md:left-10">
          Studio K — Hair &amp; Web
        </div>
        <div className="absolute bottom-4 left-4 overflow-hidden md:bottom-6 md:left-8">
          <p className="preloader-inner preloader-count font-en text-[clamp(96px,16vw,240px)] font-semibold leading-[0.9] tracking-[-0.06em]">
            0%
          </p>
        </div>
      </div>

      {/* ヘッダー（なめらかスクロールの外に置く） */}
      <header
        ref={headerRef}
        data-hidden="false"
        data-dark="false"
        className="site-header fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="/" className="flex items-baseline gap-3 no-underline">
            <span className="font-en text-[22px] font-semibold tracking-[-0.03em]">
              Studio K
            </span>
            <span className="font-en text-sm tracking-[-0.01em] opacity-70">
              — Hair &amp; Web
            </span>
          </Link>
          <nav
            aria-label="メインメニュー"
            className="hidden items-center gap-9 font-en text-[13px] font-medium uppercase tracking-[0.04em] md:flex"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToHash(e, item.href)}
              >
                <span data-roll>{item.label}</span>
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={(e) => scrollToHash(e, "#contact")}
            className="font-en text-[13px] font-medium uppercase tracking-[0.04em] md:hidden"
          >
            <span data-roll>Contact</span>
          </a>
        </div>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* ファーストビュー */}
            <section className="relative mx-auto flex max-w-[1440px] flex-col gap-10 overflow-hidden px-5 pb-12 pt-[100px] md:px-10 lg:block lg:min-h-[880px] lg:pb-0 lg:pt-[76px]">
              <div className="hero-fade z-10 flex max-w-[360px] flex-col gap-3.5 lg:absolute lg:left-10 lg:top-[108px]">
                <p className="font-en text-xl font-medium leading-[1.3] tracking-[-0.02em]">
                  Salon Web Design
                  <br />
                  by a hairdresser.
                </p>
                <p className="text-sm leading-[1.9] text-sub">
                  美容師がつくる、サロンのホームページ。
                  <br />
                  お客様が予約まで迷わない設計で。
                </p>
              </div>

              <div className="relative mx-auto h-[420px] w-[300px] sm:h-[480px] sm:w-[360px] lg:absolute lg:left-1/2 lg:top-[132px] lg:z-[2] lg:h-[520px] lg:w-[400px] lg:-translate-x-1/2">
                {heroPhotos.map((photo, i) => (
                  <div
                    key={photo.src}
                    className="hero-photo absolute inset-0"
                    style={{
                      transform: `rotate(${photo.rotate}deg) translate(${photo.x}px, ${photo.y}px)`,
                      zIndex: i + 1,
                    }}
                    aria-hidden={photo.alt === "" ? true : undefined}
                  >
                    <div className="hero-photo-inner absolute inset-0 overflow-hidden bg-mist">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 400px, 360px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-fade z-10 flex flex-col items-start gap-1.5 font-en text-[13px] text-sub lg:absolute lg:right-10 lg:top-[108px] lg:items-end">
                <span>Fukuoka, JP</span>
                <span>Hairdresser / Web Designer</span>
              </div>

              <h1 className="hero-title z-[1] font-en text-[clamp(72px,15.5vw,236px)] font-semibold leading-[0.82] tracking-[-0.06em] lg:absolute lg:bottom-7 lg:left-8">
                Hair&amp;Web
              </h1>

              <div className="hero-fade z-10 flex flex-col items-start gap-5 lg:absolute lg:bottom-10 lg:right-10 lg:items-end">
                <p className="font-en text-[34px] font-semibold leading-none tracking-[-0.03em]">
                  © 2026
                </p>
                <a
                  href="#contact"
                  onClick={(e) => scrollToHash(e, "#contact")}
                  className="link-arrow"
                >
                  <span data-roll>無料で相談する</span> <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            {/* コンセプト */}
            <section id="concept" className="px-5 pb-[120px] pt-[120px] md:px-10 lg:pb-[150px] lg:pt-[160px]">
              <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
                <p className="font-en text-lg font-medium tracking-[-0.01em]">Concept</p>
                <div className="flex min-w-0 flex-col gap-14">
                  <h2
                    data-split
                    className="font-en text-[clamp(36px,4.4vw,64px)] font-semibold leading-[1.08] tracking-[-0.04em]"
                  >
                    From the chair,
                    <br />
                    to the screen.
                  </h2>
                  <div data-fade className="flex max-w-[760px] flex-col gap-5">
                    <p className="text-[clamp(22px,2.1vw,30px)] font-bold leading-[1.6]">
                      <span className="nowrap-ib">現場を知っているから、</span>
                      <span className="nowrap-ib">見せ方がわかる。</span>
                    </p>
                    <p className="text-[15px] leading-[2.1] text-sub">
                      お客様が予約の前に何を見て、どこで迷うのか。サロンに立ってきた感覚を、デザインと設計に落とし込みます。
                    </p>
                  </div>
                  <ol className="flex flex-col">
                    {concepts.map((text, i) => (
                      <li key={text} className="relative grid grid-cols-[64px_1fr] gap-4 py-[26px]">
                        <span data-line className="absolute inset-x-0 top-0 h-px bg-line" />
                        <span className="font-en text-[15px] font-medium text-sub">
                          {String(i + 1).padStart(2, "0")} /
                        </span>
                        <span data-fade className="text-base font-medium">
                          {text}
                        </span>
                        {i === concepts.length - 1 && (
                          <span data-line className="absolute inset-x-0 bottom-0 h-px bg-line" />
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* 作品 */}
            <section id="works" className="px-5 pb-[120px] pt-10 md:px-10 lg:pb-[160px]">
              <div className="mx-auto flex max-w-[1360px] flex-col gap-[72px]">
                <div className="relative flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pb-6">
                  <h2
                    data-split
                    className="font-en text-[clamp(72px,10vw,152px)] font-semibold leading-[0.85] tracking-[-0.06em]"
                  >
                    Works
                  </h2>
                  <div className="flex flex-col items-start gap-1 pb-2 sm:items-end">
                    <p className="font-en text-[15px] font-medium">1 Client / {demoWorks.length} Demos</p>
                    <p className="text-xs text-sub">DEMO はポートフォリオ用の架空のサロンです</p>
                  </div>
                  <span data-line className="absolute inset-x-0 bottom-0 h-px bg-ink" />
                </div>

                {/* クライアントワーク */}
                <a
                  data-fade
                  href={clientWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card grid items-center gap-12 rounded-[4px] bg-mist p-8 md:p-16 lg:grid-cols-[1.3fr_1fr] lg:gap-16"
                >
                  <div className="flex flex-col gap-[22px]">
                    <p className="font-en text-[13px] font-medium uppercase tracking-[0.04em] text-sub">
                      Client Work
                    </p>
                    <h3 className="font-en text-[64px] font-semibold leading-[0.9] tracking-[-0.05em]">
                      {clientWork.name}
                    </h3>
                    <p className="text-base font-medium">{clientWork.category}</p>
                    <p className="max-w-[520px] text-sm leading-[2.1] text-sub">
                      {clientWork.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {clientWork.tags.map((tag) => (
                        <span key={tag} className="pill bg-white">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="link-arrow mt-2 self-start">
                      <span data-roll>View Site</span> <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <div data-clip className="phone w-[240px] border-[7px] md:w-[260px]">
                      <Image
                        src={clientWork.image}
                        alt={`${clientWork.name}のスマホ表示`}
                        fill
                        sizes="260px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </a>

                {/* デモ（スマホ表示） */}
                <div className="demo-grid grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
                  {demoWorks.map((work, i) => (
                    <a
                      key={work.name}
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-card work-card flex flex-col gap-5"
                    >
                      <div data-clip className="phone w-full border-[6px]">
                        <Image
                          src={work.image}
                          alt={`${work.name}のスマホ表示`}
                          fill
                          sizes="(min-width: 1024px) 260px, (min-width: 768px) 30vw, 45vw"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-en text-[clamp(17px,1.6vw,22px)] font-semibold tracking-[-0.03em]">
                            {work.name}
                          </h3>
                          <span className="font-en text-xs text-sub">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-[13px] text-sub">{work.category}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* サービス */}
            <section id="service" className="relative px-5 py-[120px] md:px-10 lg:py-[150px]">
              <span data-line className="absolute inset-x-0 top-0 h-px bg-line" />
              <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
                <div className="flex flex-col justify-between gap-10">
                  <p className="font-en text-lg font-medium tracking-[-0.01em]">Service</p>
                  <div className="flex flex-col gap-[18px]">
                    <p className="text-[13px] leading-[1.9] text-sub">
                      どれから始めればいいか迷ったら、
                      <br />
                      まずは無料でご相談ください。
                    </p>
                    <a
                      href="#contact"
                      onClick={(e) => scrollToHash(e, "#contact")}
                      className="link-arrow self-start"
                    >
                      <span data-roll>Get Started</span> <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="flex min-w-0 flex-col">
                  {services.map((service, i) => (
                    <article
                      key={service.label}
                      className={`relative grid grid-cols-[48px_1fr] gap-4 md:grid-cols-[64px_1fr] ${
                        i === 0 ? "pb-14" : "py-14"
                      }`}
                    >
                      {i > 0 && <span data-line className="absolute inset-x-0 top-0 h-px bg-line" />}
                      <span className="font-en text-[26px] font-medium leading-[1.2] text-[#B4B4B0] md:text-[32px]">
                        {service.label} /
                      </span>
                      <div data-fade className="flex flex-col gap-[18px]">
                        <h3 className="text-[clamp(22px,2.4vw,34px)] font-bold leading-[1.45]">
                          <span className="nowrap-ib">{service.headline[0]}</span>
                          <span className="nowrap-ib">{service.headline[1]}</span>
                        </h3>
                        <p className="text-sm text-sub">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span key={tag} className="pill bg-mist">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-1 font-en text-[13px] text-sub">
                          料金のめやす　{service.price}
                        </p>
                      </div>
                      {i === services.length - 1 && (
                        <span data-line className="absolute inset-x-0 bottom-0 h-px bg-line" />
                      )}
                    </article>
                  ))}
                  <p className="ml-16 mt-7 font-en text-[13px] font-medium text-sub md:ml-20">
                    Hearing — Design — Release — Review
                  </p>
                </div>
              </div>
            </section>

            {/* プロフィール */}
            <section id="about" className="bg-ink px-5 py-[120px] text-white md:px-10 lg:py-[150px]">
              <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
                <p className="font-en text-lg font-medium tracking-[-0.01em]">About</p>
                <div className="grid items-end gap-14 md:grid-cols-[0.9fr_1.1fr]">
                  <div data-clip className="relative aspect-[3/4] overflow-hidden bg-[#2A2A28]">
                    <Image
                      src={profile.image}
                      alt="鶴田啓介のプロフィール写真"
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <h2
                      data-split
                      className="font-en text-[clamp(40px,4.4vw,64px)] font-semibold leading-[0.95] tracking-[-0.05em]"
                    >
                      {profile.nameEn[0]}
                      <br />
                      {profile.nameEn[1]}
                    </h2>
                    <div data-fade className="flex flex-col gap-6">
                      <p className="text-sm font-medium text-[#CFCFCB]">{profile.nameJa}</p>
                      <p className="text-sm leading-[2.1] text-[#E4E4E0]">{profile.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.tags.map((tag) => (
                          <span key={tag} className="pill bg-[#262624] text-[#F2F2F0]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* お問い合わせ */}
            <section id="contact" className="px-5 pb-[100px] pt-[120px] md:px-10 lg:pb-[120px] lg:pt-[160px]">
              <div className="mx-auto flex max-w-[1360px] flex-col gap-12">
                <h2
                  data-split
                  className="font-en text-[clamp(64px,12vw,184px)] font-semibold leading-[0.85] tracking-[-0.06em]"
                >
                  Let’s talk.
                </h2>
                <div className="relative flex flex-wrap items-end justify-between gap-8 pt-8">
                  <span data-line className="absolute inset-x-0 top-0 h-px bg-ink" />
                  <div data-fade className="flex flex-col gap-2">
                    <p className="text-lg font-bold">まずは、いまのお悩みを聞かせてください。</p>
                    <p className="text-[13px] text-sub">ご相談は無料です。24時間以内にお返事します。</p>
                  </div>
                  <Link
                    href="/contact"
                    className="btn-contact inline-flex h-[60px] items-center gap-3.5 rounded-full bg-ink px-9 font-en text-base font-medium tracking-[-0.01em] text-white"
                  >
                    <span data-roll>Contact</span> <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </section>
          </main>

          <footer className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 pb-11 pt-7 font-en text-[13px] text-sub md:px-10">
            <span>Hair &amp; Web Studio K</span>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/privacy" className="link-line">
                プライバシーポリシー
              </Link>
              <span>© 2026 Keisuke Tsuruta</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
