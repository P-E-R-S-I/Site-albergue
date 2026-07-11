"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/supabase";

function FAQItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-colors ${open ? "border-svp-sienna/40 bg-svp-sienna/5" : "border-svp-border bg-white"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
        aria-expanded={open}
      >
        <span
          className={`font-semibold text-sm leading-snug ${open ? "text-svp-sienna" : "text-svp-dark"}`}
        >
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

export default function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) {
    return (
      <div className="text-center text-svp-muted py-12">
        Nenhuma pergunta cadastrada ainda.
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={item.id} data-animate data-delay={String(Math.min(i, 5))}>
          <FAQItem pergunta={item.pergunta} resposta={item.resposta} />
        </div>
      ))}
    </div>
  );
}
