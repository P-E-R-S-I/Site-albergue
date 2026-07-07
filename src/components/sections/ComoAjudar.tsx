import Link from "next/link";
import { Package, DollarSign, MessageCircle, ArrowRight } from "lucide-react";

export default function ComoAjudar({ whatsapp }: { whatsapp: string }) {
  const FORMAS = [
    {
      icon: <DollarSign size={24} />,
      num: "01",
      titulo: "Doação em dinheiro",
      desc: "Transfira via Pix ou depósito bancário. Toda entrada é registrada no nosso painel de transparência.",
      href: "/como-doar",
      card: "bg-svp-sienna text-white",
      numCor: "text-white/40",
      descCor: "text-white/75",
      linkCor: "text-white font-semibold",
    },
    {
      icon: <Package size={24} />,
      num: "02",
      titulo: "Itens e alimentos",
      desc: "Fraldas geriátricas (nosso item mais urgente), alimentos não perecíveis, higiene pessoal e roupas. Veja a lista completa do que mais precisamos.",
      href: "/como-doar",
      card: "bg-svp-amber text-svp-dark",
      numCor: "text-svp-dark/35",
      descCor: "text-svp-dark/70",
      linkCor: "text-svp-dark font-bold",
    },
    {
      icon: <MessageCircle size={24} />,
      num: "03",
      titulo: "Voluntariado",
      desc: "De barbeiros a grupos que preparam lanches — há espaço para doar seu tempo aos idosos. Entre em contato para conhecer as oportunidades.",
      href: whatsapp,
      card: "bg-svp-forest text-white",
      numCor: "text-white/40",
      descCor: "text-white/75",
      linkCor: "text-white font-semibold",
      externo: true,
    },
  ];
  return (
    <section className="bg-svp-cream py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <span
          className="text-svp-sienna text-[10px] lg:text-xs tracking-[0.2em] uppercase font-bold block mb-2"
          data-animate
        >
          Como contribuir
        </span>
        <h2
          className="font-display text-[26px] leading-[1.15] md:text-4xl lg:text-5xl text-svp-dark font-bold mb-6 lg:mb-10 max-w-2xl"
          data-animate
          data-delay="1"
        >
          Há uma forma de ajudar{" "}
          <em className="text-svp-sienna not-italic">para cada pessoa.</em>
        </h2>

        <div className="grid gap-3 lg:grid-cols-3 lg:gap-6">
          {FORMAS.map((f, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 lg:p-7 flex flex-col ${f.card} hover:scale-[1.02] transition-transform duration-300`}
              data-animate
              data-delay={String(i + 1)}
            >
              <div className="flex items-center justify-between mb-3">
                {f.icon}
                <span className={`font-display text-[15px] font-bold ${f.numCor}`}>{f.num}</span>
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-semibold mb-2">
                {f.titulo}
              </h3>
              <p className={`text-[13px] lg:text-sm leading-relaxed flex-1 mb-3 ${f.descCor}`}>
                {f.desc}
              </p>
              {f.externo ? (
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-[13px] ${f.linkCor}`}
                >
                  Saiba mais <ArrowRight size={13} />
                </a>
              ) : (
                <Link
                  href={f.href}
                  className={`inline-flex items-center gap-1.5 text-[13px] ${f.linkCor}`}
                >
                  Saiba mais <ArrowRight size={13} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
