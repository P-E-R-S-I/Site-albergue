import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Heart, Instagram, Mail } from "lucide-react";
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";

const INSTAGRAM_URL = "https://www.instagram.com/vicentedepaulodejatai";

export default function Footer() {
  return (
    <footer className="bg-svp-dark text-svp-cream/80">
      {/* CTA faixa superior */}
      <div className="bg-svp-sienna">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-white italic">
              Sua doação transforma vidas.
            </p>
            <p className="text-white/70 text-sm mt-1">
              Cada contribuição, grande ou pequena, faz diferença para os nossos idosos.
            </p>
          </div>
          <a
            href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-svp-sienna font-semibold text-sm px-6 py-3 rounded-full hover:bg-svp-cream transition-colors flex-shrink-0"
          >
            <Heart size={15} />
            Falar pelo WhatsApp
          </a>
        </div>
      </div>

      {/* Corpo do footer */}
      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Coluna 1 — Identidade com logo real */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo Albergue São Vicente de Paulo"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-display text-svp-cream text-base font-semibold leading-tight">
              Albergue São Vicente<br />
              <span className="text-svp-cream/50 text-sm font-normal">de Paulo</span>
            </p>
          </div>
          <p className="text-svp-cream/60 text-sm leading-relaxed mb-5">
            {PLACEHOLDER_INFO_ALBERGUE.missao}
          </p>
          {/* Instagram link */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-svp-cream/50 hover:text-svp-cream text-sm transition-colors"
          >
            <Instagram size={15} />
            @vicentedepaulodejatai
          </a>
        </div>

        {/* Coluna 2 — Links */}
        <div>
          <p className="text-svp-cream text-xs tracking-[0.18em] uppercase font-semibold mb-4">
            Navegação
          </p>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Início" },
              { href: "/como-doar", label: "Como Doar" },
              { href: "/transparencia", label: "Transparência" },
              { href: "/faq", label: "Perguntas Frequentes" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-svp-cream/60 hover:text-svp-cream text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <p className="text-svp-cream text-xs tracking-[0.18em] uppercase font-semibold mb-4">
            Contato & Localização
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-svp-amber mt-0.5 flex-shrink-0" />
              <span className="text-svp-cream/60 text-sm">{PLACEHOLDER_INFO_ALBERGUE.endereco}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={15} className="text-svp-amber mt-0.5 flex-shrink-0" />
              <a
                href={`tel:${PLACEHOLDER_INFO_ALBERGUE.telefone.replace(/\D/g, "")}`}
                className="text-svp-cream/60 hover:text-svp-cream text-sm transition-colors"
              >
                {PLACEHOLDER_INFO_ALBERGUE.telefone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={15} className="text-svp-amber mt-0.5 flex-shrink-0" />
              <a
                href={`mailto:${PLACEHOLDER_INFO_ALBERGUE.email}`}
                className="text-svp-cream/60 hover:text-svp-cream text-sm transition-colors"
              >
                {PLACEHOLDER_INFO_ALBERGUE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={15} className="text-svp-amber mt-0.5 flex-shrink-0" />
              <span className="text-svp-cream/60 text-sm">
                Visitas: {PLACEHOLDER_INFO_ALBERGUE.horarioVisitas}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={15} className="text-svp-amber mt-0.5 flex-shrink-0" />
              <span className="text-svp-cream/60 text-sm">
                Doações: {PLACEHOLDER_INFO_ALBERGUE.horarioDoacoes}
              </span>
            </li>
          </ul>
          <p className="text-svp-cream/30 text-xs mt-5 leading-relaxed">
            {PLACEHOLDER_INFO_ALBERGUE.vinculo}
          </p>
        </div>
      </div>

      {/* Rodapé */}
      <div className="border-t border-white/10 max-w-6xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-svp-cream/40 text-xs">
          © {new Date().getFullYear()} Albergue São Vicente de Paulo. Todos os direitos reservados.
        </p>
        <p className="text-svp-cream/30 text-xs">
          Site desenvolvido por estudantes de IA — UFJ (Projeto de Extensão)
        </p>
      </div>
    </footer>
  );
}
