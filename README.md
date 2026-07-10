# Albergue São Vicente de Paulo — Site Público

Site público de transparência e divulgação do Albergue São Vicente de Paulo.  
Projeto de extensão universitária — Bacharelado em Inteligência Artificial, UFJ.

**Frente 3** do projeto de extensão (de 4 frentes no total).  
Consome dados da **Frente 1 (Núcleo de Dados / Supabase)** via API pública.

---

## Visão Geral

O site tem dois objetivos principais:

1. **Transparência pública** — mostrar para doadores e a comunidade o que o Albergue recebe, gasta e o que mais precisa, com dados em tempo real via Supabase.
2. **Captação de doações** — apresentar o Albergue, explicar como doar (Pix, itens físicos, voluntariado) e facilitar o contato.

Desde a última atualização, o site deixou de depender apenas de `dados-placeholder.ts` para as informações institucionais: endereço, telefone, WhatsApp, chave Pix, dados bancários, horários, missão e estatísticas de impacto agora são lidos em tempo real da tabela `site_config` do Supabase (populada pelo app de gestão da Frente 1), com o placeholder atuando só como fallback caso o banco esteja inacessível.

Enquanto a Frente 1 não disponibiliza o banco de dados conectado, o site opera em **modo placeholder** (dados de exemplo embutidos no código), sem quebrar nenhuma funcionalidade.

---

## Stack Tecnológica

| Tecnologia             | Versão    | Função                                                |
|------------------------|-----------|-------------------------------------------------------|
| Next.js                | 15.x      | Framework React com App Router (SSR + RSC)            |
| React                  | 19.x      | Biblioteca de interface                               |
| TypeScript             | 5.x       | Tipagem estática em todo o projeto                    |
| Tailwind CSS           | 3.4.x     | Estilização via classes utilitárias                   |
| Recharts               | 2.13.x    | Gráficos de transparência (barras e áreas empilhadas) |
| @supabase/supabase-js  | 2.47.x    | Cliente para consumir a API da Frente 1               |
| Lucide React           | 0.468.x   | Ícones vetoriais                                      |
| Netlify                | —         | Hospedagem (plano gratuito, via plugin Next.js)       |

---

## Estrutura Completa de Pastas

```
Site-albergue-main/
│
├── public/                         # Arquivos estáticos servidos diretamente
│   ├── logo.png                    # Logo do Albergue (usada no Header e Footer)
│   ├── foto-hero.jpg               # Foto institucional — aparece no Hero e como poster do vídeo
│   ├── og-image.jpg                # Imagem Open Graph (1200×630px) — aparece no preview do WhatsApp/Instagram
│   ├── tour.mp4                    # Vídeo tour do Albergue (aparece abaixo dos botões do Hero)
│   ├── qr-pix.png                  # QR Code Pix real do Albergue (página /como-doar)
│   ├── favicon.ico                 # Favicon do site (48×48px)
│   ├── apple-icon.png              # Ícone para dispositivos Apple (180×180px)
│   ├── icon-192.png                # Ícone para PWA/Android (192×192px)
│   ├── icon-512.png                # Ícone para PWA/Android em alta resolução (512×512px)
│   ├── insta-1.jpg                 # Foto 1 do carrossel Instagram
│   ├── insta-2.jpg                 # Foto 2 do carrossel Instagram
│   ├── insta-3.webp                # Foto 3 do carrossel Instagram
│   ├── insta-4.webp                # Foto 4 do carrossel Instagram
│   ├── insta-5.webp                # Foto 5 do carrossel Instagram
│   └── insta-6.webp                # Foto 6 do carrossel Instagram
│
├── src/
│   ├── app/                        # Páginas (Next.js App Router)
│   │   ├── layout.tsx              # Layout raiz: importa globals.css, monta Header + Footer + ScrollAnimator.
│   │   │                           # Define metadados SEO/OG base via buildMetadata() de src/lib/seo.ts
│   │   ├── globals.css             # Estilos globais, variáveis CSS, fontes, animações, classes customizadas
│   │   ├── page.tsx                # Página inicial "/"
│   │   ├── como-doar/
│   │   │   └── page.tsx            # Página "/como-doar" — doação em dinheiro e itens físicos
│   │   ├── transparencia/
│   │   │   └── page.tsx            # Página "/transparencia" — gráficos e painel de dados
│   │   └── faq/
│   │       └── page.tsx            # Página "/faq" — perguntas frequentes com accordion
│   │
│   ├── components/
│   │   ├── Header.tsx              # Cabeçalho fixo. Recebe `whatsapp` como prop (vem do site_config via
│   │   │                           # layout.tsx) — logo, navegação desktop e menu hamburguer mobile
│   │   ├── Footer.tsx              # Rodapé. Recebe `info: InfoAlbergue` como prop — missão, endereço,
│   │   │                           # telefone, e-mail, horários e vínculo institucional, tudo dinâmico
│   │   ├── ActionBarMobile.tsx     # Barra fixa no rodapé, visível só no mobile (`lg:hidden`): botão
│   │   │                           # "Doar agora" + atalho para o WhatsApp. Recebe `whatsapp` como prop
│   │   ├── ScrollAnimator.tsx      # Componente cliente: anima elementos [data-animate] ao entrar na tela
│   │   │                           # e controla a barra de progresso de scroll (#scroll-progress)
│   │   ├── PixCopyButton.tsx       # Botão que copia a chave Pix (recebida via prop `pixKey`, vinda do
│   │   │                           # site_config). Exibe Pop-up 1 ("Chave copiada!")
│   │   │                           # e Pop-up 2 (agradecimento completo com estatísticas do Albergue)
│   │   ├── RealtimeRefresher.tsx   # Componente cliente: assina mudanças no Supabase e chama router.refresh()
│   │   │                           # para atualizar dados sem reload — usado nas páginas dinâmicas
│   │   ├── ZoomWordSection.tsx     # Seção de efeito parallax/zoom na palavra "Dignidade" ao rolar a página
│   │   │
│   │   ├── sections/               # Seções da página inicial (cada uma é um bloco visual independente)
│   │   │   ├── Hero.tsx            # Seção Hero. Recebe `info`, `stats` e `doacaoMes` (já formatado em BRL
│   │   │   │                       # pelo servidor) como props. Título, botões CTA, "card de info rápida"
│   │   │   │                       # (endereço/visitas/telefone/doações) e card "Este mês" com o total
│   │   │   │                       # arrecadado, exibido só quando há doações no mês corrente
│   │   │   ├── Estatisticas.tsx    # 4 contadores animados (idosos, voluntários, anos, famílias). Recebe
│   │   │   │                       # `stats: EstatisticasAlbergue` como prop — os números vêm do site_config
│   │   │   ├── Missao.tsx          # Texto da missão + 3 cards dos pilares (Cuidado, Transparência, Comunidade)
│   │   │   ├── Depoimentos.tsx     # Carrossel automático de depoimentos (troca a cada 5s)
│   │   │   ├── ComoAjudar.tsx      # 3 cards das formas de ajudar (dinheiro, itens, voluntariado). Recebe
│   │   │   │                       # `whatsapp` como prop para o card de voluntariado
│   │   │   ├── InstagramCarrossel.tsx  # Grade 3 colunas no desktop; carrossel com setas no mobile
│   │   │   └── FAQAccordion.tsx    # Accordion de perguntas e respostas (recebe lista de FAQs como prop)
│   │   │
│   │   └── charts/                 # Gráficos Recharts — usados na página /transparencia
│   │       ├── DoacoesChart.tsx    # Gráfico de barras: doações em dinheiro por mês (últimos 6 meses)
│   │       ├── GastosChart.tsx     # Gráfico de área empilhada: gastos por categoria por mês
│   │       └── EstoqueChart.tsx    # Barras de progresso: nível atual de cada item em estoque
│   │
│   └── lib/
│       ├── seo.ts                  # Função buildMetadata() — monta Open Graph + Twitter Card completos.
│       │                           # Centraliza domínio, nome do site e imagem OG para evitar que páginas
│       │                           # internas percam a imagem de compartilhamento (comportamento do Next.js
│       │                           # App Router onde openGraph de página sobrescreve o do layout pai)
│       ├── supabase.ts             # Cliente Supabase + todas as funções de leitura de dados do banco.
│       │                           # Inclui fallback automático para placeholder se as variáveis de ambiente
│       │                           # não estiverem configuradas (modo mock/desenvolvimento offline).
│       │                           # Inclui também getInfoAlbergue() e getEstatisticas(), que leem a
│       │                           # tabela `site_config` (chave/valor) e alimentam Header, Footer,
│       │                           # ActionBarMobile e todas as páginas com dados institucionais dinâmicos
│       └── dados-placeholder.ts    # Dados de exemplo usados enquanto o banco real não está conectado.
│                                   # Inclui: doações mensais, gastos, estoque, itens necessários, FAQs
│                                   # (conteúdo real da visita de campo de 02–04/06/2026), estatísticas de
│                                   # impacto (PLACEHOLDER_ESTATISTICAS) e informações institucionais
│                                   # completas (PLACEHOLDER_INFO_ALBERGUE — espelha a tabela site_config)
│
├── .env.local.example              # Modelo de variáveis de ambiente — copiar para .env.local
├── .gitignore                      # Ignora node_modules, .env.local, .next, etc.
├── next.config.ts                  # Configuração do Next.js (permite imagens externas do Unsplash e placehold.co)
├── tailwind.config.ts              # Paleta de cores SVP, fontes e animações customizadas
├── postcss.config.mjs              # Configuração padrão do PostCSS para o Tailwind
├── tsconfig.json                   # Configuração do TypeScript com alias @/ apontando para src/
├── netlify.toml                    # Configuração de deploy na Netlify (build command + plugin Next.js)
├── package.json                    # Dependências e scripts do projeto
└── package-lock.json               # Lockfile das dependências (não editar manualmente)
```

---

## O que cada Página contém

### `/` — Página Inicial (`src/app/page.tsx`)

Busca `getInfoAlbergue()`, `getEstatisticas()` e `getDoacoesMensais()` em paralelo no servidor. A partir da última doação registrada, calcula (ainda no servidor, para evitar divergência de hidratação) se o mês corrente já tem doações lançadas — se sim, exibe o card "Este mês" no Hero.

Composta pelas seguintes seções, de cima para baixo:

1. **Hero** — Título, parágrafo da missão (dinâmico, vindo de `info.missao`), botões "Quero fazer uma doação" e "Ver transparência", card de informações rápidas (endereço, horário de visitas, telefone, horário de doações — todos vindos do `site_config`), card "Este mês" com total arrecadado (quando aplicável), e indicadores de impacto (`stats`).
2. **Estatisticas** — 4 contadores animados com ícones, alimentados por `getEstatisticas()`.
3. **Missao** — Texto descritivo + 3 cards dos pilares da instituição.
4. **ZoomWordSection** — Efeito visual com a palavra "Dignidade" crescendo ao rolar (ocupa 250vh de altura).
5. **Depoimentos** — Carrossel automático com 4 depoimentos reais.
6. **ComoAjudar** — Cards de doação em dinheiro, itens físicos e voluntariado.
7. **InstagramCarrossel** — 6 fotos do perfil do Instagram, linkadas para o perfil.
8. **Localização** — Endereço, telefone e horário + mapa embutido do Google Maps, gerado dinamicamente a partir de `info.endereco` (`encodeURIComponent` na URL do embed — se o endereço mudar no `site_config`, o mapa acompanha automaticamente).
9. **Faixa CTA final** — Chamada para ação com links para /como-doar e /transparencia.

---

### `/como-doar` — Como Doar (`src/app/como-doar/page.tsx`)

Renderização dinâmica (`force-dynamic`) — não é cacheada para sempre refletir o estoque atual. Busca `getItensNecessarios()` e `getInfoAlbergue()` em paralelo.

- **Coluna 1 — Doação em dinheiro:** QR Code Pix (só é exibido se `info.pixKey` bater exatamente com a chave codificada na imagem estática `qr-pix.png` — evita mostrar um QR desatualizado se a chave for trocada no app de gestão), botão de copiar chave Pix (`PixCopyButton` recebe `pixKey` como prop), e dados bancários para depósito — banco, agência, conta, CNPJ e titular, todos lidos de `info` (dinâmico via `site_config`).
- **Coluna 2 — Itens físicos:** Lista dos itens mais necessários no momento (`getItensNecessarios()`), com dois níveis de urgência: badge **"urgente"** para itens com `nivel: "critico"` (abaixo do estoque mínimo) e badge **"atenção"** para `nivel: "atencao"` (abaixo do recomendado, mas acima do mínimo). Inclui endereço, horário de recebimento de doações e pontos de coleta (`info.pontosColeta`), todos dinâmicos.
- Contém `<RealtimeRefresher />` para atualizar a lista de itens ao vivo quando o banco muda.

---

### `/transparencia` — Transparência (`src/app/transparencia/page.tsx`)

Renderização dinâmica (`force-dynamic`).

- **4 cards de resumo do mês:** Doações em dinheiro, Gastos totais, Saldo do mês, Itens recebidos.
- **Gráfico de Doações** (`DoacoesChart`) — barras dos últimos 6 meses.
- **Gráfico de Gastos** (`GastosChart`) — área empilhada por categoria (alimentação, higiene, medicamentos, utilidades, manutenção).
- **Gráfico de Estoque** (`EstoqueChart`) — barras de progresso mostrando nível atual de cada item, coloridas por três faixas: vermelho (`crítico`, abaixo de `minimo`), âmbar (`atenção`, abaixo de `recomendado`, que se não vier do banco assume `minimo × 2`) e verde (nível confortável).
- **Seção explicativa** sobre como funciona o sistema de registro (banco de dados ledger).
- Banner amarelo quando em modo mock, banner verde quando conectado ao banco real.
- Contém `<RealtimeRefresher />` para atualizar os dados ao vivo.

---

### `/faq` — Perguntas Frequentes (`src/app/faq/page.tsx`)

Renderização dinâmica (`force-dynamic`).

- Accordion de perguntas e respostas, carregadas do Supabase via `getFaqs()` (ou do placeholder). Busca `getFaqs()` e `getInfoAlbergue()` em paralelo.
- 7 perguntas no placeholder (conteúdo real coletado na visita de campo de 02–04/06/2026): horários de visita, o que o Albergue aceita como doação, como fazer Pix, voluntariado, vagas de moradia, acompanhamento médico dos residentes e como acompanhar o uso das doações.
- Card de CTA no final para falar com a equipe pelo WhatsApp — link dinâmico via `info.whatsapp`.

---

## Identidade Visual

A paleta de cores está definida no `tailwind.config.ts` com o prefixo `svp-`:

| Token Tailwind  | Valor hex   | Uso                                        |
|-----------------|-------------|--------------------------------------------|
| `svp-cream`     | `#F6EFE3`   | Fundo principal quente                     |
| `svp-linen`     | `#EDE4D3`   | Fundo de seções alternadas / cards         |
| `svp-sienna`    | `#803320`   | Cor primária — terracota escuro            |
| `svp-rose`      | `#A8492D`   | Terracota claro — hover da cor primária    |
| `svp-forest`    | `#2D5A27`   | Cor secundária — verde floresta            |
| `svp-sage`      | `#4A7E43`   | Verde claro — hover da cor secundária      |
| `svp-amber`     | `#B8892A`   | Destaque — dourado âmbar                   |
| `svp-gold`      | `#E8C06A`   | Dourado claro — acento sobre fundos escuros (Hero, Header) |
| `svp-dark`      | `#18120B`   | Quase-preto quente (fundos escuros, texto) |
| `svp-brown`     | `#4A3728`   | Marrom médio (texto de parágrafos)         |
| `svp-muted`     | `#8A7464`   | Texto secundário / legendas                |
| `svp-border`    | `#D9CEBD`   | Bordas suaves                              |

> **Importante:** o Tailwind v3 só gera classes de opacidade em múltiplos de 5 (ex: `/5`, `/10`, `/20`…). Não usar valores como `/3` ou `/6` — eles não geram CSS e o efeito simplesmente não aparece.

**Fontes:**
- **Lora** (serif) — títulos, citações e textos de destaque (`font-display`)
- **Plus Jakarta Sans** (sans-serif) — corpo de texto, botões, labels (`font-body`)

Ambas são carregadas via Google Fonts no `globals.css`.

---

## Animações e Efeitos Visuais

| Efeito | Como funciona | Onde é usado |
|---|---|---|
| **Fade-up ao rolar** | Elementos com `data-animate` começam invisíveis e surgem ao entrar na viewport via `IntersectionObserver` | Praticamente todas as seções |
| **Atraso escalonado** | `data-delay="1"` a `data-delay="5"` adicionam delay de 0.1s a 0.5s | Grupos de elementos em sequência |
| **Barra de progresso de scroll** | Div `#scroll-progress` no topo cresce conforme o usuário rola | Toda a aplicação (via `ScrollAnimator`) |
| **Parallax no Hero** | O fundo se move a 30% da velocidade de scroll via `transform: translateY` | `Hero.tsx` |
| **Zoom ao rolar ("Dignidade")** | A palavra cresce de 56px a 160px numa seção sticky de 250vh | `ZoomWordSection.tsx` |
| **Contador animado** | Números contam do zero ao valor real ao entrar na viewport | `Estatisticas.tsx` |
| **Carrossel de depoimentos** | Troca automaticamente a cada 5 segundos, com dots de navegação clicáveis | `Depoimentos.tsx` |
| **Carrossel Instagram** | Grade 3 colunas no desktop; carrossel com setas e dots no mobile | `InstagramCarrossel.tsx` |

---

## Barra de Ação Mobile

`src/components/ActionBarMobile.tsx` é uma barra fixa (`fixed inset-x-0 bottom-0`) no rodapé da tela, visível **só no mobile** (`lg:hidden` — some no desktop). Contém dois botões lado a lado: **"Doar agora"** (leva para `/como-doar`) e **WhatsApp** (link direto vindo de `info.whatsapp`).

Renderizada uma única vez no `layout.tsx`, então aparece em todas as páginas. Para que o conteúdo da página não fique escondido atrás da barra, o `<body>` recebe `pb-[68px] lg:pb-0` — o padding reserva exatamente a altura da barra no mobile e é removido no desktop.

---

## SEO e Open Graph

**SEO** são as configurações que fazem o site aparecer bem no Google.

**Open Graph** define o preview que aparece ao compartilhar o link em redes sociais — a foto, o título e a descrição que surgem automaticamente no WhatsApp, Instagram, etc.

### Como está organizado

Toda a lógica de SEO/OG foi centralizada em `src/lib/seo.ts` via a função `buildMetadata()`. **Isso é necessário** porque no Next.js App Router, se uma página define seu próprio campo `openGraph`, ele **substitui por completo** o do layout pai em vez de se mesclar. Sem esse helper, qualquer página interna perderia a imagem de compartilhamento.

```typescript
// src/lib/seo.ts
export const SITE_URL = "https://site-albergue-sao-vincente.netlify.app";
export const SITE_NAME = "Albergue São Vicente de Paulo";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Voluntários do Albergue São Vicente de Paulo organizando cestas de doação",
};
```

Cada página chama `buildMetadata()` com seu próprio título e descrição:

```typescript
// Exemplo: src/app/como-doar/page.tsx
export const metadata: Metadata = buildMetadata({
  title: "Como Doar",
  description: "Saiba como fazer uma doação...",
  path: "/como-doar",
});
```

### A imagem Open Graph

A imagem `public/og-image.jpg` foi recortada das fotos institucionais do Albergue em **exatamente 1200×630px** — a proporção recomendada pelo protocolo Open Graph. Declarar dimensões que não batem com o arquivo real é a causa mais comum do preview não aparecer no WhatsApp.

> Se o domínio do site mudar (ex: domínio próprio), atualizar apenas a constante `SITE_URL` em `src/lib/seo.ts`. Todos os metadados do site atualizam automaticamente.

---

## Favicon e Ícones

Os ícones ficam **somente em `public/`** e são declarados via `metadata.icons` no `layout.tsx`:

| Arquivo | Localização | Uso |
|---|---|---|
| `favicon.ico` | `public/` | Ícone na aba do navegador (48×48px) |
| `apple-icon.png` | `public/` | Ícone ao salvar na tela inicial do iPhone (180×180px) |
| `icon-192.png` | `public/` | Ícone PWA para Android (192×192px) |
| `icon-512.png` | `public/` | Ícone PWA em alta resolução (512×512px) |

> **Atenção:** Não colocar `favicon.ico` ou `apple-icon.png` dentro de `src/app/`. O Next.js App Router trata arquivos com esses nomes nessa pasta como "metadata especial" e gera suas próprias tags `<link>`, sobrescrevendo a declaração `metadata.icons` do `layout.tsx`. Os arquivos em `public/` sempre chegam ao deploy do Netlify.

Se a logo do Albergue mudar, regenerar os ícones com Pillow (Python) apontando para a nova logo e substituir os arquivos em `public/`.

---

## Pop-up de Agradecimento Pós-Pix

O site não detecta automaticamente quando um Pix é concluído (exigiria integração paga com a API do banco). A solução usa o momento da cópia da chave como proxy:

1. Doador clica em copiar a chave Pix
2. **Pop-up 1** — "Chave copiada!" com instrução para abrir o app do banco + botão **"Já fiz o Pix!"**
3. Ao clicar em "Já fiz o Pix!", o **Pop-up 2** abre com agradecimento completo, 3 estatísticas do Albergue e link para o painel de transparência

Tudo encapsulado em `src/components/PixCopyButton.tsx`, que recebe a chave via prop `pixKey` (vinda de `info.pixKey`, dinâmico) em vez de ter a chave fixa no código — se a chave Pix mudar no app de gestão, o botão de copiar acompanha automaticamente. O QR Code estático em `public/qr-pix.png`, porém, só é exibido na página `/como-doar` quando `info.pixKey` bate com a chave que está codificada na imagem (ver seção da página `/como-doar` acima).

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18 ou superior
- npm (já vem com o Node.js)

### Passo a passo

```bash
# 1. Entre na pasta do projeto
cd Site-albergue-main

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local com as chaves do Supabase (fornecidas pela Frente 1)
# Se não tiver as chaves, deixe em branco — o site roda em modo placeholder

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

> **Modo placeholder (sem Supabase):** Se o `.env.local` não tiver as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`, o site usa os dados de `dados-placeholder.ts`. A página `/transparencia` exibe um banner amarelo avisando que são dados de demonstração.

### Build para produção

```bash
npm run build
npm run start
```

---

## Deploy na Netlify

O projeto já está configurado para deploy automático via `netlify.toml`.

### Passos para subir pela primeira vez

1. Faça push do código para um repositório no GitHub
2. Acesse [netlify.com](https://netlify.com) → **"Add new site" → "Import an existing project"**
3. Conecte ao GitHub e selecione o repositório
4. As configurações de build são detectadas automaticamente pelo `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
5. Vá em **Site configuration → Environment variables** e adicione:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<URL fornecida pela Frente 1>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<chave anon fornecida pela Frente 1>
   ```
6. Clique em **Deploy site**

> Sem as variáveis configuradas, o site em produção também rodará em modo placeholder — não quebra nada, mas os dados serão fictícios.

Após a configuração inicial, qualquer push para a branch principal dispara um redeploy automático.

---

## Integração com o Supabase (Frente 1)

### Modo mock/placeholder

O arquivo `src/lib/supabase.ts` exporta a constante `USE_MOCK`:

```typescript
export const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" || !supabaseUrl || !supabaseAnonKey;
```

Se `USE_MOCK` for `true`, todas as funções de dados importam de `dados-placeholder.ts` em vez de consultar o banco.

### Funções disponíveis em `supabase.ts`

| Função | View/Tabela consultada | O que retorna |
|---|---|---|
| `getEstoqueAtual()` | `view_estoque_atual` | Lista de itens com quantidade atual, categoria, mínimo e recomendado |
| `getDoacoesMensais()` | `view_doacoes_mensais` | Doações dos últimos 6 meses (dinheiro + itens) |
| `getGastosMensais()` | `view_gastos_mensais` | Gastos dos últimos 6 meses por categoria |
| `getFaqs()` | `faqs` | Perguntas e respostas com `ativo = true` |
| `getItensNecessarios()` | `view_itens_necessarios` | Itens com estoque baixo, cada um com `nivel: "critico" \| "atencao"` |
| `getInfoAlbergue()` | `site_config` | Dados institucionais completos (endereço, contato, dados bancários, horários, missão, vínculo) |
| `getEstatisticas()` | `site_config` | Estatísticas de impacto (idosos atendidos, voluntários, ano de fundação, famílias beneficiadas) |

Todas as funções têm fallback automático para placeholder em caso de erro no banco.

### Dados institucionais dinâmicos (`site_config`)

Diferente das views de doações/gastos/estoque (que vêm do ledger financeiro), as informações institucionais moram numa tabela simples de **chave/valor** chamada `site_config`, editável pelo app de gestão da equipe. `getSiteConfigMap()` busca essa tabela inteira de uma vez e é envolvida em `cache()` do React — isso deduplica a consulta entre o `layout.tsx` e a página que está sendo renderizada na mesma requisição, evitando duas idas ao banco para os mesmos dados.

`getInfoAlbergue()` e `getEstatisticas()` fazem o *merge* dessa tabela com o fallback de `dados-placeholder.ts`: cada campo individual cai no placeholder se a chave correspondente não existir no banco, então o site nunca fica com um campo vazio mesmo com uma configuração parcial.

Campos expostos por `getInfoAlbergue()` (interface `InfoAlbergue`): `nome`, `endereco`, `telefone`, `email`, `whatsapp`, `pixKey`, `cnpj`, `banco`, `agencia`, `conta`, `titular`, `horarioFuncionamento`, `horarioVisitas`, `horarioDoacoes`, `agendamentoVisitas`, `restricaoVisitas`, `pontosColeta`, `missao` e `vinculo`.

Campos expostos por `getEstatisticas()` (interface `EstatisticasAlbergue`): `idososAtendidos`, `voluntariosAtivos`, `anoFundacao`, `anosDeServico` (calculado a partir do ano atual, nunca vem do banco) e `familiasBeneficiadas`.

Esses dados alimentam `layout.tsx` (que repassa para `Header`, `Footer` e `ActionBarMobile`) e as quatro páginas (`page.tsx`, `como-doar`, `transparencia` só indiretamente via header/footer, e `faq`).

### Atualização em tempo real

O `RealtimeRefresher.tsx` escuta mudanças nas tabelas `eventos_financeiro` e `eventos_estoque` via Supabase Realtime. Quando algo muda, dispara `router.refresh()` com debounce de 800ms — o Next.js busca novos dados do servidor sem recarregar a página. Ativo em `/como-doar` e `/transparencia`.

### Variáveis de ambiente

```env
# Obrigatórias para conectar ao banco real
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Opcional — força modo placeholder mesmo com Supabase configurado
NEXT_PUBLIC_USE_MOCK=true
```

---

## Dados de Contato do Albergue

Em produção (com o Supabase real conectado), esses dados vêm da tabela `site_config` e são editados pela equipe pelo app de gestão — **não** pelo código do site. `src/lib/dados-placeholder.ts`, na constante `PLACEHOLDER_INFO_ALBERGUE`, serve apenas como **fallback** para quando o banco estiver inacessível ou em desenvolvimento local sem Supabase configurado. Os valores abaixo refletem o placeholder atual (groundtruth da visita de campo de 02–04/06/2026):

| Campo | Valor atual (placeholder) |
|---|---|
| Nome | Albergue São Vicente de Paulo |
| Endereço | Rua Orozimbo Lopes de Carvalho, 1097, Dom Abel — Jataí, GO |
| Telefone | (64) 99983-9893 |
| E-mail | financeiroalbergue@gmail.com |
| WhatsApp | https://wa.me/5564999839893 |
| Chave Pix | 02.251.270/0001-09 (CNPJ) |
| Banco / Agência / Conta | Sicoob, agência 5014, conta 6696 (Conta Corrente) |
| Titular | Associação de Beneficentes Albergue São Vicente de Paulo |
| Horário de funcionamento | 24 horas por dia, 7 dias por semana |
| Horário de visitas | Todos os dias: 13h às 15h30 |
| Horário de doações | Todos os dias: 8h às 11h e 13h às 17h |
| Agendamento de visitas | Não é necessário agendar |
| Restrição de visitas | Suspensas temporariamente em surtos de viroses (gripe, Covid) |
| Pontos de coleta | No próprio Albergue, na Autoescola 2000 (Centro) e no Varejão |
| Missão | Oferecer acolhimento, cuidado e dignidade a idosos em situação de vulnerabilidade social |
| Vínculo institucional | Instituição filantrópica de orientação espírita |
| Instagram | @vicentedepaulodejatai (link fixo em `Footer.tsx`, não faz parte do `site_config`) |

> **Atenção:** o endereço e o horário de doações mudaram desde a versão anterior do site (endereço era "Sit Betânia, 1, Zona Rural"; doações eram só de segunda a sexta). Se a Frente 1 ainda não populou o `site_config` com esses valores corrigidos, o site em produção pode estar exibindo dados desatualizados via placeholder até isso ser feito.
>
> O QR Code Pix (`public/qr-pix.png`) e o vídeo tour (`public/tour.mp4`) já são arquivos reais fornecidos pelo Albergue.

---

## Restrições Éticas

Regras para todos os colaboradores ao adicionar qualquer conteúdo ao site:

- ❌ **Nunca** exibir foto de idoso sozinho identificável
- ❌ **Nunca** exibir dados pessoais de residentes (nomes, históricos, condições de saúde)
- ✅ Fotos somente com voluntários, equipe ou grupos sem identificação individual dos residentes
- ✅ Estoque: mostrar apenas quantidades, nunca nomes de pessoas
- ✅ Financeiro: valores agregados por mês/categoria, nunca transações individuais com nomes

---

## To-do

### Alta prioridade

- [ ] **Confirmar views e tabelas do Supabase** — o código depende de `view_estoque_atual`, `view_doacoes_mensais`, `view_gastos_mensais`, `view_itens_necessarios`, `site_config` e da tabela `faqs`. A Frente 1 precisa confirmar que estão criadas e populadas

### Média prioridade

- [ ] **Levar o Instagram para o `site_config`** — hoje o link `@vicentedepaulodejatai` está fixo (hardcoded) em `Footer.tsx`; faz sentido migrar para uma chave do `site_config` como os outros dados de contato, para não precisar de novo deploy se o perfil mudar

### Concluído

- [x] **Conectar ao Supabase real** — adicionar `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no painel da Netlify
- [x] **Popular o `site_config` com os dados corrigidos** — endereço novo (Rua Orozimbo Lopes de Carvalho, 1097, Dom Abel) e horário de doações diário (8h–11h e 13h–17h todos os dias, não só dias úteis) já constam no banco real
- [x] **Rotacionar a chave Supabase** — a `ANON_KEY` real que estava em `.env.local.example` foi regenerada no painel do Supabase
- [x] **Atualizar fotos do carrossel Instagram** — arquivos `insta-1` a `insta-6` em `public/` atualizados com fotos mais recentes
- [x] **Revisar depoimentos** — a constante `DEPOIMENTOS` em `Depoimentos.tsx` foi revisada/expandida
- [x] **Dados institucionais dinâmicos via `site_config`** — `getInfoAlbergue()` e `getEstatisticas()` substituem os dados fixos por leitura em tempo real do banco (com fallback para `dados-placeholder.ts`), aplicados em `layout.tsx`, `Header`, `Footer`, `ActionBarMobile`, Hero, Estatísticas e nas páginas `/como-doar` e `/faq`
- [x] **Barra de ação fixa mobile** — `ActionBarMobile.tsx`, com CTA de doação e WhatsApp sempre visíveis no rodapé em telas pequenas
- [x] **Dois níveis de urgência no estoque** — `view_itens_necessarios` e `EstoqueChart` agora distinguem "crítico" (abaixo do mínimo) de "atenção" (abaixo do recomendado), em vez de um único booleano "urgente"
- [x] **Chave Pix e QR Code desacoplados do código** — `PixCopyButton` recebe `pixKey` como prop dinâmica; o QR Code estático só aparece quando bate com a chave configurada no banco
- [x] **SEO e Open Graph** — centralizado em `src/lib/seo.ts` com `buildMetadata()`. Domínio correto (`site-albergue-sao-vincente.netlify.app`), imagem `og-image.jpg` em 1200×630px real, Open Graph e Twitter Card completos em todas as 4 rotas
- [x] **Favicon** — arquivos em `public/` declarados via `metadata.icons` no `layout.tsx`; duplicatas removidas de `src/app/` para evitar conflito com o App Router
- [x] **Agradecimento pós-Pix** — dois pop-ups em `PixCopyButton.tsx`
- [x] **Google Maps** — mapa embutido na página inicial, gerado dinamicamente a partir do endereço em `site_config`
- [x] **Correção de classes Tailwind inválidas** — substituídas opacidades `/3` e `/6` por `/5` nos componentes `FAQAccordion.tsx` e `Hero.tsx`

---

## Perguntas Frequentes para Colaboradores

**P: Adicionei um componente novo mas ele não aparece na página. O que pode ser?**  
R: Verifique se ele foi importado e usado em `src/app/page.tsx` (página inicial) ou na página correspondente. O Next.js App Router não inclui componentes automaticamente.

**P: Quero adicionar uma nova página (ex: `/sobre`). Como faço?**  
R: Crie `src/app/sobre/page.tsx`. Em seguida, adicione o link no array `NAV_LINKS` em `Header.tsx` e no `Footer.tsx`.

**P: Onde edito cabeçalho e rodapé?**  
R: `src/components/Header.tsx` e `src/components/Footer.tsx`. Dados de contato vêm de `src/lib/dados-placeholder.ts`.

**P: O site está mostrando dados falsos. Como conecto ao banco real?**  
R: Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no `.env.local` (dev) ou no painel da Netlify (produção).

**P: Preciso corrigir o endereço/telefone/horário do Albergue. Onde edito?**  
R: Com o Supabase conectado, **não edite o código** — esses dados vêm da tabela `site_config` e devem ser corrigidos pelo app de gestão da equipe. `PLACEHOLDER_INFO_ALBERGUE` em `dados-placeholder.ts` só existe como fallback para quando o banco está fora do ar; editar apenas esse arquivo não muda o que aparece em produção se o `site_config` já estiver populado.

**P: Como adiciono mais fotos ao carrossel do Instagram?**  
R: Coloque a foto em `public/` (ex: `insta-7.webp`) e adicione um objeto no array `FOTOS` em `InstagramCarrossel.tsx`.

**P: Posso usar cores fora da paleta SVP?**  
R: Evite. Se for necessário adicionar uma cor nova, inclua-a no `tailwind.config.ts` com prefixo `svp-` e documente aqui.

**P: Como atualizo o domínio se o site ganhar um domínio próprio?**  
R: Edite apenas a constante `SITE_URL` em `src/lib/seo.ts`. Todos os metadados (Open Graph, canonical URL, Twitter Card) atualizam automaticamente.
