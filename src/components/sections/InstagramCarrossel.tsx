import Image from "next/image";
import { Instagram, ExternalLink } from "lucide-react";

// ══════════════════════════════════════════════════════
// INSTRUÇÕES PARA ATUALIZAR AS FOTOS DO INSTAGRAM:
//
// Baixe as fotos dos posts, coloque-as na pasta /public/ e
// use "/nome-da-foto.jpg" como src — URLs do Instagram expiram.
// O campo "post" é o link do post para redirecionar o clique.
// ══════════════════════════════════════════════════════
const FOTOS = [
  {
    src: "/insta-1.jpg",
    alt: "Doação de cestas básicas ao Albergue São Vicente de Paulo",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-2.jpg",
    alt: "Visita e grupo de apoio ao Albergue São Vicente de Paulo",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-3.webp",
    alt: "Certificados de doação recebidos pelo Albergue",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-4.webp",
    alt: "Doação de fraldas ao Albergue São Vicente de Paulo",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-5.webp",
    alt: "Equipe parceira doando fraldas ao Albergue",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-6.webp",
    alt: "Colaboradores reunidos com doações para o Albergue",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/vicentedepaulodejatai";

export default function InstagramCarrossel() {
  return (
    <section className="bg-svp-dark py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">

        {/* Cabeçalho */}
        <div className="flex items-end justify-between mb-5 lg:mb-8" data-animate>
          <div>
            <span className="text-svp-gold text-[10px] lg:text-xs tracking-[0.16em] uppercase font-semibold block mb-1.5">
              @vicentedepaulodejatai
            </span>
            <h2 className="font-display text-[22px] leading-tight md:text-3xl lg:text-4xl text-svp-cream font-semibold">
              Nossa comunidade{" "}
              <em className="text-svp-gold not-italic">no dia a dia</em>
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 border border-svp-cream/30 text-svp-cream text-sm font-semibold px-5 py-2.5 rounded-[10px] hover:border-svp-cream/70 transition-colors"
          >
            <Instagram size={15} />
            Ver perfil
          </a>
        </div>

        {/* Grade de fotos 3 colunas */}
        <div className="grid grid-cols-3 gap-1.5 lg:gap-4" data-animate data-delay="1">
          {FOTOS.map((foto, i) => (
            <a
              key={i}
              href={foto.post}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-square rounded-lg lg:rounded-2xl overflow-hidden group"
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-svp-dark/0 group-hover:bg-svp-dark/40 transition-colors duration-300 flex items-end p-3">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-white text-xs font-semibold">
                  <ExternalLink size={13} />
                  Ver no Instagram
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Link mobile */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden mt-3.5 flex items-center justify-center gap-2 border border-svp-cream/30 text-svp-cream text-[13px] font-semibold px-5 py-2.5 rounded-[10px] hover:border-svp-cream/70 transition-colors"
          data-animate
        >
          <Instagram size={15} />
          Ver perfil completo
        </a>

      </div>
    </section>
  );
}
