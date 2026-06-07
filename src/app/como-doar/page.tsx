import type { Metadata } from "next";
import { Heart, AlertTriangle, CheckCircle2, MapPin, Package } from "lucide-react";
import { PLACEHOLDER_INFO_ALBERGUE } from "@/lib/dados-placeholder";
import { getItensNecessarios } from "@/lib/supabase";
import RealtimeRefresher from "@/components/RealtimeRefresher";
import Image from "next/image";
import PixCopyButton from "@/components/PixCopyButton";

export const metadata: Metadata = {
  title: "Como Doar",
  description:
    "Saiba como fazer uma doação para o Albergue São Vicente de Paulo — Pix, itens físicos ou voluntariado.",
};

// Lê do estoque real (view_itens_necessarios) a cada requisição.
export const dynamic = "force-dynamic";

export default async function ComoDoarPage() {
  const itensNecessarios = await getItensNecessarios();
  return (
    <div className="bg-svp-cream min-h-screen">
      {/* "O que mais precisamos" atualiza ao vivo conforme o estoque muda no banco */}
      <RealtimeRefresher />
      {/* Cabeçalho da página */}
      <div className="bg-svp-dark relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-32 w-[500px] h-[500px] rounded-full bg-svp-sienna/10 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Contribua
            </span>
          </div>
          <h1 className="font-display text-5xl text-svp-cream font-semibold">
            Como <em className="text-svp-sienna">Doar</em>
          </h1>
          <p className="text-svp-cream/60 mt-3 max-w-xl leading-relaxed">
            Escolha a forma que for mais conveniente. Toda doação é registrada
            e publicada no nosso painel de transparência.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">

        {/* ===== COLUNA 1 — Doação em dinheiro ===== */}
        <div>
          <h2 className="font-display text-3xl text-svp-dark font-semibold mb-8">
            Doação em <em className="text-svp-amber">dinheiro</em>
          </h2>

          {/* Card Pix */}
          <div className="bg-white border border-svp-border rounded-2xl p-7 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-svp-amber/15 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-svp-amber" />
              </div>
              <div>
                <p className="font-semibold text-svp-dark">Pix</p>
                <p className="text-svp-muted text-xs">Forma mais rápida e prática</p>
              </div>
            </div>

            {/* QR Code real — Pix do Albergue */}
            <div className="flex justify-center mb-5">
              <div className="rounded-2xl overflow-hidden border border-svp-border shadow-sm bg-white p-3">
                <Image
                  src="/qr-pix.png"
                  alt="QR Code Pix — Albergue São Vicente de Paulo"
                  width={200}
                  height={200}
                  className="block"
                  priority
                />
              </div>
            </div>

            <PixCopyButton pixKey={PLACEHOLDER_INFO_ALBERGUE.pixKey} />

            <p className="text-svp-muted text-xs mt-3">
              Após a transferência, todas as doações são lançadas no painel de
              transparência. Você pode conferir em{" "}
              <a href="/transparencia" className="text-svp-sienna underline">
                /transparencia
              </a>
              .
            </p>
          </div>

          {/* Card TED/Depósito */}
          <div className="bg-white border border-svp-border rounded-2xl p-6">
            <p className="font-semibold text-svp-dark mb-3">Depósito bancário</p>
            <div className="space-y-2 text-sm">
              {[
                ["Banco", PLACEHOLDER_INFO_ALBERGUE.banco],
                ["Agência", PLACEHOLDER_INFO_ALBERGUE.agencia],
                ["Conta", PLACEHOLDER_INFO_ALBERGUE.conta],
                ["CNPJ", PLACEHOLDER_INFO_ALBERGUE.pixKey],
                ["Titular", PLACEHOLDER_INFO_ALBERGUE.titular],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-svp-muted">{label}</span>
                  <span className="text-svp-dark font-medium font-mono">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== COLUNA 2 — Itens físicos ===== */}
        <div>
          <h2 className="font-display text-3xl text-svp-dark font-semibold mb-8">
            Itens e <em className="text-svp-sienna">alimentos</em>
          </h2>

          {/* O que mais precisamos */}
          <div className="bg-white border border-svp-border rounded-2xl p-7 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <Package size={18} className="text-svp-sienna" />
              <p className="font-semibold text-svp-dark">O que mais precisamos agora</p>
            </div>
            <ul className="space-y-3">
              {itensNecessarios.length === 0 && (
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={15} className="text-svp-forest flex-shrink-0" />
                  <span className="text-svp-brown text-sm">
                    No momento o estoque está em bom nível — qualquer doação é bem-vinda!
                  </span>
                </li>
              )}
              {itensNecessarios.map((i, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {i.urgente ? (
                    <AlertTriangle size={15} className="text-svp-sienna flex-shrink-0" />
                  ) : (
                    <CheckCircle2 size={15} className="text-svp-forest flex-shrink-0" />
                  )}
                  <span className="text-svp-brown text-sm">{i.item}</span>
                  {i.urgente && (
                    <span className="badge-urgente ml-auto">urgente</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-svp-muted text-xs mt-5 border-t border-svp-border pt-4">
              Lista atualizada pela equipe do Albergue. Itens marcados como{" "}
              <strong className="text-svp-sienna">urgente</strong> estão abaixo do estoque mínimo.
            </p>
          </div>

          {/* Ponto de coleta */}
          <div className="bg-svp-forest text-white rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <MapPin size={20} className="text-white/60" />
              <p className="font-semibold">Ponto de coleta presencial</p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Você pode trazer as doações diretamente ao Albergue. Recomendamos
              entrar em contato antes para confirmar o horário mais conveniente.
            </p>
            <div className="bg-white/10 rounded-xl p-4 text-sm space-y-1 mb-5">
              <p><span className="text-white/50">Endereço: </span>{PLACEHOLDER_INFO_ALBERGUE.endereco}</p>
              <p><span className="text-white/50">Recebemos doações: </span>{PLACEHOLDER_INFO_ALBERGUE.horarioDoacoes}</p>
            </div>
            <a
              href={PLACEHOLDER_INFO_ALBERGUE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-svp-forest font-semibold text-sm px-5 py-3 rounded-full hover:bg-svp-cream transition-colors"
            >
              Avisar que vou levar doação
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
