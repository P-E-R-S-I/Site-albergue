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
      <div className="bg-svp-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-svp-sienna/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Perguntas frequentes
            </span>
          </div>
          <h1 className="font-display text-5xl text-svp-cream font-semibold">
            Dúvidas <em className="text-svp-sienna">frequentes</em>
          </h1>
          <p className="text-svp-cream/60 mt-3 leading-relaxed">
            Reunimos as perguntas mais comuns que recebemos. Se a sua dúvida não estiver
            aqui, é só chamar no WhatsApp — respondemos rapidinho.
          </p>
        </div>
      </div>

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
            href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-svp-sienna font-semibold text-sm px-6 py-3 rounded-full hover:bg-svp-cream transition-colors"
          >
            <MessageCircle size={16} />
            Falar com a equipe pelo WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
