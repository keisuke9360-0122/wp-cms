import { ReactNode } from "react";

type TechCardProps = {
  icon: ReactNode;
  title: string;
};

export default function TechCard({ icon, title }: TechCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}
