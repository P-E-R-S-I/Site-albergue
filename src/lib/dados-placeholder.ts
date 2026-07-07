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
  { item: "Fraldas Geriátricas (XG e G)", urgente: true },
  { item: "Shampoo e Condicionador", urgente: false },
  { item: "Hidratante corporal", urgente: false },
  { item: "Enxaguante bucal", urgente: false },
  { item: "Meias", urgente: false },
  { item: "Blusas de frio", urgente: false },
  { item: "Toalhas de banho", urgente: false },
  { item: "Lençóis", urgente: false },
];

// Fallback do FAQ — espelha o conteúdo canônico da tabela `faqs` no Supabase
// (groundtruth da visita de campo de 02–04/06/2026). Editar via app de gestão.
export const PLACEHOLDER_FAQ = [
  {
    pergunta: "Qual é o horário de visitas?",
    resposta:
      "As visitas são permitidas todos os dias, das 13h às 15h30, sem necessidade de agendamento. Em períodos de surto de viroses (como gripe ou Covid) as visitas são temporariamente suspensas para proteger a saúde dos residentes — na dúvida, confirme pelo WhatsApp antes de vir.",
  },
  {
    pergunta: "Quais itens o Albergue aceita como doação?",
    resposta:
      "Aceitamos alimentos não perecíveis, itens de higiene pessoal (shampoo, condicionador, hidratante, enxaguante bucal), fraldas geriátricas (principalmente tamanhos XG e G — nosso item mais urgente), roupas e calçados em bom estado, blusas de frio, meias, toalhas, roupas de cama, móveis, utensílios, cadeiras de rodas e medicamentos dentro do prazo de validade. Não aceitamos objetos cortantes ou perfurantes destinados aos moradores, por segurança.",
  },
  {
    pergunta: "Como faço para fazer uma doação em dinheiro?",
    resposta:
      "Aceitamos doações via Pix ou depósito bancário. A chave Pix é o CNPJ da instituição: 02.251.270/0001-09. Também é possível realizar depósito no Sicoob, agência 5014, conta corrente 6696, em nome da Associação de Beneficentes Albergue São Vicente de Paulo. Todas as doações são registradas e publicadas no nosso painel de transparência.",
  },
  {
    pergunta: "O Albergue aceita voluntários?",
    resposta:
      "Sim, o voluntariado é sempre muito bem-vindo! Hoje contamos com cerca de 100 voluntários — de barbeiros a grupos que preparam lanches para os residentes. Entre em contato pelo WhatsApp para conhecer as formas de contribuir com o seu tempo.",
  },
  {
    pergunta: "Posso encaminhar meu familiar para o Albergue?",
    resposta:
      "No momento o Albergue está com as vagas de moradia lotadas. Para futuras admissões, entre em contato pelo WhatsApp para verificar a disponibilidade e conhecer os critérios. O processo envolve avaliação social e de saúde.",
  },
  {
    pergunta: "Como funciona o acompanhamento médico dos residentes?",
    resposta:
      "Os residentes contam com acompanhamento de profissionais de saúde voluntários, como o atendimento odontológico semanal do Dr. Danilo. Medicamentos são administrados conforme prescrição médica e, em casos de emergência, os encaminhamentos adequados são acionados para garantir a segurança de cada morador.",
  },
  {
    pergunta: "Como posso acompanhar o uso das doações?",
    resposta:
      "Toda entrada e saída de estoque e movimentação financeira é registrada e publicada na nossa página de Transparência. Você pode acompanhar os gráficos de doações, gastos e nível de estoque mês a mês.",
  },
];

export const PLACEHOLDER_ESTATISTICAS = {
  idososAtendidos: 78,
  voluntariosAtivos: 100,
  anoFundacao: 1971,
  anosDeServico: new Date().getFullYear() - 1971,
  familiasBeneficiadas: 78,
};

// Fallback — espelha a tabela `site_config` no Supabase (groundtruth 02–04/06/2026).
// Editar via app de gestão; este objeto só aparece se o banco estiver inacessível.
export const PLACEHOLDER_INFO_ALBERGUE = {
  nome: "Albergue São Vicente de Paulo",
  endereco: "Rua Orozimbo Lopes de Carvalho, 1097, Dom Abel — Jataí, GO",
  telefone: "(64) 99983-9893",
  email: "financeiroalbergue@gmail.com",
  whatsapp: "https://wa.me/5564999839893",
  pixKey: "02.251.270/0001-09", // chave Pix = CNPJ
  cnpj: "02.251.270/0001-09",
  banco: "Sicoob",
  agencia: "5014",
  conta: "6696 (Conta Corrente)",
  titular: "Associação de Beneficentes Albergue São Vicente de Paulo",
  horarioFuncionamento: "24 horas por dia, 7 dias por semana",
  horarioVisitas: "Todos os dias: 13h às 15h30",
  horarioDoacoes: "Todos os dias: 8h às 11h e 13h às 17h",
  agendamentoVisitas: "Não é necessário agendar",
  restricaoVisitas:
    "Em períodos de surto de viroses (gripe, Covid) as visitas são temporariamente suspensas.",
  pontosColeta: "No próprio Albergue, na Autoescola 2000 (Centro) e no Varejão.",
  missao:
    "Oferecer acolhimento, cuidado e dignidade a idosos em situação de vulnerabilidade social, promovendo qualidade de vida com amor e respeito.",
  vinculo: "Instituição filantrópica de orientação espírita.",
};
