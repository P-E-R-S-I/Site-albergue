"use client";
import { useEffect, useRef, useState } from "react";
import type { EstatisticasAlbergue } from "@/lib/supabase";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number">
      {value}{suffix}
    </span>
  );
}

export default function Estatisticas({ stats }: { stats: EstatisticasAlbergue }) {
  const STATS = [
    {
      valor: stats.idososAtendidos,
      label: "Idosos acolhidos",
      sufixo: "",
      cor: "text-white",
    },
    {
      valor: stats.voluntariosAtivos,
      label: "Voluntários ativos",
      sufixo: "+",
      cor: "text-svp-gold",
    },
    {
      valor: stats.anosDeServico,
      label: "Anos de serviço",
      sufixo: "",
      cor: "text-white",
    },
    {
      valor: stats.familiasBeneficiadas,
      label: "Famílias beneficiadas",
      sufixo: "",
      cor: "text-svp-gold",
    },
  ];
  return (
    <section className="bg-svp-forest py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <p
          className="text-center text-white/60 text-[10px] lg:text-xs tracking-[0.2em] uppercase mb-7 lg:mb-10 font-semibold"
          data-animate
        >
          Nosso impacto em números
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center"
              data-animate
              data-delay={String(i + 1)}
            >
              <p className={`font-display text-4xl lg:text-5xl font-bold leading-none ${stat.cor}`}>
                <Counter target={stat.valor} suffix={stat.sufixo} />
              </p>
              <p className="text-white/70 text-xs lg:text-sm mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
