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
    <header className="sticky top-0 z-50 bg-svp-cream/95 backdrop-blur-sm border-b border-svp-border">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo do Albergue — coloque o arquivo logo.png na pasta public/ */}
            <div className="w-10 h-10 flex-shrink-0 relative">
              <Image
                src="/logo.png"
                alt="Logo Albergue São Vicente de Paulo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-display text-svp-sienna text-lg leading-tight font-semibold tracking-tight group-hover:text-svp-rose transition-colors">
                São Vicente de Paulo
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
                    ? "bg-svp-sienna/20 text-svp-sienna border border-svp-sienna/20"
                    : "text-svp-brown hover:text-svp-sienna hover:bg-svp-sienna/5"
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
                  ? "bg-svp-sienna/20 text-svp-sienna border border-svp-sienna/20"
                  : "text-svp-brown hover:text-svp-sienna"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsapp}
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
