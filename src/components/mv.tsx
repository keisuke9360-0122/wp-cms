const MainVisual: React.FC = () => {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen w-screen overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(ellipse at center, #232526 0%, #0f2027 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.7) 60%, transparent 100%)",
        }}
      />
      <div className="relative z-20 text-center">
        <h1 className="font-bebas text-5xl md:text-7xl font-bold tracking-widest mb-4 uppercase drop-shadow-[0_4px_32px_rgba(0,0,0,1)]">
          My Cool Portfolio
        </h1>
        <p className="font-montserrat text-lg md:text-2xl font-light tracking-wide text-gray-300 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
          創造力 × 技術力 で魅せる、次世代のWeb体験
        </p>
      </div>
      {/* 背景のアニメーションエフェクト */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[40vh] min-h-[200px] z-0 pointer-events-none opacity-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="mv-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00c3ff" />
            <stop offset="100%" stopColor="#ffff1c" />
          </linearGradient>
        </defs>
        <path fill="url(#mv-gradient)" fillOpacity="1">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,160 Q360,80 720,160 T1440,160 V320 H0 Z;
              M0,200 Q360,320 720,200 T1440,220 V320 H0 Z;
              M0,160 Q360,80 720,160 T1440,160 V320 H0 Z
            "
          />
        </path>
      </svg>
    </section>
  );
};

export default MainVisual;
