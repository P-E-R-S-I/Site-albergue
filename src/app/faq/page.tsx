import { Suspense } from "react";
import FAQData from "@/components/sections/FAQData";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Perguntas Frequentes",
  description:
    "Tire suas dúvidas sobre o Albergue São Vicente: doações, horários de visita, voluntariado e mais.",
  path: "/faq",
});

function FAQSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-5 lg:px-8 py-14 space-y-3 animate-pulse">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-16 bg-white border border-svp-border rounded-xl" />
      ))}
    </div>
  );
}

// Página não é mais async: cabeçalho (estático) chega na hora; a lista de
// perguntas — que depende do banco — fica atrás do <Suspense>.
export default function FAQPage() {
  return (
    <div className="bg-svp-cream min-h-screen">
      {/* Cabeçalho — estático */}
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

      <Suspense fallback={<FAQSkeleton />}>
        <FAQData />
      </Suspense>
    </div>
  );
}
