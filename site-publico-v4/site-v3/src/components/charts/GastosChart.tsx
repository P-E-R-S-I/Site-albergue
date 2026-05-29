"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PLACEHOLDER_GASTOS_MENSAIS } from "@/lib/dados-placeholder";

const CORES = {
  alimentacao: "#803320",
  higiene:     "#B8892A",
  medicamentos:"#2D5A27",
  manutencao:  "#8A7464",
};

const LABELS: Record<string, string> = {
  alimentacao:  "Alimentação",
  higiene:      "Higiene",
  medicamentos: "Medicamentos",
  manutencao:   "Manutenção",
};

export default function GastosChart() {
  return (
    <div className="bg-white rounded-2xl border border-svp-border p-6">
      <p className="text-svp-muted text-xs tracking-[0.18em] uppercase font-semibold mb-1">
        Gastos por categoria
      </p>
      <p className="font-display text-2xl text-svp-dark font-semibold mb-6">
        Últimos 6 meses
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={PLACEHOLDER_GASTOS_MENSAIS}>
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
            formatter={(value: number, name: string) => [
              `R$ ${value.toLocaleString("pt-BR")}`,
              LABELS[name] ?? name,
            ]}
            contentStyle={{
              background: "#fff",
              border: "1px solid #D9CEBD",
              borderRadius: "10px",
              fontFamily: "var(--font-jakarta)",
              fontSize: "13px",
            }}
          />
          <Legend
            formatter={(value) => LABELS[value] ?? value}
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
          />
          {Object.entries(CORES).map(([key, color]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={color}
              fill={color}
              fillOpacity={0.65}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
