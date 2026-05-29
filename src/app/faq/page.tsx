import { getFaqs } from "@/lib/supabase";
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Perguntas Frequentes",
  description:
    "Tire suas dúvidas sobre o Albergue São Vicente: doações, horários de visita, voluntariado e mais.",
};

export default async function FAQPage() {
  const faqs = await getFaqs();

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

      {/* FAQ accordion (client component porque tem estado) */}
      <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">
        <FAQAccordion faqs={faqs} />

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
