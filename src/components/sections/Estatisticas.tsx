import { PLACEHOLDER_ESTATISTICAS } from "@/lib/dados-placeholder";
import { Users, UserCheck, Calendar, Home } from "lucide-react";

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

export default function Estatisticas() {
  return (
    <section className="bg-svp-linen border-y border-svp-border">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16">
        <p className="text-center text-svp-muted text-xs tracking-[0.22em] uppercase mb-10 font-semibold">
          Nosso impacto em números
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-svp-cream border border-svp-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <p className="font-display text-4xl text-svp-dark font-bold">
                {stat.valor}{stat.sufixo}
              </p>
              <p className="text-svp-muted text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
