import { ArrowRight } from "lucide-react";
import { getInfoAlbergue } from "@/lib/supabase";

// Seção "Onde estamos" — só o mapa/endereço/whatsapp dependem do banco.
export default async function LocalizacaoData() {
  const info = await getInfoAlbergue();

  return (
    <section className="bg-svp-cream py-14 lg:py-24">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div>
          <span
            className="text-svp-sienna text-[10px] lg:text-xs tracking-[0.2em] uppercase font-bold block mb-2"
            data-animate
          >
            Onde estamos
          </span>
          <h2
            className="font-display text-[26px] leading-[1.15] md:text-4xl lg:text-5xl text-svp-dark font-bold mb-3 lg:mb-4"
            data-animate data-delay="1"
          >
            Venha nos conhecer{" "}
            <em className="text-svp-sienna not-italic">pessoalmente.</em>
          </h2>
          <p className="text-svp-brown text-[14.5px] lg:text-base leading-relaxed mb-5" data-animate data-delay="2">
            Estamos localizados em Jataí, GO. Se você está pensando em fazer uma visita
            para trazer doações ou conhecer o Albergue, entre em contato antes para
            confirmar o melhor horário.
          </p>

          {/* Vídeo tour do Albergue */}
          <div className="mb-5" data-animate data-delay="3">
            <video
              src="/tour.mp4"
              controls
              preload="none"
              className="rounded-2xl w-full max-w-md border border-svp-border shadow-md"
              poster="/foto-hero.jpg"
            >
              Seu navegador não suporta vídeo HTML5.
            </video>
            <p className="text-svp-muted text-xs mt-2">🎥 Tour pelo Albergue</p>
          </div>

          <a
            href={info.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-svp-dark text-svp-cream font-semibold text-sm px-6 py-3 rounded-xl hover:bg-svp-brown transition-colors w-full sm:w-auto"
            data-animate data-delay="4"
          >
            Agendar pelo WhatsApp <ArrowRight size={14} />
          </a>
        </div>

        <div
          className="rounded-2xl overflow-hidden border-2 border-svp-dark h-64 lg:h-full lg:min-h-[420px]"
          data-animate data-delay="2"
        >
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(info.endereco)}&z=16&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Albergue São Vicente de Paulo"
          />
        </div>
      </div>
    </section>
  );
}
