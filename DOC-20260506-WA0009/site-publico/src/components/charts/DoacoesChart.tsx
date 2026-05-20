"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PLACEHOLDER_DOACOES_MENSAIS } from "@/lib/dados-placeholder";

function formatReal(value: number) {
  return `R$ ${value.toLocaleString("pt-BR")}`;
}

export default function DoacoesChart() {
  return (
    <div className="bg-white rounded-2xl border border-svp-border p-6">
      <p className="text-svp-muted text-xs tracking-[0.18em] uppercase font-semibold mb-1">
        Doações em dinheiro
      </p>
      <p className="font-display text-2xl text-svp-dark font-semibold mb-6">
        Últimos 6 meses
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={PLACEHOLDER_DOACOES_MENSAIS} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDE4D3" vertical={false} />
          <XAxis
            dataKey="mes"
            tick={{ fill: "#8A7464", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: "#8A7464", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [formatReal(value), "Doações"]}
            contentStyle={{
              background: "#fff",
              border: "1px solid #D9CEBD",
              borderRadius: "10px",
              fontFamily: "var(--font-jakarta)",
              fontSize: "13px",
            }}
          />
          <Bar dataKey="valor" fill="#803320" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
