"use client";

import { useState } from "react";
import { Copy, Check, Heart, X, Sparkles } from "lucide-react";

export default function PixCopyButton({ pixKey }: { pixKey: string }) {
  const [copied, setCopied] = useState(false);
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);
  const [showThanksPopup, setShowThanksPopup] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
    } catch {
      const el = document.createElement("textarea");
      el.value = pixKey;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setShowCopiedPopup(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPix = () => {
    setShowCopiedPopup(false);
    setShowThanksPopup(true);
  };

  return (
    <>
      {/* Botão de copiar */}
      <button
        onClick={handleCopy}
        title="Copiar chave Pix"
        className="w-full bg-svp-linen rounded-xl p-4 flex items-center justify-between gap-3 hover:bg-svp-border/60 transition-colors group"
      >
        <div className="text-left">
          <p className="text-svp-muted text-xs mb-1">Chave Pix (CNPJ)</p>
          <p className="font-mono text-svp-dark font-semibold text-sm">{pixKey}</p>
        </div>
        <div
          className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 transition-colors ${
            copied
              ? "bg-svp-forest border-svp-forest text-white"
              : "bg-svp-cream border-svp-border text-svp-muted group-hover:border-svp-sienna group-hover:text-svp-sienna"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </div>
      </button>

      {/* ── Pop-up 1: Chave copiada ── */}
      {showCopiedPopup && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowCopiedPopup(false)}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10"
            style={{ animation: "slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both" }}>

            {/* Fechar */}
            <button
              onClick={() => setShowCopiedPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-svp-muted hover:text-svp-dark hover:bg-svp-linen transition-colors"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {/* Ícone */}
            <div className="w-12 h-12 bg-svp-forest/10 rounded-full flex items-center justify-center mb-4">
              <Check size={22} className="text-svp-forest" />
            </div>

            <h3 className="font-display text-xl text-svp-dark font-semibold mb-1">
              Chave copiada!
            </h3>
            <p className="text-svp-brown text-sm leading-relaxed mb-5">
              Agora é só abrir o app do seu banco, escolher <strong>Pix</strong> e colar a chave.
              Qualquer valor faz diferença. 💚
            </p>

            {/* Botão de confirmação */}
            <button
              onClick={handleConfirmPix}
              className="w-full flex items-center justify-center gap-2 bg-svp-sienna text-white font-semibold text-sm px-5 py-3 rounded-full hover:bg-svp-rose transition-colors"
            >
              <Heart size={15} />
              Já fiz o Pix!
            </button>

            <button
              onClick={() => setShowCopiedPopup(false)}
              className="w-full text-center text-svp-muted text-xs mt-3 hover:text-svp-dark transition-colors"
            >
              Vou fazer depois
            </button>
          </div>
        </div>
      )}

      {/* ── Pop-up 2: Agradecimento ── */}
      {showThanksPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowThanksPopup(false)}
          />

          <div
            className="relative bg-svp-cream rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 text-center overflow-hidden"
            style={{ animation: "slideUp 0.4s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {/* Fundo decorativo */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(128,51,32,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Fechar */}
            <button
              onClick={() => setShowThanksPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-svp-muted hover:text-svp-dark hover:bg-svp-linen transition-colors z-10"
              aria-label="Fechar"
            >
              <X size={16} />
            </button>

            {/* Ícone principal */}
            <div className="relative z-10 w-20 h-20 bg-svp-sienna rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart size={32} className="text-white fill-white" />
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-svp-amber rounded-full flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-svp-amber text-xs tracking-[0.22em] uppercase font-semibold mb-2">
                Muito obrigado
              </p>
              <h3 className="font-display text-3xl text-svp-dark font-semibold mb-4 leading-tight">
                Sua doação transforma{" "}
                <em className="text-svp-sienna">vidas.</em>
              </h3>
              <p className="text-svp-brown text-sm leading-relaxed mb-6">
                Cada contribuição chega diretamente aos nossos idosos — em forma de
                alimento, cuidado e dignidade. O Albergue São Vicente de Paulo agradece
                de coração.
              </p>

              {/* Estatísticas rápidas */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { num: "78", label: "idosos acolhidos" },
                  { num: "55", label: "anos de história" },
                  { num: "100%", label: "transparência" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-2xl p-3 border border-svp-border"
                  >
                    <p className="font-display text-xl text-svp-sienna font-bold">{item.num}</p>
                    <p className="text-svp-muted text-[10px] leading-tight mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-svp-muted text-xs leading-relaxed mb-5">
                Acompanhe o uso da sua doação no nosso{" "}
                <a
                  href="/transparencia"
                  className="text-svp-sienna underline"
                  onClick={() => setShowThanksPopup(false)}
                >
                  painel de transparência
                </a>
                .
              </p>

              <button
                onClick={() => setShowThanksPopup(false)}
                className="w-full flex items-center justify-center bg-svp-sienna text-white font-semibold text-sm px-5 py-3 rounded-full hover:bg-svp-rose transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
