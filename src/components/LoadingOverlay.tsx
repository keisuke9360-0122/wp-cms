// "use client";
// import { useEffect, useState } from "react";
// import { gsap } from "gsap";
// import { useLoading } from "@/app/contexts/LoadingContext";
// import { usePathname } from "next/navigation";

// export default function LoadingOverlay() {
//   const { loading } = useLoading();
//   const [isVisible, setIsVisible] = useState(true);
//   const pathname = usePathname();

//   // ✅ thanks ページではローディングを完全に無効化
//   if (pathname === "/contact-thanks") return null;

//   useEffect(() => {
//     if (!loading) {
//       gsap.to(".loading-overlay", {
//         opacity: 0,
//         duration: 0.8,
//         ease: "power2.out",
//         onComplete: () => setIsVisible(false),
//       });
//     }
//   }, [loading]);

//   if (!isVisible) return null;

//   return (
//     <div className="font-sans loading-overlay fixed inset-0 bg-black flex items-center justify-center z-[9999]">
//       <span className="text-white text-2xl tracking-widest animate-pulse">
//         LOADING...
//       </span>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLoading } from "@/app/contexts/LoadingContext";
import { usePathname } from "next/navigation";

export default function LoadingOverlay() {
  const { loading } = useLoading();
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  if (pathname === "/contact-thanks") return null;

  useEffect(() => {
    if (!loading) {
      gsap.to(".loading-overlay", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => setIsVisible(false),
      });
    }
  }, [loading]);

  if (!isVisible) return null;

  return (
    <div className="loading-overlay fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
