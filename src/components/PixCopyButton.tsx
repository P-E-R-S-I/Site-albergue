"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function PixCopyButton({ pixKey }: { pixKey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback para browsers sem clipboard API
      const el = document.createElement("textarea");
      el.value = pixKey;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
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
  );
}
