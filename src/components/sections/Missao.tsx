import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Missao() {
  return (
    <section className="bg-svp-cream py-24">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Lado esquerdo — missão */}
        <div>
          <div className="flex items-center gap-3 mb-6" data-animate>
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Nossa missão
            </span>
          </div>

          <h2
            className="font-display text-4xl md:text-5xl text-svp-dark font-semibold mb-5 leading-tight"
            data-animate
            data-delay="1"
          >
            Acolhimento com{" "}
            <em className="text-svp-sienna">dignidade</em>{" "}
            e transparência
          </h2>

          <p className="text-svp-brown leading-relaxed mb-4" data-animate data-delay="2">
            O Albergue São Vicente de Paula é uma instituição sem fins lucrativos dedicada a
            oferecer moradia, cuidado e qualidade de vida para idosos em situação de
            vulnerabilidade social na região de Jataí, Goiás.
          </p>
          <p className="text-svp-brown leading-relaxed mb-8" data-animate data-delay="3">
            Todas as nossas doações são registradas publicamente. Aqui você pode acompanhar
            em tempo real o que recebemos, o que gastamos e o que mais precisamos — porque
            acreditamos que a transparência é parte do cuidado.
          </p>

          <div className="flex flex-wrap gap-4" data-animate data-delay="4">
            <Link
              href="/transparencia"
              className="flex items-center gap-2 text-svp-sienna font-semibold text-sm border border-svp-sienna px-5 py-2.5 rounded-full hover:bg-svp-sienna hover:text-white transition-colors"
            >
              Ver transparência <ArrowRight size={14} />
            </Link>
            <Link
              href="/faq"
              className="flex items-center gap-2 text-svp-brown font-semibold text-sm px-5 py-2.5 rounded-full hover:text-svp-sienna transition-colors"
            >
              Perguntas frequentes <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Lado direito — 3 pilares em cards */}
        <div className="grid gap-4">
          {[
            {
              num: "01",
              titulo: "Cuidado integral",
              desc: "Acompanhamento médico, alimentação balanceada e assistência 24h para cada residente.",
              cor: "border-svp-sienna/20 bg-svp-sienna/5",
            },
            {
              num: "02",
              titulo: "Transparência total",
              desc: "Cada doação e cada gasto registrado publicamente. Você decide como ajudar sabendo para onde vai.",
              cor: "border-svp-forest/20 bg-svp-forest/5",
            },
            {
              num: "03",
              titulo: "Comunidade ativa",
              desc: "Voluntários, doadores e a comunidade de Jataí unidos em torno de uma missão comum.",
              cor: "border-svp-amber/20 bg-svp-amber/5",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`border rounded-2xl p-6 flex gap-5 items-start ${item.cor} hover:scale-[1.01] transition-transform duration-300`}
              data-animate
              data-delay={String(i + 1)}
            >
              <span className="font-display text-3xl text-svp-sienna/20 font-bold leading-none flex-shrink-0">
                {item.num}
              </span>
              <div>
                <p className="font-semibold text-svp-dark mb-1">{item.titulo}</p>
                <p className="text-svp-brown text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
