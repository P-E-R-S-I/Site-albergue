"use client";

// =============================================================================
// RealtimeRefresher
// Assina mudanças nas tabelas-ledger do Supabase e dá router.refresh() quando
// algo muda. Como as páginas são `force-dynamic`, o refresh re-busca as views no
// servidor e os cards/gráficos sobem ao vivo — sem reload de página.
//
// Uso: <RealtimeRefresher /> em qualquer página dinâmica (transparencia, como-doar).
// O doador com a página aberta vê a doação Pix / o estoque mudarem na hora em que
// a equipe confirma o lançamento no app de gestão.
// =============================================================================

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase, USE_MOCK } from "@/lib/supabase";

const TABELAS = ["eventos_financeiro", "eventos_estoque"];

export default function RealtimeRefresher() {
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (USE_MOCK) return; // sem banco configurado, nada a ouvir

    // Debounce: agrupa rajadas de eventos num único refresh.
    const agendarRefresh = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => router.refresh(), 800);
    };

    const canal = supabase.channel("site-publico-realtime");
    for (const tabela of TABELAS) {
      canal.on(
        "postgres_changes",
        { event: "*", schema: "public", table: tabela },
        agendarRefresh
      );
    }
    canal.subscribe();

    return () => {
      if (timer.current) clearTimeout(timer.current);
      supabase.removeChannel(canal);
    };
  }, [router]);

  return null;
}
