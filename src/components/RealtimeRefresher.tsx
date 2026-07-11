"use client";

// =============================================================================
// RealtimeRefresher
// Assina mudanças nas tabelas-ledger do Supabase e dá router.refresh() quando
// algo muda — um "empurrão" pra tentar mostrar a mudança na hora. As páginas
// agora usam cache de 30s (revalidate = 30) em vez de force-dynamic, então na
// pior das hipóteses (se o refresh não pegar dado novo por algum motivo) a
// mudança aparece sozinha em até 30s de qualquer forma.
//
// Uso: <RealtimeRefresher /> em qualquer página dinâmica (transparencia, como-doar).
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
