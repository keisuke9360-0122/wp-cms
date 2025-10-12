// シンプルなAOS風スクロールアニメーション用フック
import { useEffect } from "react";

export const useScrollAnimation = () => {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-animate]");
    const handleScroll = () => {
      const triggerBottom = window.innerHeight * 0.9;
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
          el.classList.add("animate-fadein-up");
        } else {
          el.classList.remove("animate-fadein-up");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};
