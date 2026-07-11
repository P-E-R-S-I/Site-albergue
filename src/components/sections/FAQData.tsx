import { getFaqs, getInfoAlbergue } from "@/lib/supabase";
import FAQAccordion from "@/components/sections/FAQAccordion";
import { MessageCircle } from "lucide-react";

// Lista de perguntas + CTA do WhatsApp — depende do banco, streamado à parte
// do cabeçalho estático da página.
export default async function FAQData() {
  const [faqs, info] = await Promise.all([getFaqs(), getInfoAlbergue()]);

  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-16">
      <FAQAccordion faqs={faqs} />

      <div className="mt-14 bg-svp-sienna rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={22} className="text-white" />
        </div>
        <h2 className="font-display text-2xl text-white font-semibold mb-2">
          Não encontrou sua resposta?
        </h2>
        <p className="text-white/70 text-sm mb-6 leading-relaxed">
          Nossa equipe está disponível pelo WhatsApp para responder qualquer dúvida
          com calma e cuidado.
        </p>
        <a
          href={info.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-svp-sienna font-semibold text-sm px-6 py-3 rounded-full hover:bg-svp-cream transition-colors"
        >
          <MessageCircle size={16} />
          Falar com a equipe pelo WhatsApp
        </a>
      </div>
    </div>
  );
}
