# Albergue São Vicente de Paula — Site Público

Site público de transparência e divulgação do Albergue São Vicente de Paula.  
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
| Recharts               | 2.13.x    | Gráficos de transparência (barras e linhas)           |
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
│   ├── tour.mp4                    # Vídeo tour do Albergue (aparece abaixo dos botões do Hero)
│   ├── qr-pix.png                  # QR Code Pix real do Albergue (página /como-doar)
│   ├── insta-1.jpg                 # Foto 1 do carrossel Instagram
│   ├── insta-2.jpg                 # Foto 2 do carrossel Instagram
│   ├── insta-3.webp                # Foto 3 do carrossel Instagram
│   ├── insta-4.webp                # Foto 4 do carrossel Instagram
│   ├── insta-5.webp                # Foto 5 do carrossel Instagram
│   └── insta-6.webp                # Foto 6 do carrossel Instagram
│
├── src/
│   ├── app/                        # Páginas (Next.js App Router)
│   │   ├── layout.tsx              # Layout raiz: importa globals.css, monta Header + Footer + ScrollAnimator
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
│   │   ├── PixCopyButton.tsx       # Botão que copia a chave Pix para a área de transferência (com feedback visual)
│   │   ├── RealtimeRefresher.tsx   # Componente cliente: assina mudanças no Supabase e chama router.refresh()
│   │   │                           # para atualizar dados sem reload — usado nas páginas dinâmicas
│   │   ├── ZoomWordSection.tsx     # Seção de efeito parallax/zoom na palavra "Dignidade" ao rolar a página
│   │   │
│   │   ├── sections/               # Seções da página inicial (cada uma é um bloco visual independente)
│   │   │   ├── Hero.tsx            # Seção Hero: título principal, botões CTA, vídeo tour, foto institucional
│   │   │   │                       # e efeito parallax suave no fundo ao rolar
│   │   │   ├── Estatisticas.tsx    # Seção com 4 contadores animados (idosos, voluntários, anos, famílias)
│   │   │   ├── Missao.tsx          # Seção com texto da missão + 3 cards dos pilares (Cuidado, Transparência, Comunidade)
│   │   │   ├── Depoimentos.tsx     # Carrossel automático de depoimentos (4 depoimentos, troca a cada 5s)
│   │   │   ├── ComoAjudar.tsx      # Seção com 3 cards das formas de ajudar (dinheiro, itens, voluntariado)
│   │   │   ├── InstagramCarrossel.tsx  # Carrossel de 6 fotos do Instagram — grade 3 colunas no desktop,
│   │   │   │                           # carrossel com setas no mobile
│   │   │   └── FAQAccordion.tsx    # Accordion de perguntas e respostas — recebe lista de FAQs como prop
│   │   │
│   │   └── charts/                 # Gráficos Recharts — usados na página /transparencia
│   │       ├── DoacoesChart.tsx    # Gráfico de barras: doações em dinheiro por mês (últimos 6 meses)
│   │       ├── GastosChart.tsx     # Gráfico de barras empilhadas: gastos por categoria por mês
│   │       └── EstoqueChart.tsx    # Gráfico de barras horizontais: nível de estoque atual por item
│   │
│   └── lib/
│       ├── supabase.ts             # Cliente Supabase + todas as funções de leitura de dados do banco
│       │                           # Inclui fallback automático para placeholder se as variáveis de ambiente
│       │                           # não estiverem configuradas (modo mock/desenvolvimento offline)
│       └── dados-placeholder.ts    # Dados de exemplo usados enquanto o banco real não está conectado
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

A página principal do site. É composta pelas seguintes seções, de cima para baixo:

1. **Hero** — Título, parágrafo da missão, botões "Quero fazer uma doação" e "Ver transparência", vídeo tour do Albergue, foto institucional, e indicadores de impacto (78 idosos, 24 voluntários).
2. **Estatisticas** — 4 contadores animados com ícones.
3. **Missao** — Texto descritivo + 3 cards dos pilares da instituição.
4. **ZoomWordSection** — Efeito visual com a palavra "Dignidade" crescendo ao rolar a página (ocupa 250vh de altura).
5. **Depoimentos** — Carrossel automático com 4 depoimentos reais.
6. **ComoAjudar** — Cards de doação em dinheiro, itens físicos e voluntariado.
7. **InstagramCarrossel** — 6 fotos do perfil do Instagram, linkadas para o perfil.
8. **Localização** — Texto com endereço, telefone e horário + mapa embutido do Google Maps.
9. **Faixa CTA final** — Chamada para ação com links para /como-doar e /transparencia.

---

### `/como-doar` — Como Doar (`src/app/como-doar/page.tsx`)

Página com renderização dinâmica (`force-dynamic`) — não é cacheada para sempre refletir o estoque atual.

- **Coluna 1 — Doação em dinheiro:** QR Code Pix, botão de copiar chave Pix (CNPJ), e dados bancários para depósito (Sicoob agência 5014, conta 6696).
- **Coluna 2 — Itens físicos:** Lista dos itens mais necessários no momento (buscada do Supabase via `getItensNecessarios()`), com badge "urgente" para itens abaixo do estoque mínimo. Inclui endereço e horário do ponto de coleta.
- Contém `<RealtimeRefresher />` para atualizar a lista de itens ao vivo quando o banco muda.

---

### `/transparencia` — Transparência (`src/app/transparencia/page.tsx`)

Página com renderização dinâmica (`force-dynamic`).

- **4 cards de resumo do mês:** Doações em dinheiro, Gastos totais, Saldo do mês, Itens recebidos.
- **Gráfico de Doações** (`DoacoesChart`) — barras dos últimos 6 meses.
- **Gráfico de Gastos** (`GastosChart`) — barras empilhadas por categoria (alimentação, higiene, medicamentos, utilidades, manutenção).
- **Gráfico de Estoque** (`EstoqueChart`) — barras horizontais mostrando nível atual de cada item.
- **Seção explicativa** sobre como funciona o sistema de registro (banco de dados ledger).
- Banner amarelo quando em modo mock (sem Supabase), ou banner verde quando conectado ao banco real.
- Contém `<RealtimeRefresher />` para atualizar os dados ao vivo.

---

### `/faq` — Perguntas Frequentes (`src/app/faq/page.tsx`)

Página com renderização dinâmica (`force-dynamic`).

- Accordion de perguntas e respostas, carregadas do Supabase via `getFaqs()` (ou do placeholder se não houver banco).
- Atualmente há 7 perguntas no placeholder cobrindo: horários, o que doar, como fazer Pix, voluntariado, vagas, acompanhamento médico e como acompanhar o uso das doações.
- Card de CTA no final para falar com a equipe pelo WhatsApp caso a dúvida não esteja listada.

---

## Identidade Visual

A paleta de cores está definida no `tailwind.config.ts` com o prefixo `svp-`:

| Token Tailwind  | Valor hex   | Uso                                       |
|-----------------|-------------|-------------------------------------------|
| `svp-cream`     | `#F6EFE3`   | Fundo principal quente                    |
| `svp-linen`     | `#EDE4D3`   | Fundo de seções alternadas / cards        |
| `svp-sienna`    | `#803320`   | Cor primária — terracota escuro           |
| `svp-rose`      | `#A8492D`   | Terracota claro — hover da cor primária   |
| `svp-forest`    | `#2D5A27`   | Cor secundária — verde floresta           |
| `svp-sage`      | `#4A7E43`   | Verde claro — hover da cor secundária     |
| `svp-amber`     | `#B8892A`   | Destaque — dourado âmbar                  |
| `svp-dark`      | `#18120B`   | Quase-preto quente (fundos escuros, texto)|
| `svp-brown`     | `#4A3728`   | Marrom médio (texto de parágrafos)        |
| `svp-muted`     | `#8A7464`   | Texto secundário / legendas               |
| `svp-border`    | `#D9CEBD`   | Bordas suaves                             |

**Fontes:**
- **Lora** (serif) — títulos, citações e textos de destaque (`font-display`)
- **Plus Jakarta Sans** (sans-serif) — corpo de texto, botões, labels (`font-body`)

Ambas as fontes são carregadas via Google Fonts no `globals.css`.

---

## Animações e Efeitos Visuais

O site tem vários efeitos já implementados e funcionando:

| Efeito | Como funciona | Onde é usado |
|---|---|---|
| **Fade-up ao rolar** | Elementos com atributo `data-animate` começam invisíveis e surgem ao entrar na viewport. Controlado pelo `ScrollAnimator.tsx` via `IntersectionObserver`. | Em praticamente todas as seções |
| **Atraso escalonado** | `data-delay="1"` a `data-delay="5"` adicionam delay de 0.1s a 0.5s nas transições | Grupos de elementos em sequência |
| **Barra de progresso de scroll** | Div com `id="scroll-progress"` no topo da tela cresce conforme o usuário rola | Toda a aplicação (via `ScrollAnimator`) |
| **Parallax no Hero** | O fundo do Hero se move a 30% da velocidade de scroll via `useEffect` + `transform: translateY` | `Hero.tsx` |
| **Zoom ao rolar ("Dignidade")** | A palavra cresce de 56px a 160px conforme o usuário avança pela seção (sticky de 250vh) | `ZoomWordSection.tsx` |
| **Contador animado** | Números "contam" do zero até o valor real ao entrar na viewport | `Estatisticas.tsx` |
| **Carrossel de depoimentos** | Troca automaticamente a cada 5 segundos, com dots de navegação clicáveis | `Depoimentos.tsx` |
| **Carrossel de fotos Instagram** | Grade de 3 colunas no desktop; carrossel com setas e dots no mobile | `InstagramCarrossel.tsx` |

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18 ou superior
- npm (já vem com o Node.js)

### Passo a passo

```bash
# 1. Clone ou baixe o projeto e entre na pasta
cd Site-albergue-main

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local com as chaves do Supabase (fornecidas pela Frente 1)
# Se não tiver as chaves ainda, pode deixar em branco — o site roda em modo placeholder

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

> **Modo placeholder (sem Supabase):** Se o `.env.local` não tiver as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` preenchidas, o site detecta isso automaticamente e usa os dados do arquivo `dados-placeholder.ts`. A página `/transparencia` exibe um banner amarelo avisando que são dados de demonstração.

### Build para produção

```bash
npm run build
npm run start
```

---

## Deploy na Netlify

O projeto já está configurado para deploy automático na Netlify via `netlify.toml`.

### Passos para subir pela primeira vez

1. Faça push do código para um repositório no GitHub
2. Acesse [netlify.com](https://netlify.com) e faça login
3. Clique em **"Add new site" → "Import an existing project"**
4. Conecte ao GitHub e selecione o repositório
5. As configurações de build são detectadas automaticamente pelo `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Vá em **Site configuration → Environment variables** e adicione:
   ```
   NEXT_PUBLIC_SUPABASE_URL=<URL fornecida pela Frente 1>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<chave anon fornecida pela Frente 1>
   ```
7. Clique em **Deploy site**

> **Atenção:** Sem as variáveis de ambiente configuradas no painel da Netlify, o site em produção também rodará em modo placeholder. Isso não quebra nada, mas os dados serão fictícios.

### Redeploys automáticos

Após a configuração inicial, qualquer push para a branch principal do repositório dispara um redeploy automático na Netlify.

---

## Integração com o Supabase (Frente 1)

### Como funciona o modo mock/placeholder

O arquivo `src/lib/supabase.ts` exporta a constante `USE_MOCK`:

```typescript
export const USE_MOCK =
  process.env.NEXT_PUBLIC_USE_MOCK === "true" || !supabaseUrl || !supabaseAnonKey;
```

Se `USE_MOCK` for `true`, cada função de dados importa os dados do `dados-placeholder.ts` em vez de consultar o banco. Isso permite desenvolver e testar o site sem depender da Frente 1.

### Funções disponíveis em `supabase.ts`

| Função | Tabela/View consultada | O que retorna |
|---|---|---|
| `getEstoqueAtual()` | `view_estoque_atual` | Lista de itens com quantidade atual e mínima |
| `getDoacoesMensais()` | `view_doacoes_mensais` | Doações dos últimos 6 meses (dinheiro + itens) |
| `getGastosMensais()` | `view_gastos_mensais` | Gastos dos últimos 6 meses por categoria |
| `getFaqs()` | `faqs` | Perguntas e respostas com `ativo = true` |
| `getItensNecessarios()` | `view_itens_necessarios` | Itens com estoque baixo (quantidade ≤ 10) |

Todas as funções têm fallback automático para placeholder em caso de erro no banco.

### Atualização em tempo real

O componente `RealtimeRefresher.tsx` escuta mudanças nas tabelas `eventos_financeiro` e `eventos_estoque` via Supabase Realtime. Quando algo muda, ele dispara um `router.refresh()` com debounce de 800ms — o que força o Next.js a buscar novos dados do servidor sem recarregar a página. Está ativo nas páginas `/como-doar` e `/transparencia`.

### Variáveis de ambiente necessárias

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Opcional:
```env
NEXT_PUBLIC_USE_MOCK=true   # Força modo placeholder mesmo com Supabase configurado
```

---

## Dados de Contato do Albergue (no código)

Todos os dados de contato estão centralizados em `src/lib/dados-placeholder.ts` na constante `PLACEHOLDER_INFO_ALBERGUE`. Quando esses dados forem atualizados para os valores reais, basta editar apenas esse arquivo e todos os lugares do site atualizam automaticamente.

| Campo | Valor atual (placeholder/real) |
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

> **Nota:** O QR Code Pix (`/public/qr-pix.png`) e o vídeo tour (`/public/tour.mp4`) já são arquivos reais — foram fornecidos pelo Albergue e já estão incluídos no projeto.

---

## Restrições Éticas (definidas no levantamento com a instituição)

Regras que devem ser seguidas por todos os colaboradores ao adicionar qualquer conteúdo visual ou textual ao site:

- ❌ **Nunca** exibir foto de idoso sozinho identificável
- ❌ **Nunca** exibir dados pessoais de residentes (nomes, históricos, condições de saúde)
- ✅ Fotos somente com voluntários, equipe ou grupos sem identificação individual dos residentes
- ✅ Dados de estoque: mostrar apenas quantidades, nunca nomes de pessoas
- ✅ Transparência financeira: valores agregados por mês/categoria, nunca transações individuais com nomes

---

## To-do — O que ainda falta fazer

### Alta prioridade (necessário para o site estar 100% com dados reais)

- [ ] **Conectar ao Supabase real** — adicionar as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no painel da Netlify (a URL e a chave anon já estão no `.env.local.example` — conferir se estão corretas com a Frente 1)
- [ ] **Confirmar que as views do Supabase existem** — o código depende de `view_estoque_atual`, `view_doacoes_mensais`, `view_gastos_mensais`, `view_itens_necessarios` e a tabela `faqs`. A Frente 1 precisa confirmar que essas views estão criadas e com dados
- [ ] **Atualizar link do WhatsApp real** — substituir o número em `PLACEHOLDER_INFO_ALBERGUE.whatsapp` pelo número oficial do Albergue, se ainda não for o correto
- [ ] **Validar dados de contato** — confirmar com o Albergue se endereço, telefone, e-mail e horários estão corretos

### Média prioridade (melhoria do conteúdo)

- [ ] **Atualizar fotos do carrossel Instagram** — as 6 fotos atuais (`insta-1` a `insta-6`) são fotos reais mas podem ser atualizadas com fotos mais recentes do Instagram do Albergue. Substituir os arquivos em `/public/` mantendo os mesmos nomes, ou adicionar novos e editar a lista `FOTOS` em `InstagramCarrossel.tsx`
- [ ] **Atualizar os depoimentos** — os 4 depoimentos em `Depoimentos.tsx` (na constante `DEPOIMENTOS`) são baseados em comentários reais, mas podem ser revisados ou expandidos
- [ ] **Atualizar estatísticas** — os números em `PLACEHOLDER_ESTATISTICAS` (78 idosos, 100+ voluntários, 55 anos, 78 famílias) em `dados-placeholder.ts` devem ser confirmados com o Albergue
- [ ] **Revisar as FAQs** — conferir se as 7 perguntas em `PLACEHOLDER_FAQ` estão atualizadas e corretas; quando o Supabase for conectado, as FAQs virão do banco e poderão ser editadas lá

### Baixa prioridade (melhorias futuras)

- [ ] **Google Maps embed** — o mapa já está na página inicial com coordenadas fixas (`-17.8624477, -51.718235`). Verificar se as coordenadas apontam para o local correto; se necessário, atualizar o `src` da `<iframe>` em `src/app/page.tsx`
- [ ] **SEO e Open Graph** — o `layout.tsx` já tem metadados básicos; pode ser melhorado com uma imagem Open Graph real do Albergue (para aparecer ao compartilhar o link nas redes sociais)
- [ ] **Favicon** — atualmente o projeto usa o favicon padrão do Next.js; substituir por um favicon baseado na logo do Albergue
- [ ] **Página de agradecimento pós-doação** — não existe ainda; poderia ser uma rota `/obrigado` simples para redirecionar após Pix
- [ ] **Permitir imagens do Supabase Storage** — se a Frente 1 armazenar imagens no Supabase, adicionar o hostname do Supabase em `next.config.ts` na lista de `remotePatterns`

---

## Perguntas Frequentes para Colaboradores

**P: Adicionei um componente novo mas ele não aparece na página. O que pode ser?**  
R: Verifique se ele foi importado e usado em `src/app/page.tsx` (para a página inicial) ou na página correspondente em `src/app/`. O Next.js App Router não inclui componentes automaticamente — é necessário importar explicitamente.

**P: Quero adicionar uma nova página (ex: `/sobre`). Como faço?**  
R: Crie uma pasta com o nome da rota dentro de `src/app/` e adicione um arquivo `page.tsx` dentro dela. Exemplo: `src/app/sobre/page.tsx` cria a rota `/sobre`. Em seguida, adicione o link de navegação em `Header.tsx` (array `NAV_LINKS`) e no `Footer.tsx`.

**P: Onde edito o que aparece no rodapé e no cabeçalho?**  
R: Cabeçalho → `src/components/Header.tsx`. Rodapé → `src/components/Footer.tsx`. Os dados de contato (endereço, telefone, WhatsApp) vêm de `src/lib/dados-placeholder.ts`.

**P: O site está mostrando dados falsos. Como conecto ao banco real?**  
R: Configure as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` no seu `.env.local` (desenvolvimento) ou no painel da Netlify (produção). O site detecta automaticamente e usa o banco quando as variáveis estão presentes.

**P: Como adiciono mais fotos ao carrossel do Instagram?**  
R: Coloque as fotos na pasta `public/` (ex: `insta-7.webp`) e adicione um objeto no array `FOTOS` dentro de `src/components/sections/InstagramCarrossel.tsx` seguindo o mesmo padrão dos já existentes.

**P: Posso usar cores que não estão na paleta SVP?**  
R: Evite. A paleta está definida para manter consistência visual. Se for absolutamente necessário adicionar uma cor nova, adicione-a no `tailwind.config.ts` com o prefixo `svp-` e documente aqui.
