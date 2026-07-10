"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/como-doar", label: "Como Doar" },
  { href: "/transparencia", label: "Transparência" },
  { href: "/faq", label: "Dúvidas" },
];

export default function Header({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-svp-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo do Albergue — coloque o arquivo logo.png na pasta public/ */}
            <div className="w-9 h-9 flex-shrink-0 relative rounded-full overflow-hidden ring-1 ring-white/15">
              <Image
                src="/logo.png"
                alt="Logo Albergue São Vicente de Paulo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="font-display text-svp-cream text-lg leading-tight font-semibold tracking-tight group-hover:text-svp-gold transition-colors">
                São Vicente de Paulo
              </p>
              <p className="text-svp-cream/50 text-[10px] tracking-[0.15em] uppercase leading-none">
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
                    ? "bg-white/10 text-svp-gold"
                    : "text-svp-cream/70 hover:text-svp-cream hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Botão WhatsApp */}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-svp-amber text-svp-dark text-sm font-bold px-4 py-2 rounded-full hover:bg-svp-gold transition-colors"
          >
            <Heart size={14} />
            Quero ajudar
          </a>

          {/* Hamburguer Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-svp-cream hover:text-svp-gold transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="md:hidden bg-svp-dark border-t border-white/10 px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-white/10 text-svp-gold"
                  : "text-svp-cream/80 hover:text-svp-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-svp-amber text-svp-dark text-sm font-bold px-4 py-3 rounded-full mt-2 hover:bg-svp-gold transition-colors"
          >
            <Heart size={14} />
            Quero ajudar
          </a>
        </div>
      )}
    </header>
  );
}
