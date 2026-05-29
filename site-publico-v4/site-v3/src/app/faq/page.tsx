"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { PLACEHOLDER_FAQ, PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";

function FAQItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden transition-colors ${open ? "border-svp-sienna/40 bg-svp-sienna/3" : "border-svp-border bg-white"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`font-semibold text-sm leading-snug ${open ? "text-svp-sienna" : "text-svp-dark"}`}>
          {pergunta}
        </span>
        <ChevronDown
          size={18}
          className={`text-svp-muted flex-shrink-0 transition-transform ${open ? "rotate-180 text-svp-sienna" : ""}`}
        />
      </button>
      {open && (
        <div className="px-7 pb-6 text-svp-brown text-sm leading-relaxed border-t border-svp-border/60">
          <div className="pt-4">{resposta}</div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="bg-svp-cream min-h-screen">
      {/* Cabeçalho */}
      <div className="bg-svp-linen border-b border-svp-border py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Perguntas frequentes
            </span>
          </div>
          <h1 className="font-display text-5xl text-svp-dark font-semibold">
            Dúvidas <em className="text-svp-sienna">frequentes</em>
          </h1>
          <p className="text-svp-brown mt-3 leading-relaxed">
            Reunimos as perguntas mais comuns que recebemos. Se a sua dúvida não estiver
            aqui, é só chamar no WhatsApp — respondemos rapidinho.
          </p>
        </div>
      </div>

      {/* FAQ accordion */}
      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">
        <div className="space-y-3">
          {PLACEHOLDER_FAQ.map((item, i) => (
            <FAQItem key={i} pergunta={item.pergunta} resposta={item.resposta} />
          ))}
        </div>

        {/* CTA — Não encontrou a resposta */}
        <div className="mt-14 bg-svp-dark rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={22} className="text-svp-amber" />
          </div>
          <h2 className="font-display text-2xl text-white font-semibold mb-2">
            Não encontrou sua resposta?
          </h2>
          <p className="text-white/60 text-sm mb-6 leading-relaxed">
            Nossa equipe está disponível pelo WhatsApp para responder qualquer dúvida
            com calma e cuidado. O botão para falar com uma pessoa real está sempre visível.
          </p>
          <a
            href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-svp-amber text-svp-dark font-semibold text-sm px-6 py-3 rounded-full hover:bg-svp-amber/80 transition-colors"
          >
            <MessageCircle size={16} />
            Falar com a equipe pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
