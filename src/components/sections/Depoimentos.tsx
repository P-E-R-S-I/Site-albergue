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
    <section className="bg-svp-cream py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="flex items-center gap-3 mb-12 justify-center" data-animate>
          <div className="h-px w-10 bg-svp-amber" />
          <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
            Quem nos conhece, fala
          </span>
          <div className="h-px w-10 bg-svp-amber" />
        </div>

        {/* Texto do depoimento */}
        <div className="relative min-h-[160px] flex items-center justify-center" data-animate data-delay="1">
          {/* Citação grande decorativa — acima e à esquerda, sem sobrepor o texto */}
          <div
            className="font-display text-[96px] md:text-[120px] text-svp-sienna/10 leading-none select-none absolute -top-10 left-0 pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <blockquote
            key={current}
            className="font-display text-2xl md:text-3xl text-svp-dark italic leading-snug font-medium text-center"
            style={{ animation: "fadeInUp 0.55s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            &ldquo;{DEPOIMENTOS[current].texto}&rdquo;
            <footer className="mt-6 flex items-center justify-center gap-3 not-italic">
              <div className="h-px w-8 bg-svp-amber" />
              <cite className="text-svp-muted text-sm font-medium font-body not-italic">
                {DEPOIMENTOS[current].autor}
              </cite>
            </footer>
          </blockquote>
        </div>

        {/* Dots de navegação */}
        <div className="flex items-center justify-center gap-3 mt-10" data-animate data-delay="2">
          {DEPOIMENTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Depoimento ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
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
