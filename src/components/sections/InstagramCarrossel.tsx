"use client";
import { useState } from "react";
import Image from "next/image";
import { Instagram, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// ══════════════════════════════════════════════════════
// INSTRUÇÕES PARA ADICIONAR AS FOTOS DO INSTAGRAM:
//
// 1. Abra cada post do Instagram no navegador
// 2. Clique com botão direito na foto → "Copiar endereço da imagem"
// 3. Cole a URL no campo "src" abaixo
// 4. Preencha "alt" com uma descrição curta da foto
// 5. O campo "post" é o link do post para redirecionar o clique
//
// NOTA: URLs do Instagram expiram. A solução definitiva é
// baixar as fotos, colocá-las na pasta /public/ e usar
// "/nome-da-foto.jpg" como src — assim nunca expiram.
// ══════════════════════════════════════════════════════
const FOTOS = [
  {
    src: "/insta-1.jpg",
    alt: "Doação de cestas básicas ao Albergue São Vicente de Paula",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-2.jpg",
    alt: "Visita e grupo de apoio ao Albergue São Vicente de Paula",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-3.webp",
    alt: "Certificados de doação recebidos pelo Albergue",
    post: "https://www.instagram.com/vicentedepaulodejatai",
  },
  {
    src: "/insta-4.webp",
    alt: "Doação de fraldas ao Albergue São Vicente de Paula",
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
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + FOTOS.length) % FOTOS.length);
  const next = () => setIdx((i) => (i + 1) % FOTOS.length);

  // quantas fotos mostrar por vez (3 no desktop, 1 no mobile via CSS)
  const visible = FOTOS;

  return (
    <section className="bg-svp-linen py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-10" data-animate>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-10 bg-svp-amber" />
              <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
                @vicentedepaulodejatai
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-svp-dark font-semibold">
              Nossa comunidade <em className="text-svp-sienna">no dia a dia</em>
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 border border-svp-border text-svp-brown text-sm font-semibold px-5 py-2.5 rounded-full hover:border-svp-sienna hover:text-svp-sienna transition-colors"
          >
            <Instagram size={15} />
            Ver perfil
          </a>
        </div>

        {/* Grade de fotos (desktop: 4 juntas, mobile: carrossel) */}
        <div className="relative">
          {/* Mobile: carrossel */}
          <div className="md:hidden">
            <div className="overflow-hidden rounded-2xl">
              <a
                href={visible[idx].post}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square group"
              >
                <Image
                  src={visible[idx].src}
                  alt={visible[idx].alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-svp-dark/0 group-hover:bg-svp-dark/30 transition-colors flex items-center justify-center">
                  <ExternalLink size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button onClick={prev} className="p-2 rounded-full border border-svp-border hover:border-svp-sienna transition-colors">
                <ChevronLeft size={18} className="text-svp-brown" />
              </button>
              <div className="flex gap-2">
                {FOTOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === idx ? "20px" : "6px",
                      height: "6px",
                      background: i === idx ? "#803320" : "#D9CEBD",
                    }}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full border border-svp-border hover:border-svp-sienna transition-colors">
                <ChevronRight size={18} className="text-svp-brown" />
              </button>
            </div>
          </div>

          {/* Desktop: grade 3 colunas */}
          <div className="hidden md:grid grid-cols-3 gap-4" data-animate data-delay="1">
            {visible.map((foto, i) => (
              <a
                key={i}
                href={foto.post}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-square rounded-2xl overflow-hidden group"
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-svp-dark/0 group-hover:bg-svp-dark/40 transition-colors duration-300 flex items-end p-4">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 text-white text-xs font-semibold">
                    <ExternalLink size={13} />
                    Ver no Instagram
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Link mobile */}
        <div className="mt-8 text-center md:hidden" data-animate>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-svp-border text-svp-brown text-sm font-semibold px-5 py-2.5 rounded-full hover:border-svp-sienna hover:text-svp-sienna transition-colors"
          >
            <Instagram size={15} />
            Ver perfil completo
          </a>
        </div>

      </div>
    </section>
  );
}
