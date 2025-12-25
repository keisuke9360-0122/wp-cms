// "use client";

// import { useEffect, useRef, useState } from "react";
// import MainVisual from "../components/mv";
// import Image from "next/image";
// import Link from "next/link";
// import TechCard from "../components/TechCard";
// import { Post } from "@/types";
// import { gsap, ScrollTrigger } from "../lib/gsap";
// import { useLoading } from "@/app/contexts/LoadingContext";
// import { FaInstagram, FaGithub } from "react-icons/fa";

// import {
//   FaReact,
//   FaWordpress,
//   FaHtml5,
//   FaCss3Alt,
//   FaJsSquare,
// } from "react-icons/fa";
// import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

// export default function HomePage() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const worksSectionRef = useRef<HTMLDivElement>(null);
//   const worksInnerRef = useRef<HTMLDivElement>(null);
//   const worksPinRef = useRef<HTMLDivElement | null>(null);
//   const aboutRef = useRef<HTMLDivElement>(null);
//   const skillRef = useRef<HTMLDivElement>(null);
//   const contactRef = useRef<HTMLDivElement>(null);
//   const worksTitleRef = useRef<HTMLHeadingElement>(null);
//   const aboutTitleRef = useRef<HTMLHeadingElement>(null);
//   const { setLoading } = useLoading();
//   const contactTitleRef = useRef<HTMLHeadingElement>(null);

//   // 下から競り上がるアニメーション
//   useEffect(() => {
//     const targets = gsap.utils.toArray<HTMLElement>([
//       aboutRef.current,
//       contactRef.current,
//     ]);

//     targets.forEach((el) => {
//       if (!el) return;

//       gsap.fromTo(
//         el,
//         { y: 150, opacity: 0, scale: 0.9 },
//         {
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 1.4,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: el,
//             start: "top 85%",
//           },
//         }
//       );
//     });

//     ScrollTrigger.refresh();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       const res = await fetch("/api/posts");
//       const data = await res.json();
//       setPosts(data);
//       setLoading(false);
//     })();
//   }, []);

//   // works試し用（上手くいってるやつ）;

//   // useEffect(() => {
//   //   if (posts.length === 0) return;
//   //   const section = worksSectionRef.current;
//   //   const inner = worksInnerRef.current;
//   //   if (!section || !inner) return;

//   //   const totalScroll = inner.scrollWidth - window.innerWidth;
//   //   const endValue = totalScroll; // ← window.innerHeight を足さない

//   //   // section.style.height を無理に指定しない
//   //   section.style.height = "auto";

//   //   gsap.set(inner, { x: 0 });

//   //   const tween = gsap.to(inner, {
//   //     x: -totalScroll,
//   //     ease: "none",
//   //     scrollTrigger: {
//   //       id: "worksScroll",
//   //       trigger: section,
//   //       start: "top top",
//   //       end: () => `+=${endValue}`,
//   //       scrub: true,
//   //       pin: true,
//   //       pinSpacing: true, // ← true に戻す
//   //       anticipatePin: 1,
//   //       invalidateOnRefresh: true,
//   //     },
//   //   });

//   //   ScrollTrigger.refresh();

//   //   return () => {
//   //     tween.kill();
//   //     ScrollTrigger.getAll()
//   //       .filter((t) => t.vars.id === "worksScroll")
//   //       .forEach((t) => t.kill());
//   //   };
//   // }, [posts]);

//   // sp横スクロール解除;
//   useEffect(() => {
//     if (posts.length === 0) return;
//     const section = worksSectionRef.current;
//     const inner = worksInnerRef.current;
//     if (!section || !inner) return;

//     const totalScroll = inner.scrollWidth - window.innerWidth;

//     // 画面幅で分岐
//     if (window.innerWidth >= 768 && totalScroll > 0) {
//       gsap.set(inner, { x: 0 });

//       const tween = gsap.to(inner, {
//         x: -totalScroll,
//         ease: "none",
//         scrollTrigger: {
//           id: "worksScroll",
//           trigger: section,
//           start: "top top",
//           end: () => `+=${totalScroll}`,
//           scrub: true,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//         },
//       });

//       ScrollTrigger.refresh();

//       return () => {
//         tween.kill();
//         ScrollTrigger.getAll()
//           .filter((t) => t.vars.id === "worksScroll")
//           .forEach((t) => t.kill());
//       };
//     } else {
//       // スマホでは ScrollTrigger を使わず通常スクロール
//       gsap.set(inner, { clearProps: "all" });
//     }
//   }, [posts]);

//   // タイトル流す演出
//   useEffect(() => {
//     const refs = [
//       aboutTitleRef.current,
//       worksTitleRef.current,
//       contactTitleRef.current,
//     ];

//     refs.forEach((el) => {
//       if (!el) return;

//       const width = el.offsetWidth / 2;
//       gsap.set(el, { x: 0 });

//       gsap.to(el, {
//         x: -width,
//         repeat: -1,
//         duration: 20,
//         ease: "linear",
//       });
//     });
//   }, []);

//   return (
//     <main className="text-black">
//       <MainVisual />
//       {/* About */}
//       <section
//         ref={aboutRef}
//         id="about"
//         className="relative z-30 w-full py-24 md:py-48 px-2"
//       >
//         <h2
//           ref={aboutTitleRef}
//           className="z-10 inline-block whitespace-nowrap
//           text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight
//           text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
//           drop-shadow-2xl pointer-events-none opacity-30 mb-12"
//         >
//           Skill & About Skill & About Skill & About Skill & About Skill & About
//           Skill & About
//         </h2>

//         <div className="mb-16">
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             <TechCard
//               icon={<FaReact className="text-sky-500" />}
//               title="React"
//             />
//             <TechCard
//               icon={<SiNextdotjs className="text-black" />}
//               title="Next.js"
//             />
//             <TechCard
//               icon={<FaWordpress className="text-blue-600" />}
//               title="WordPress"
//             />
//             <TechCard
//               icon={<SiTailwindcss className="text-teal-400" />}
//               title="Tailwind CSS"
//             />
//             <TechCard
//               icon={<FaHtml5 className="text-orange-500" />}
//               title="HTML"
//             />
//             <TechCard
//               icon={<FaCss3Alt className="text-blue-500" />}
//               title="CSS"
//             />
//             <TechCard
//               icon={<FaJsSquare className="text-yellow-400" />}
//               title="JavaScript"
//             />
//           </div>
//         </div>

//         <div className="w-full max-w-none flex flex-col md:flex-row md:gap-12 items-center">
//           <div className="md:w-1/3 mb-8 md:mb-0 flex-shrink-0">
//             <img
//               src="/my_img.jpeg"
//               alt="顔写真"
//               className="w-full rounded-xl shadow-lg object-cover"
//             />
//           </div>

//           <div className="md:w-2/3 text-left px-4 md:px-0">
//             <h3 className="text-2xl font-bold mb-4">Keisuke Tsuruta</h3>
//             <p className="text-gray-700 mb-4">
//               美容専門学校を卒業後、都内の有名サロンでアシスタントとして勤務。その後スタイリストとして独立し、カット・カラー・パーマ・ヘアセット全般の経験を積みました。
//             </p>
//             <p className="text-gray-700 mb-4">
//               イベントや撮影のヘアメイクサポートも経験があり、幅広い技術とセンスでお客様に似合うスタイルを提供しています。
//             </p>
//             <p className="text-gray-700">
//               現在はフロントエンドの技術と美容師としての経験を活かし、表現力のある仕事を追求しています。
//             </p>
//           </div>
//         </div>
//       </section>
//       {/* 上手くいったやつ */}
//       {/* お試し用 */}
//       <section
//         ref={worksSectionRef}
//         id="works"
//         className="relative min-h-screen"
//       >
//         <h2
//           ref={worksTitleRef}
//           className="absolute top-24 md:top-0 left-0 z-10
//     inline-block whitespace-nowrap
//     text-[clamp(3rem,12vw,10rem)]
//     font-extrabold uppercase tracking-tight
//     text-transparent bg-clip-text
//     bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
//     drop-shadow-2xl pointer-events-none opacity-30"
//         >
//           Works Works Works Works Works Works Works Works Works Works Works
//           Works
//         </h2>

//         {/* 横スクロール部分 */}
//         <div
//           ref={worksInnerRef}
//           className="
//       flex gap-8 px-6 pt-24
//       md:h-screen md:items-center
//       overflow-x-auto md:overflow-visible
//       snap-x snap-mandatory md:snap-none
//       scroll-smooth
//     "
//         >
//           {posts.slice(0, 6).map((post) => (
//             <Link
//               key={post.id}
//               href={`/posts/${post.slug}`}
//               className="
//           min-w-[80%] md:min-w-[70vw]
//           h-[60vh] md:h-[70vh]
//           bg-white border border-gray-200 rounded-2xl
//           overflow-hidden shadow-md flex-shrink-0 relative
//           snap-start
//         "
//             >
//               {post.featuredImage?.node?.sourceUrl && (
//                 <Image
//                   src={post.featuredImage.node.sourceUrl}
//                   alt={post.featuredImage.node.altText || post.title}
//                   fill
//                   className="object-cover transition-all duration-500"
//                 />
//               )}
//               <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
//                 <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
//                   {post.title}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>
//       {/* Contact */}

//       <section
//         id="contact"
//         className="relative z-30 py-32 md:py-48 px-8 text-center"
//       >
//         <h2
//           ref={contactTitleRef}
//           className="inline-block whitespace-nowrap
//     text-[clamp(3rem,12vw,10rem)]
//     font-extrabold uppercase tracking-tight text-transparent bg-clip-text
//     bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-2xl"
//         >
//           Contact Contact Contact Contact Contact Contact Contact Contact
//           Contact Contact Contact Contact
//         </h2>

//         <p className="mb-6 text-gray-800 text-lg">
//           ご連絡は以下のフォームからお願いいたします。
//         </p>
//         <form
//           action="/api/contact"
//           method="POST"
//           className="max-w-lg mx-auto space-y-6 text-left"
//         >
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               お名前
//             </label>
//             <input
//               type="text"
//               name="name"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
//       focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               メールアドレス
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
//       focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               メッセージ
//             </label>
//             <textarea
//               name="message"
//               rows={4}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
//       focus:border-blue-500 focus:ring-blue-500"
//               required
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md
//   transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-800"
//           >
//             送信する
//           </button>
//         </form>
//         <div className="flex justify-center gap-8 my-32">
//           {/* Instagram アイコン */}
//           <a
//             href="https://instagram.com/keitsuru0122"
//             target="_blank"
//             rel="noopener"
//             className="text-black hover:text-gray-600 transition-colors"
//           >
//             <FaInstagram className="w-8 h-8" />
//           </a>

//           {/* GitHub アイコン */}
//           <a
//             href="https://github.com/keisuke9360-0122/wp-cms"
//             target="_blank"
//             rel="noopener"
//             className="text-black hover:text-gray-600 transition-colors"
//           >
//             <FaGithub className="w-8 h-8" />
//           </a>
//         </div>
//       </section>
//     </main>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import MainVisual from "../components/mv";
import Image from "next/image";
import Link from "next/link";
import TechCard from "../components/TechCard";
import { Post } from "@/types";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useLoading } from "@/app/contexts/LoadingContext";
import { FaInstagram, FaGithub } from "react-icons/fa";
import { hairWorks } from "./data/hairWorks";

import {
  FaReact,
  FaWordpress,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const worksSectionRef = useRef<HTMLDivElement>(null);
  const worksInnerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const hairRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const worksTitleRef = useRef<HTMLHeadingElement>(null);
  const aboutTitleRef = useRef<HTMLHeadingElement>(null);
  const { setLoading } = useLoading();
  const contactTitleRef = useRef<HTMLHeadingElement>(null);

  // 下から競り上がるアニメーション
  useEffect(() => {
    const targets = gsap.utils.toArray<HTMLElement>([
      aboutRef.current,
      contactRef.current,
    ]);

    targets.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 150, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    })();
  }, []);

  // sp横スクロール解除
  useEffect(() => {
    if (posts.length === 0) return;
    const section = worksSectionRef.current;
    const inner = worksInnerRef.current;
    if (!section || !inner) return;

    const totalScroll = inner.scrollWidth - window.innerWidth;

    if (window.innerWidth >= 768 && totalScroll > 0) {
      gsap.set(inner, { x: 0 });

      const tween = gsap.to(inner, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          id: "worksScroll",
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();

      return () => {
        tween.kill();
        ScrollTrigger.getAll()
          .filter((t) => t.vars.id === "worksScroll")
          .forEach((t) => t.kill());
      };
    } else {
      gsap.set(inner, { clearProps: "all" });
    }
  }, [posts]);

  // Hair Works フェード切り替え

  useEffect(() => {
    if (!hairRef.current) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".hair-slide");

      if (slides.length === 0) return;

      gsap.set(slides[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hairRef.current,
          start: "top top",
          end: () => `+=${slides.length * 1000}`,
          scrub: true,
          pin: true,
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.to(slides[i - 1], { opacity: 0, duration: 1 }, i);
        tl.to(slides[i], { opacity: 1, duration: 1 }, i);
      });
    }, hairRef);

    return () => ctx.revert();
  }, []);

  // タイトル流す演出
  useEffect(() => {
    const refs = [
      aboutTitleRef.current,
      worksTitleRef.current,
      contactTitleRef.current,
    ];

    refs.forEach((el) => {
      if (!el) return;

      const width = el.offsetWidth / 2;
      gsap.set(el, { x: 0 });

      gsap.to(el, {
        x: -width,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    });
  }, []);

  return (
    <main className="text-black">
      <MainVisual />
      {/* About */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-30 w-full py-32 md:py-48 px-2"
      >
        <h2
          ref={aboutTitleRef}
          className="z-10 inline-block whitespace-nowrap 
  text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight
  text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
  drop-shadow-2xl pointer-events-none opacity-30 mb-20"
        >
          Skill & About Skill & About Skill & About Skill & About Skill & About
          Skill & About
        </h2>

        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <TechCard
              icon={<FaReact className="text-sky-500" />}
              title="React"
            />
            <TechCard
              icon={<SiNextdotjs className="text-black" />}
              title="Next.js"
            />
            <TechCard
              icon={<FaWordpress className="text-blue-600" />}
              title="WordPress"
            />
            <TechCard
              icon={<SiTailwindcss className="text-teal-400" />}
              title="Tailwind CSS"
            />
            <TechCard
              icon={<FaHtml5 className="text-orange-500" />}
              title="HTML"
            />
            <TechCard
              icon={<FaCss3Alt className="text-blue-500" />}
              title="CSS"
            />
            <TechCard
              icon={<FaJsSquare className="text-yellow-400" />}
              title="JavaScript"
            />
          </div>
        </div>

        {/* <div className="w-full max-w-none flex flex-col md:flex-row md:gap-12 items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex-shrink-0">
            <img
              src="/my_img.jpeg"
              alt="顔写真"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          <div className="md:w-2/3 text-left px-4 md:px-0">
            <h3 className="text-2xl font-bold mb-4">Keisuke Tsuruta</h3>
            <p className="text-gray-700 mb-4">
              美容専門学校を卒業後、都内の有名サロンでアシスタントとして勤務。その後スタイリストとして独立し、カット・カラー・パーマ・ヘアセット全般の経験を積みました。
            </p>
            <p className="text-gray-700 mb-4">
              イベントや撮影のヘアメイクサポートも経験があり、幅広い技術とセンスでお客様に似合うスタイルを提供しています。
            </p>
            <p className="text-gray-700">
              現在はフロントエンドの技術と美容師としての経験を活かし、表現力のある仕事を追求しています。
            </p>
          </div>
        </div> */}
        <div className="w-full max-w-none flex flex-col md:flex-row md:gap-12 items-center">
          {/* 左：写真（35% → 小さめ） */}
          <div className="md:w-[35%] mb-8 md:mb-0 flex-shrink-0">
            <img
              src="/my_img.jpeg"
              alt="顔写真"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* 右：テキスト（45%） */}
          <div className="md:w-[45%] text-left px-4 md:px-0">
            <h3 className="text-2xl font-bold mb-4">Keisuke Tsuruta</h3>
            <p className="text-gray-700 mb-4">
              福岡県出身<br></br>
              県内の美容学校卒業後、都内のヘアサロンに入社<br></br>
              28歳でスタイリストデビュー後、カットセミナー講師など<br></br>
              撮影を通してカメラ技術も習得<br></br>
              30歳で帰福<br></br>
              市内のヘアサロンに6年間勤めながら、独学でコーディングを学ぶ
              <br></br>
              37歳に市内、web制作会社へ思い切って転職<br></br>
              土日の休日を利用し、美容師時代の顧客の対応も行なっている
            </p>
            <p className="text-gray-700 mb-4">
              コーディングは、ReactやNextを勉強中
            </p>
            <div className="flex justify-center md:justify-startgap-8 mt-32">
              <a
                href="https://instagram.com/keitsuru0122"
                target="_blank"
                rel="noopener"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FaInstagram className="w-8 h-8" />
              </a>

              <a
                href="https://github.com/keisuke9360-0122/wp-cms"
                target="_blank"
                rel="noopener"
                className="text-black hover:text-gray-600 transition-colors"
              >
                <FaGithub className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Works */}
      <section
        ref={worksSectionRef}
        id="works"
        className="relative py-32 md:py-48 md:h-screen"
      >
        <h2
          ref={worksTitleRef}
          className="absolute top-24 md:top-0 left-0 z-10
  inline-block whitespace-nowrap 
  text-[clamp(3rem,12vw,10rem)]
  font-extrabold uppercase tracking-tight
  text-transparent bg-clip-text
  bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600
  drop-shadow-2xl pointer-events-none opacity-30"
        >
          WebWorks WebWorks WebWorks WebWorks WebWorks WebWorks WebWorks
          WebWorks WebWorks WebWorks WebWorks Works
        </h2>

        <div
          ref={worksInnerRef}
          className="flex gap-8 px-6 py-24 md:py-0
  md:h-screen md:items-center
  overflow-x-auto md:overflow-visible
  snap-x snap-mandatory md:snap-none
  scroll-smooth"
        >
          {posts.slice(0, 6).map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="min-w-[50%] md:min-w-[50vw]
              h-[50vh] md:h-[50vh]
              bg-white border border-gray-200 rounded-2xl
              overflow-hidden shadow-md flex-shrink-0 relative
              snap-start"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover transition-all duration-500"
                />
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Hair Works */}{" "}
      <section
        id="hair-works"
        ref={hairRef}
        className="relative w-full h-screen overflow-hidden py-32 md:py-48"
      >
        {" "}
        <h2 className="absolute top-24 md:top-0 left-0 z-20 inline-block whitespace-nowrap text-[clamp(3rem,12vw,10rem)] font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 drop-shadow-2xl pointer-events-none opacity-30">
          {" "}
          HairWorks HairWorks HairWorks HairWorks HairWorks HairWorks{" "}
        </h2>{" "}
        {/* タイトルのための余白 */} <div className="h-20 md:h-20"></div>{" "}
        {hairWorks.map((item) => (
          <div
            key={item.id}
            className="hair-slide absolute inset-0 opacity-0 transition-opacity duration-700"
          >
            {" "}
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover"
            />{" "}
          </div>
        ))}{" "}
      </section>
      {/* Contact */}
      <section
        id="contact"
        ref={contactRef}
        className="relative z-30 pt-32 md:pt-48 px-8 text-center pb-16"
      >
        <h2
          ref={contactTitleRef}
          className="inline-block whitespace-nowrap 
  text-[clamp(3rem,12vw,10rem)]
  font-extrabold uppercase tracking-tight text-transparent bg-clip-text 
  bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-2xl mb-20"
        >
          Contact Contact Contact Contact Contact Contact Contact Contact
          Contact
        </h2>

        <p className="mb-6 text-gray-800 text-lg">
          ご連絡は以下のフォームからお願いいたします。
        </p>

        <form
          action="/api/contact"
          method="POST"
          className="max-w-lg mx-auto space-y-6 text-left"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              お名前
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              メッセージ
            </label>
            <textarea
              name="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-900 text-white font-medium rounded-md 
            transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-gray-800"
          >
            送信する
          </button>
        </form>

        <div className="flex justify-center gap-8 mt-32">
          <a
            href="https://instagram.com/keitsuru0122"
            target="_blank"
            rel="noopener"
            className="text-black hover:text-gray-600 transition-colors"
          >
            <FaInstagram className="w-8 h-8" />
          </a>

          <a
            href="https://github.com/keisuke9360-0122/wp-cms"
            target="_blank"
            rel="noopener"
            className="text-black hover:text-gray-600 transition-colors"
          >
            <FaGithub className="w-8 h-8" />
          </a>
        </div>
      </section>
      <footer className="py-8 text-center text-sm text-gray-500">
        © 2025 Keisuke Tsuruta. All Rights Reserved.
      </footer>
    </main>
  );
}
