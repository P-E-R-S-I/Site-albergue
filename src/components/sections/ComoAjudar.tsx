import Link from "next/link";
import { Package, DollarSign, MessageCircle, ArrowRight } from "lucide-react";

export default function ComoAjudar({ whatsapp }: { whatsapp: string }) {
  const FORMAS = [
    {
      icon: <DollarSign size={24} className="text-svp-amber" />,
      titulo: "Doação em dinheiro",
      desc: "Transfira via Pix ou depósito bancário. Toda entrada é registrada no nosso painel de transparência.",
      href: "/como-doar",
      cor: "bg-svp-amber/10 border-svp-amber/30",
    },
    {
      icon: <Package size={24} className="text-svp-sienna" />,
      titulo: "Itens e alimentos",
      desc: "Fraldas geriátricas (nosso item mais urgente), alimentos não perecíveis, higiene pessoal e roupas. Veja a lista completa do que mais precisamos.",
      href: "/como-doar",
      cor: "bg-svp-sienna/10 border-svp-sienna/30",
    },
    {
      icon: <MessageCircle size={24} className="text-svp-forest" />,
      titulo: "Voluntariado",
      desc: "De barbeiros a grupos que preparam lanches — há espaço para doar seu tempo aos idosos. Entre em contato para conhecer as oportunidades.",
      href: whatsapp,
      cor: "bg-svp-forest/10 border-svp-forest/30",
      externo: true,
    },
  ];
  return (
    <section className="bg-svp-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-svp-sienna/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5" data-animate>
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Como contribuir
            </span>
            <div className="h-px w-10 bg-svp-amber" />
          </div>
          <h2
            className="font-display text-4xl md:text-5xl text-svp-cream font-semibold"
            data-animate
            data-delay="1"
          >
            Há uma forma de ajudar<br />
            <em className="text-svp-amber">para cada pessoa.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {FORMAS.map((f, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-7 ${f.cor} flex flex-col hover:scale-[1.02] transition-transform duration-300`}
              data-animate
              data-delay={String(i + 1)}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-display text-2xl text-svp-cream font-semibold mb-3">
                {f.titulo}
              </h3>
              <p className="text-svp-cream/60 text-sm leading-relaxed flex-1 mb-6">
                {f.desc}
              </p>
              {f.externo ? (
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-svp-cream/80 hover:text-svp-cream text-sm font-semibold transition-colors"
                >
                  Saiba mais <ArrowRight size={14} />
                </a>
              ) : (
                <Link
                  href={f.href}
                  className="flex items-center gap-2 text-svp-cream/80 hover:text-svp-cream text-sm font-semibold transition-colors"
                >
                  Saiba mais <ArrowRight size={14} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
