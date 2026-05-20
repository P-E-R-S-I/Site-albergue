[README.md](https://github.com/user-attachments/files/28073205/README.md)
# Albergue São Vicente de Paula — Site Público

Site público de transparência do Albergue São Vicente de Paula.
Projeto de extensão — Bacharelado em IA, UFJ.

**Frente 3** do projeto. Consome a API da **Frente 1 (Núcleo de Dados)**.

---

## Stack

| Tecnologia       | Função                          |
|------------------|---------------------------------|
| Next.js 15       | Framework React (App Router)    |
| TypeScript       | Tipagem estática                |
| Tailwind CSS     | Estilização                     |
| Recharts         | Gráficos de transparência       |
| Supabase JS      | Cliente para a API da Frente 1  |
| Lucide React     | Ícones                          |
| Netlify          | Hospedagem (gratuita)           |

---

## Estrutura de Pastas

```
src/
├── app/                    # Páginas (Next.js App Router)
│   ├── layout.tsx          # Layout raiz com Header + Footer
│   ├── globals.css         # Estilos globais + variáveis CSS
│   ├── page.tsx            # Página Inicial (/)
│   ├── como-doar/
│   │   └── page.tsx        # Página /como-doar
│   ├── transparencia/
│   │   └── page.tsx        # Página /transparencia (gráficos)
│   └── faq/
│       └── page.tsx        # Página /faq (FAQ com accordion)
│
├── components/
│   ├── Header.tsx          # Cabeçalho com navegação responsiva
│   ├── Footer.tsx          # Rodapé com CTA e links
│   ├── charts/             # Componentes de gráficos (Recharts)
│   │   ├── DoacoesChart.tsx
│   │   ├── GastosChart.tsx
│   │   └── EstoqueChart.tsx
│   └── sections/           # Seções das páginas
│       ├── Hero.tsx
│       ├── Estatisticas.tsx
│       ├── Missao.tsx
│       └── ComoAjudar.tsx
│
└── lib/
    ├── supabase.ts         # Cliente Supabase + funções de dados
    └── dados-placeholder.ts # Dados falsos para desenvolvimento
```

---

## Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# 1. Clone ou baixe o projeto
cd site-publico

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.local.example .env.local
# Edite o .env.local com as chaves do Supabase (Frente 1)

# 4. Rode o servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

### Build para produção

```bash
npm run build
npm run start
```

---

## Deploy na Netlify

1. Faça push do código para um repositório no GitHub
2. Acesse [netlify.com](https://netlify.com) e crie uma conta gratuita
3. Clique em **"Add new site" > "Import an existing project"**
4. Conecte ao GitHub e selecione o repositório
5. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Adicione as variáveis de ambiente em **Site Settings > Environment Variables**
7. Clique em **Deploy**

O site ficará disponível em `https://seu-projeto.netlify.app`

---

## Integração com a Frente 1 (Núcleo de Dados)

Atualmente, todos os dados vêm do arquivo `src/lib/dados-placeholder.ts`.

Quando a Frente 1 disponibilizar a API, substituir em `src/lib/supabase.ts`:
- Descomentar as funções `getDoacoesMensais()`, `getEstoqueAtual()`, etc.
- Trocar a importação de `dados-placeholder` pelos dados reais
- Usar `async/await` nas páginas que exibirem os dados

### Variáveis de ambiente necessárias (Frente 1 fornece):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Identidade Visual

| Token          | Valor     | Uso                          |
|----------------|-----------|------------------------------|
| `svp-cream`    | `#F6EFE3` | Fundo principal              |
| `svp-linen`    | `#EDE4D3` | Fundo de seções alternadas   |
| `svp-sienna`   | `#803320` | Cor primária (terracota)     |
| `svp-forest`   | `#2D5A27` | Cor secundária (verde)       |
| `svp-amber`    | `#B8892A` | Destaque (dourado)           |
| `svp-dark`     | `#18120B` | Texto principal              |
| `svp-muted`    | `#8A7464` | Texto secundário             |

Fontes: **Cormorant** (display/títulos) + **Plus Jakarta Sans** (corpo)

---

## Restrições Éticas (do levantamento)

- ❌ Nunca exibir foto de idoso sozinho
- ❌ Nunca exibir dados pessoais dos residentes no site público
- ✅ Fotos somente com voluntários ou em grupo
- ✅ Dados de estoque: quantidades, não nomes de pessoas
- ✅ Transparência financeira: valores agregados, não individuais

---

## To-do para dados reais

- [ ] Substituir `dados-placeholder.ts` pela API do Supabase (Frente 1)
- [ ] Inserir foto institucional real em `public/foto-institucional.jpg`
- [ ] Inserir QR Code Pix real na página `/como-doar`
- [ ] Inserir embed do Google Maps na página `/`
- [ ] Atualizar chave Pix e dados bancários reais
- [ ] Atualizar endereço, telefone e horários reais
- [ ] Atualizar link do WhatsApp real
- [ ] Inserir fotos na galeria (sem idosos sozinhos)
