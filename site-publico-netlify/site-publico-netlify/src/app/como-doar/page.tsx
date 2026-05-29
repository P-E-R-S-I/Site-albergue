import type { Metadata } from "next";
import { Copy, Heart, AlertTriangle, CheckCircle2, MapPin, Package } from "lucide-react";
import {
  PLACEHOLDER_INFO_ALBERGUE,
  PLACEHOLDER_ITENS_MAIS_NECESSARIOS,
} from "@/lib/dados-placeholder";

export const metadata: Metadata = {
  title: "Como Doar",
  description:
    "Saiba como fazer uma doação para o Albergue São Vicente de Paula — Pix, itens físicos ou voluntariado.",
};

export default function ComoDoarPage() {
  return (
    <div className="bg-svp-cream min-h-screen">
      {/* Cabeçalho da página */}
      <div className="bg-svp-linen border-b border-svp-border py-16">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-svp-amber" />
            <span className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold">
              Contribua
            </span>
          </div>
          <h1 className="font-display text-5xl text-svp-dark font-semibold">
            Como <em className="text-svp-sienna">Doar</em>
          </h1>
          <p className="text-svp-brown mt-3 max-w-xl leading-relaxed">
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

            {/* QR Code placeholder */}
            <div className="bg-svp-linen rounded-xl h-44 flex items-center justify-center mb-5 border border-dashed border-svp-border">
              <div className="text-center text-svp-muted">
                <div className="w-20 h-20 bg-svp-border/50 rounded-md mx-auto mb-2 grid grid-cols-3 gap-1 p-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        background: [0,2,6,8].includes(i) ? "#803320" : i === 4 ? "#803320" : "#D9CEBD",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs">Substitua pelo QR Code real</p>
              </div>
            </div>

            <div className="bg-svp-linen rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-svp-muted text-xs mb-1">Chave Pix (CNPJ)</p>
                <p className="font-mono text-svp-dark font-semibold text-sm">
                  {PLACEHOLDER_INFO_ALBERGUE.pixKey}
                </p>
              </div>
              <button
                title="Copiar chave Pix"
                className="w-9 h-9 rounded-lg bg-svp-cream border border-svp-border flex items-center justify-center hover:bg-svp-border transition-colors flex-shrink-0"
              >
                <Copy size={14} className="text-svp-muted" />
              </button>
            </div>

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
            <p className="font-semibold text-svp-dark mb-3">TED ou depósito bancário</p>
            <div className="space-y-2 text-sm">
              {[
                ["Banco", "000 — Placeholder"],
                ["Agência", "0001"],
                ["Conta", "00000-0 (Conta Corrente)"],
                ["CNPJ", PLACEHOLDER_INFO_ALBERGUE.pixKey],
                ["Titular", PLACEHOLDER_INFO_ALBERGUE.nome],
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
              {PLACEHOLDER_ITENS_MAIS_NECESSARIOS.map((i, idx) => (
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
              <p><span className="text-white/50">Horário: </span>Seg–Sex, 8h às 17h</p>
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
