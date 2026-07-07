import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";

// Barra de ação fixa do redesign mobile — CTA de doação sempre à mão.
// Escondida no desktop (lg:hidden); o body reserva o espaço via pb-[68px].
export default function ActionBarMobile({ whatsapp }: { whatsapp: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 px-3.5 py-2.5 bg-svp-dark/95 backdrop-blur border-t border-white/10 lg:hidden">
      <Link
        href="/como-doar"
        className="flex-1 flex items-center justify-center gap-2 bg-svp-amber text-svp-dark font-bold text-[13.5px] py-3 rounded-[10px]"
      >
        <Heart size={15} fill="currentColor" />
        Doar agora
      </Link>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 bg-svp-forest text-white font-semibold text-[13.5px] py-3 px-4 rounded-[10px]"
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
    </div>
  );
}
