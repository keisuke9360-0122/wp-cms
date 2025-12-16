import { ReactNode } from "react";

type TechCardProps = {
  icon: ReactNode;
  title: string;
  className?: string; // 任意で外部から追加クラスを渡せるように
};

export default function TechCard({
  icon,
  title,
  className = "",
}: TechCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 md:p-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl ${className}`}
      style={{ minWidth: "48%" }} // 横幅を広めに固定
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
