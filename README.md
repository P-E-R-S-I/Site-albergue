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
│   │   ├── Header.tsx              # Cabeçalho fixo com logo, navegação desktop e menu hamburguer mobile
│   │   ├── Footer.tsx              # Rodapé com CTA de doação, links de navegação e informações de contato
│   │   ├── ScrollAnimator.tsx      # Componente cliente: anima elementos [data-animate] ao entrar na tela
│   │   │                           # e controla a barra de progresso de scroll (#scroll-progress)
│   │   ├── PixCopyButton.tsx       # Botão que copia a chave Pix. Exibe Pop-up 1 ("Chave copiada!")
│   │   │                           # e Pop-up 2 (agradecimento completo com estatísticas do Albergue)
│   │   ├── RealtimeRefresher.tsx   # Componente cliente: assina mudanças no Supabase e chama router.refresh()
│   │   │                           # para atualizar dados sem reload — usado nas páginas dinâmicas
│   │   ├── ZoomWordSection.tsx     # Seção de efeito parallax/zoom na palavra "Dignidade" ao rolar a página
│   │   │
│   │   ├── sections/               # Seções da página inicial (cada uma é um bloco visual independente)
│   │   │   ├── Hero.tsx            # Seção Hero: título, botões CTA, vídeo tour, foto institucional, parallax
│   │   │   ├── Estatisticas.tsx    # 4 contadores animados (idosos, voluntários, anos, famílias)
│   │   │   ├── Missao.tsx          # Texto da missão + 3 cards dos pilares (Cuidado, Transparência, Comunidade)
│   │   │   ├── Depoimentos.tsx     # Carrossel automático de depoimentos (troca a cada 5s)
│   │   │   ├── ComoAjudar.tsx      # 3 cards das formas de ajudar (dinheiro, itens, voluntariado)
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
│       │                           # não estiverem configuradas (modo mock/desenvolvimento offline)
│       └── dados-placeholder.ts    # Dados de exemplo usados enquanto o banco real não está conectado.
│                                   # Inclui: doações mensais, gastos, estoque, FAQs, estatísticas e
│                                   # informações de contato do Albergue (endereço, telefone, Pix, etc.)
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

Composta pelas seguintes seções, de cima para baixo:

1. **Hero** — Título, parágrafo da missão, botões "Quero fazer uma doação" e "Ver transparência", vídeo tour do Albergue, foto institucional, e indicadores de impacto.
2. **Estatisticas** — 4 contadores animados com ícones.
3. **Missao** — Texto descritivo + 3 cards dos pilares da instituição.
4. **ZoomWordSection** — Efeito visual com a palavra "Dignidade" crescendo ao rolar (ocupa 250vh de altura).
5. **Depoimentos** — Carrossel automático com 4 depoimentos reais.
6. **ComoAjudar** — Cards de doação em dinheiro, itens físicos e voluntariado.
7. **InstagramCarrossel** — 6 fotos do perfil do Instagram, linkadas para o perfil.
8. **Localização** — Endereço, telefone e horário + mapa embutido do Google Maps.
9. **Faixa CTA final** — Chamada para ação com links para /como-doar e /transparencia.

---

### `/como-doar` — Como Doar (`src/app/como-doar/page.tsx`)

Renderização dinâmica (`force-dynamic`) — não é cacheada para sempre refletir o estoque atual.

- **Coluna 1 — Doação em dinheiro:** QR Code Pix, botão de copiar chave Pix (CNPJ), e dados bancários para depósito (Sicoob agência 5014, conta 6696).
- **Coluna 2 — Itens físicos:** Lista dos itens mais necessários no momento (buscada do Supabase via `getItensNecessarios()`), com badge "urgente" para itens abaixo do estoque mínimo. Inclui endereço e horário do ponto de coleta.
- Contém `<RealtimeRefresher />` para atualizar a lista de itens ao vivo quando o banco muda.

---

### `/transparencia` — Transparência (`src/app/transparencia/page.tsx`)

Renderização dinâmica (`force-dynamic`).

- **4 cards de resumo do mês:** Doações em dinheiro, Gastos totais, Saldo do mês, Itens recebidos.
- **Gráfico de Doações** (`DoacoesChart`) — barras dos últimos 6 meses.
- **Gráfico de Gastos** (`GastosChart`) — área empilhada por categoria (alimentação, higiene, medicamentos, utilidades, manutenção).
- **Gráfico de Estoque** (`EstoqueChart`) — barras de progresso mostrando nível atual de cada item.
- **Seção explicativa** sobre como funciona o sistema de registro (banco de dados ledger).
- Banner amarelo quando em modo mock, banner verde quando conectado ao banco real.
- Contém `<RealtimeRefresher />` para atualizar os dados ao vivo.

---

### `/faq` — Perguntas Frequentes (`src/app/faq/page.tsx`)

Renderização dinâmica (`force-dynamic`).

- Accordion de perguntas e respostas, carregadas do Supabase via `getFaqs()` (ou do placeholder).
- 7 perguntas no placeholder: horários, o que doar, como fazer Pix, voluntariado, vagas, acompanhamento médico e como acompanhar o uso das doações.
- Card de CTA no final para falar com a equipe pelo WhatsApp.

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

Tudo encapsulado em `src/components/PixCopyButton.tsx`.

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
| `getEstoqueAtual()` | `view_estoque_atual` | Lista de itens com quantidade atual e mínima |
| `getDoacoesMensais()` | `view_doacoes_mensais` | Doações dos últimos 6 meses (dinheiro + itens) |
| `getGastosMensais()` | `view_gastos_mensais` | Gastos dos últimos 6 meses por categoria |
| `getFaqs()` | `faqs` | Perguntas e respostas com `ativo = true` |
| `getItensNecessarios()` | `view_itens_necessarios` | Itens com estoque baixo (quantidade ≤ 10) |

Todas as funções têm fallback automático para placeholder em caso de erro no banco.

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

Todos os dados de contato estão centralizados em `src/lib/dados-placeholder.ts` na constante `PLACEHOLDER_INFO_ALBERGUE`. Editar apenas esse arquivo atualiza o site inteiro.

| Campo | Valor atual |
|---|---|
| Endereço | Sit Betânia, 1, Zona Rural — Jataí, GO, 75800-000 |
| Telefone | (64) 99983-9893 |
| E-mail | financeiroalbergue@gmail.com |
| WhatsApp | https://wa.me/5564999839893 |
| Chave Pix | 02.251.270/0001-09 (CNPJ) |
| Banco | Sicoob, agência 5014, conta 6696 |
| Horário de visitas | Todos os dias: 13h às 15h30 |
| Horário de doações | Seg–Sex: 8h às 11h e 13h às 17h |
| Instagram | @vicentedepaulodejatai |

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

- [ ] **Conectar ao Supabase real** — adicionar `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no painel da Netlify
- [ ] **Confirmar views do Supabase** — o código depende de `view_estoque_atual`, `view_doacoes_mensais`, `view_gastos_mensais`, `view_itens_necessarios` e da tabela `faqs`. A Frente 1 precisa confirmar que estão criadas e populadas
- [ ] **Validar dados de contato** — confirmar com o Albergue se endereço, telefone, e-mail e horários estão corretos
- [ ] **Rotacionar a chave Supabase** — a `ANON_KEY` no `.env.local.example` parece ser uma chave real. Regenerar no painel do Supabase e não versionar chaves reais

### Média prioridade

- [ ] **Atualizar fotos do carrossel Instagram** — substituir os arquivos `insta-1` a `insta-6` em `public/` por fotos mais recentes, ou adicionar novos e editar o array `FOTOS` em `InstagramCarrossel.tsx`
- [ ] **Revisar depoimentos** — a constante `DEPOIMENTOS` em `Depoimentos.tsx` pode ser expandida
- [ ] **Confirmar estatísticas** — os números em `PLACEHOLDER_ESTATISTICAS` (78 idosos, 100+ voluntários, 55 anos) devem ser validados com o Albergue

### Concluído

- [x] **SEO e Open Graph** — centralizado em `src/lib/seo.ts` com `buildMetadata()`. Domínio correto (`site-albergue-sao-vincente.netlify.app`), imagem `og-image.jpg` em 1200×630px real, Open Graph e Twitter Card completos em todas as 4 rotas
- [x] **Favicon** — arquivos em `public/` declarados via `metadata.icons` no `layout.tsx`; duplicatas removidas de `src/app/` para evitar conflito com o App Router
- [x] **Agradecimento pós-Pix** — dois pop-ups em `PixCopyButton.tsx`
- [x] **Google Maps** — mapa embutido na página inicial com coordenadas confirmadas
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

**P: Como adiciono mais fotos ao carrossel do Instagram?**  
R: Coloque a foto em `public/` (ex: `insta-7.webp`) e adicione um objeto no array `FOTOS` em `InstagramCarrossel.tsx`.

**P: Posso usar cores fora da paleta SVP?**  
R: Evite. Se for necessário adicionar uma cor nova, inclua-a no `tailwind.config.ts` com prefixo `svp-` e documente aqui.

**P: Como atualizo o domínio se o site ganhar um domínio próprio?**  
R: Edite apenas a constante `SITE_URL` em `src/lib/seo.ts`. Todos os metadados (Open Graph, canonical URL, Twitter Card) atualizam automaticamente.
