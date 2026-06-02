// =============================================
// DADOS PLACEHOLDER — substituir pelos dados reais do Supabase
// quando a Frente 1 (Núcleo de Dados) disponibilizar a API
// =============================================

export const PLACEHOLDER_DOACOES_MENSAIS = [
  { mes: "Nov/25", valor: 3200, itens: 47 },
  { mes: "Dez/25", valor: 5800, itens: 92 },
  { mes: "Jan/26", valor: 2900, itens: 38 },
  { mes: "Fev/26", valor: 4100, itens: 61 },
  { mes: "Mar/26", valor: 3750, itens: 55 },
  { mes: "Abr/26", valor: 4900, itens: 74 },
];

export const PLACEHOLDER_GASTOS_MENSAIS = [
  { mes: "Nov/25", alimentacao: 1800, higiene: 620, medicamentos: 950, utilidades: 480, manutencao: 400 },
  { mes: "Dez/25", alimentacao: 2100, higiene: 780, medicamentos: 1100, utilidades: 520, manutencao: 300 },
  { mes: "Jan/26", alimentacao: 1950, higiene: 680, medicamentos: 870, utilidades: 500, manutencao: 550 },
  { mes: "Fev/26", alimentacao: 2000, higiene: 700, medicamentos: 990, utilidades: 460, manutencao: 280 },
  { mes: "Mar/26", alimentacao: 2200, higiene: 740, medicamentos: 1050, utilidades: 540, manutencao: 410 },
  { mes: "Abr/26", alimentacao: 2100, higiene: 690, medicamentos: 920, utilidades: 510, manutencao: 360 },
];

export const PLACEHOLDER_ESTOQUE = [
  { item: "Fraldas Geriátricas (G)", quantidade: 320, unidade: "un", minimo: 100 },
  { item: "Arroz (5kg)", quantidade: 28, unidade: "pct", minimo: 15 },
  { item: "Feijão (1kg)", quantidade: 45, unidade: "pct", minimo: 20 },
  { item: "Sabonete", quantidade: 87, unidade: "un", minimo: 30 },
  { item: "Shampoo 400ml", quantidade: 22, unidade: "un", minimo: 15 },
  { item: "Creme Dental", quantidade: 19, unidade: "un", minimo: 20 },
  { item: "Papel Higiênico (12un)", quantidade: 14, unidade: "pct", minimo: 10 },
  { item: "Óleo de Cozinha (900ml)", quantidade: 11, unidade: "un", minimo: 8 },
];

export const PLACEHOLDER_ITENS_MAIS_NECESSARIOS = [
  { item: "Fraldas Geriátricas tamanho G e EG", urgente: true },
  { item: "Creme Dental e Escova de Dentes", urgente: true },
  { item: "Sabonete e Shampoo neutro", urgente: false },
  { item: "Arroz, feijão e macarrão", urgente: false },
  { item: "Óleo de cozinha (qualquer marca)", urgente: false },
  { item: "Absorventes geriátricos", urgente: true },
  { item: "Cobertores e travesseiros", urgente: false },
  { item: "Medicamentos: analgésicos e antissépticos", urgente: true },
];

export const PLACEHOLDER_FAQ = [
  {
    pergunta: "Qual é o horário de visitas?",
    resposta:
      "As visitas são permitidas de segunda a sexta, das 9h às 11h e das 14h às 17h. Aos finais de semana, das 10h às 16h. Pedimos que agende com antecedência pelo WhatsApp para garantir que o residente esteja disponível.",
  },
  {
    pergunta: "Quais itens o Albergue aceita como doação?",
    resposta:
      "Aceitamos alimentos não perecíveis (arroz, feijão, macarrão, óleo, açúcar), itens de higiene pessoal (sabonete, shampoo, creme dental, fraldas geriátricas), roupas em bom estado, cobertores e medicamentos dentro do prazo de validade. Não aceitamos alimentos vencidos ou itens danificados.",
  },
  {
    pergunta: "Como faço para fazer uma doação em dinheiro?",
    resposta:
      "Aceitamos transferências via Pix, TED ou depósito bancário. A chave Pix está disponível na página 'Como Doar'. Todas as doações financeiras são registradas e publicadas mensalmente no nosso painel de transparência.",
  },
  {
    pergunta: "O Albergue aceita voluntários?",
    resposta:
      "Sim! Temos programas de voluntariado nas áreas de recreação, apoio administrativo e acompanhamento dos idosos. Entre em contato pelo WhatsApp para conhecer as oportunidades disponíveis e agendar uma conversa com nossa equipe.",
  },
  {
    pergunta: "Posso levar meu familiar para o Albergue?",
    resposta:
      "O Albergue atende idosos em situação de vulnerabilidade social. O processo de ingresso envolve avaliação social e médica. Entre em contato conosco pelo WhatsApp ou telefone para agendar uma visita de avaliação.",
  },
  {
    pergunta: "Como funciona o acompanhamento médico dos residentes?",
    resposta:
      "Contamos com visitas periódicas de médicos e enfermeiros. Medicamentos controlados são administrados conforme prescrição médica, e todo o histórico é registrado. Em casos de emergência, acionamos o SAMU e mantemos a família informada.",
  },
  {
    pergunta: "Como posso acompanhar o uso das doações?",
    resposta:
      "Toda entrada e saída de estoque e financeiro é registrada e publicada na nossa página de Transparência. Você pode ver os gráficos de doações, gastos e nível de estoque em tempo real, mês a mês.",
  },
];

export const PLACEHOLDER_ESTATISTICAS = {
  idososAtendidos: 80,
  voluntariosAtivos: 24,
  anosDeServico: 12,
  familiasBeneficiadas: 68,
};

export const PLACEHOLDER_INFO_ALBERGUE = {
  nome: "Albergue São Vicente de Paula",
  endereco: "Sit Betânia, 1, Zona Rural — Jataí, GO, 75800-000",
  telefone: "(64) 9XXXX-XXXX",
  whatsapp: "https://wa.me/5564900000000",
  pixKey: "02.251.270/0001-09", // CNPJ
  horarioFuncionamento: "24 horas por dia, 7 dias por semana",
  horarioVisitas: "Seg–Sex: 9h–11h e 14h–17h | Sáb–Dom: 10h–16h",
  missao:
    "Oferecer acolhimento, cuidado e dignidade a idosos em situação de vulnerabilidade social, promovendo qualidade de vida com amor e respeito.",
};
