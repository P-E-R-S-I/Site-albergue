"use client";
import { useEffect, useRef, useState } from "react";
import { Users, UserCheck, Calendar, Home } from "lucide-react";
import { PLACEHOLDER_ESTATISTICAS } from "@/lib/dados-placeholder";

const STATS = [
  {
    icon: <Home size={22} className="text-svp-sienna" />,
    valor: PLACEHOLDER_ESTATISTICAS.idososAtendidos,
    label: "Idosos acolhidos",
    sufixo: "+",
  },
  {
    icon: <UserCheck size={22} className="text-svp-forest" />,
    valor: PLACEHOLDER_ESTATISTICAS.voluntariosAtivos,
    label: "Voluntários ativos",
    sufixo: "",
  },
  {
    icon: <Calendar size={22} className="text-svp-amber" />,
    valor: PLACEHOLDER_ESTATISTICAS.anosDeServico,
    label: "Anos de serviço",
    sufixo: "+",
  },
  {
    icon: <Users size={22} className="text-svp-sage" />,
    valor: PLACEHOLDER_ESTATISTICAS.familiasBeneficiadas,
    label: "Famílias beneficiadas",
    sufixo: "+",
  },
];

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

export default function Estatisticas() {
  return (
    <section className="bg-svp-linen border-y border-svp-border py-20">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <p
          className="text-center text-svp-muted text-xs tracking-[0.22em] uppercase mb-12 font-semibold"
          data-animate
        >
          Nosso impacto em números
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center group"
              data-animate
              data-delay={String(i + 1)}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-svp-cream border border-svp-border flex items-center justify-center group-hover:scale-110 group-hover:border-svp-sienna/40 transition-all duration-300">
                  {stat.icon}
                </div>
              </div>
              <p className="font-display text-4xl md:text-5xl text-svp-dark font-bold">
                <Counter target={stat.valor} suffix={stat.sufixo} />
              </p>
              <p className="text-svp-muted text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
