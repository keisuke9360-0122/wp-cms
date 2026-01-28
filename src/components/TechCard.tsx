// import { ReactNode } from "react";

// type TechCardProps = {
//   icon: ReactNode;
//   title: string;
//   className?: string; // 任意で外部から追加クラスを渡せるように
// };

// export default function TechCard({
//   icon,
//   title,
//   className = "",
// }: TechCardProps) {
//   return (
//     <div
//       className={`flex flex-col items-center justify-center p-8 md:p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl ${className}`}
//       style={{ minWidth: "48%" }} // 横幅を広めに固定
//     >
//       <div className="text-5xl mb-4">{icon}</div>
//       <h3 className="text-lg font-semibold">{title}</h3>
//     </div>
//   );
// }
"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TechCardProps = {
  icon: ReactNode;
  title: string;
  years: number;
  maxYears?: number;
  className?: string;
};

export default function TechCard({
  icon,
  title,
  years,
  maxYears = 5,
  className = "",
}: TechCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(years / maxYears, 1);

  useEffect(() => {
    if (!circleRef.current || !cardRef.current) return;

    gsap.fromTo(
      circleRef.current,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: circumference * (1 - progress),
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, [circumference, progress]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col items-center justify-center p-8 md:p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl ${className}`}
      style={{ minWidth: "48%" }}
    >
      <div className="text-5xl mb-4">{icon}</div>

      {/* 円グラフ */}
      <svg width="80" height="80" className="-rotate-90 mb-3">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="6"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="40"
          cy="40"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
        />
      </svg>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{years} 年</p>
    </div>
  );
}
