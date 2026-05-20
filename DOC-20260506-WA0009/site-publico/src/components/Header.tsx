"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/como-doar", label: "Como Doar" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/faq", label: "Dúvidas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-svp-cream/95 backdrop-blur-sm border-b border-svp-border">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Ícone SVG da logo */}
            <div className="w-9 h-9 flex-shrink-0">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Casa */}
                <path d="M4 17L18 5L32 17V32H23V24H13V32H4V17Z"
                  fill="#803320" fillOpacity="0.15" stroke="#803320" strokeWidth="2" strokeLinejoin="round" />
                {/* Cruz */}
                <rect x="16" y="10" width="4" height="10" rx="1" fill="#803320" />
                <rect x="12" y="14" width="12" height="4" rx="1" fill="#803320" />
              </svg>
            </div>
            <div>
              <p className="font-display text-svp-sienna text-lg leading-tight font-semibold tracking-tight group-hover:text-svp-rose transition-colors">
                São Vicente de Paula
              </p>
              <p className="text-svp-muted text-[10px] tracking-[0.15em] uppercase leading-none">
                Albergue · Jataí GO
              </p>
            </div>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-svp-sienna/10 text-svp-sienna"
                    : "text-svp-brown hover:text-svp-sienna hover:bg-svp-sienna/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Botão WhatsApp */}
          <a
            href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-svp-forest text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-svp-sage transition-colors"
          >
            <Heart size={14} />
            Quero ajudar
          </a>

          {/* Hamburguer Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-svp-brown hover:text-svp-sienna transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden bg-svp-cream border-t border-svp-border px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-svp-sienna/10 text-svp-sienna"
                  : "text-svp-brown hover:text-svp-sienna"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-svp-forest text-white text-sm font-semibold px-4 py-3 rounded-full mt-2 hover:bg-svp-sage transition-colors"
          >
            <Heart size={14} />
            Quero ajudar
          </a>
        </div>
      )}
    </header>
  );
}
