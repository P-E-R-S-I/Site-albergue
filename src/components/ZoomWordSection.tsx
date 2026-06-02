"use client";
import { useEffect, useRef } from "react";

export default function ZoomWordSection() {
  const wordRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const word = wordRef.current;
      if (!section || !word) return;

      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const sectionH = section.offsetHeight;

      // progress: 0 quando a seção entra, 1 quando saí
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + sectionH)));

      const minSize = window.innerWidth < 768 ? 36 : 56;
      const maxSize = window.innerWidth < 768 ? 88 : 160;
      const size = minSize + (maxSize - minSize) * progress;
      word.style.fontSize = `${size}px`;

      if (labelRef.current) {
        labelRef.current.style.opacity = progress > 0.05 ? "1" : "0";
        labelRef.current.style.transform = progress > 0.05 ? "translateY(0)" : "translateY(10px)";
      }
      if (tagRef.current) {
        tagRef.current.style.opacity = progress > 0.45 ? "1" : "0";
        tagRef.current.style.transform = progress > 0.45 ? "translateY(0)" : "translateY(10px)";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sectionRef} className="zoom-section" style={{ height: "250vh" }}>
      <div className="zoom-sticky bg-svp-dark">
        {/* fundo decorativo */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(128,51,32,0.18) 0%, transparent 70%)",
          }}
        />

        <p
          ref={labelRef}
          className="relative z-10 text-svp-amber text-xs tracking-[0.25em] uppercase font-semibold mb-6"
          style={{ transition: "opacity 0.5s ease, transform 0.5s ease", opacity: 0 }}
        >
          Nossa essência
        </p>

        <div
          ref={wordRef}
          className="zoom-word relative z-10 px-4"
          style={{ fontSize: "56px" }}
        >
          Dignidade
        </div>

        <p
          ref={tagRef}
          className="relative z-10 text-svp-cream/60 text-base md:text-lg leading-relaxed mt-8 max-w-md text-center px-6"
          style={{ transition: "opacity 0.6s ease, transform 0.6s ease", opacity: 0 }}
        >
          Cada idoso merece ser tratado com respeito, carinho e cuidado —
          independentemente da sua história.
        </p>
      </div>
    </div>
  );
}
