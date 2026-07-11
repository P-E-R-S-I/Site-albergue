import { Heart, AlertTriangle, CheckCircle2, MapPin, Package } from "lucide-react";
import { getItensNecessarios, getInfoAlbergue } from "@/lib/supabase";
import RealtimeRefresher from "@/components/RealtimeRefresher";
import Image from "next/image";
import PixCopyButton from "@/components/PixCopyButton";

// Chave codificada na imagem estática /qr-pix.png (QR fornecido pelo albergue).
// Se a chave Pix for alterada no app de gestão, o QR deixa de ser exibido para
// não divergir do botão de copiar — até uma nova imagem ser gerada.
const QR_PIX_CHAVE = "02.251.270/0001-09";

// Tudo que depende do banco (Pix, dados bancários, itens necessários, ponto
// de coleta) isolado aqui, streamado independente do cabeçalho estático.
export default async function ComoDoarData() {
  const [itensNecessarios, info] = await Promise.all([
    getItensNecessarios(),
    getInfoAlbergue(),
  ]);

  return (
    <>
      {/* "O que mais precisamos" atualiza ao vivo conforme o estoque muda no banco */}
      <RealtimeRefresher />
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
            {info.pixKey === QR_PIX_CHAVE && (
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
            )}

            <PixCopyButton pixKey={info.pixKey} />

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
                ["Banco", info.banco],
                ["Agência", info.agencia],
                ["Conta", info.conta],
                ["CNPJ", info.cnpj],
                ["Titular", info.titular],
              ].map(([label, val]) => (
                <div key={label} className="flex gap-4 items-start">
                  <span className="text-svp-muted shrink-0 w-16">{label}</span>
                  <span className="text-svp-dark font-medium font-mono text-right ml-auto">{val}</span>
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
                    A equipe está atualizando a lista de necessidades — toda doação é
                    bem-vinda! Na dúvida, fale conosco pelo WhatsApp.
                  </span>
                </li>
              )}
              {itensNecessarios.map((i, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <AlertTriangle
                    size={15}
                    className={`flex-shrink-0 ${i.nivel === "critico" ? "text-svp-sienna" : "text-svp-amber"}`}
                  />
                  <span className="text-svp-brown text-sm">{i.item}</span>
                  {i.nivel === "critico" ? (
                    <span className="badge-urgente ml-auto">urgente</span>
                  ) : (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wide text-svp-amber border border-svp-amber/40 rounded-full px-2 py-0.5">
                      atenção
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-svp-muted text-xs mt-5 border-t border-svp-border pt-4">
              Lista atualizada pela equipe do Albergue.{" "}
              <strong className="text-svp-sienna">Urgente</strong> = abaixo do estoque mínimo ·{" "}
              <strong className="text-svp-amber">atenção</strong> = abaixo do recomendado.
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
              <p><span className="text-white/50">Endereço: </span>{info.endereco}</p>
              <p><span className="text-white/50">Recebemos doações: </span>{info.horarioDoacoes}</p>
              <p><span className="text-white/50">Pontos de coleta: </span>{info.pontosColeta}</p>
            </div>
            <a
              href={info.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-svp-forest font-semibold text-sm px-5 py-3 rounded-full hover:bg-svp-cream transition-colors"
            >
              Avisar que vou levar doação
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
