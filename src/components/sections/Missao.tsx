import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Missao() {
  return (
    <section className="bg-svp-cream py-24">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">

        {/* Lado esquerdo — citação */}
        <div className="relative">
          {/* Aspas decorativas */}
          <div className="font-display text-[140px] text-svp-sienna/10 leading-none select-none absolute -top-8 -left-4">
            "
          </div>
          <blockquote className="relative">
            <p className="font-display text-3xl md:text-4xl text-svp-dark italic leading-snug font-medium">
              O importante não é só programar. É mudar o ser humano, ser uma pessoa
              que vai ajudar a sociedade.
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="h-px w-8 bg-svp-amber" />
              <cite className="not-italic text-svp-muted text-sm font-medium">
                Alexandre, presidente do Albergue
              </cite>
            </footer>
          </blockquote>
        </div>

        {/* Lado direito — missão e valores */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Nossa missão
            </span>
          </div>

          <h2 className="font-display text-4xl text-svp-dark font-semibold mb-5 leading-tight">
            Acolhimento com <em className="text-svp-sienna">dignidade</em> e transparência
          </h2>

          <p className="text-svp-brown leading-relaxed mb-4">
            O Albergue São Vicente de Paula é uma instituição sem fins lucrativos dedicada a
            oferecer moradia, cuidado e qualidade de vida para idosos em situação de
            vulnerabilidade social na região de Jataí, Goiás.
          </p>
          <p className="text-svp-brown leading-relaxed mb-8">
            Todas as nossas doações são registradas publicamente. Aqui você pode acompanhar
            em tempo real o que recebemos, o que gastamos e o que mais precisamos — porque
            acreditamos que a transparência é parte do cuidado.
          </p>

          <div className="flex flex-wrap gap-4">
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

      </div>
    </section>
  );
}
