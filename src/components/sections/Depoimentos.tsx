"use client";
import { useEffect, useRef, useState } from "react";

const DEPOIMENTOS = [
  {
    texto:
      "Os trabalhadores cuidam de tudo com tanto carinho e dedicação, especialmente o médico Danilo, que atende cada idoso com atenção e amor.",
    autor: "Visitante",
  },
  {
    texto:
      "Saímos de lá com o coração mais cheio, conscientes de que aprender com os idosos é aprender a viver, um pouco mais devagar, com mais atenção e mais amor.",
    autor: "Voluntária",
  },
  {
    texto:
      "Espalhar amor pelo mundo, missão de cada um de nós!!! Parabéns por fazerem o bem em cada pacotinho entregue.",
    autor: "Doadora",
  },
];

export default function Depoimentos() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (idx: number) => {
    setCurrent((idx + DEPOIMENTOS.length) % DEPOIMENTOS.length);
  };

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((c) => (c + 1) % DEPOIMENTOS.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <section className="bg-svp-linen py-14 lg:py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <span
          className="text-svp-sienna text-[10px] lg:text-xs tracking-[0.2em] uppercase font-bold block mb-5 lg:mb-8"
          data-animate
        >
          Quem nos conhece, fala
        </span>

        {/* Texto do depoimento */}
        <div className="relative min-h-[190px] md:min-h-[170px]" data-animate data-delay="1">
          <blockquote
            key={current}
            className="font-display text-xl md:text-2xl lg:text-3xl text-svp-dark italic leading-[1.4] font-medium border-l-[3px] border-svp-amber pl-5 lg:pl-8"
            style={{ animation: "fadeInUp 0.55s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {DEPOIMENTOS[current].texto}
            <footer className="mt-4 lg:mt-6 not-italic">
              <cite className="text-svp-muted text-[12.5px] lg:text-sm font-semibold font-body not-italic">
                — {DEPOIMENTOS[current].autor}
              </cite>
            </footer>
          </blockquote>
        </div>

        {/* Dots de navegação */}
        <div className="flex items-center gap-2 mt-6 pl-5 lg:pl-8" data-animate data-delay="2">
          {DEPOIMENTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Depoimento ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? "24px" : "7px",
                height: "7px",
                borderRadius: "4px",
                background: i === current ? "#803320" : "#D9CEBD",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
