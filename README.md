# CaseAI

Frontend para geração de business cases com IA.

## 📋 Sobre o Projeto

CaseAI é uma aplicação web desenvolvida para facilitar a criação e geração de business cases utilizando inteligência artificial. Este repositório contém o frontend da aplicação, construído com tecnologias modernas e escaláveis.

## 🚀 Stack Tecnológica

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Validação:** [Zod](https://zod.dev/)
- **Linting:** ESLint + Prettier

## 📁 Estrutura do Projeto

```
caseai/
├── public/              # Arquivos estáticos
├── src/
│   ├── app/             # Rotas e páginas (App Router)
│   │   ├── layout.tsx   # Layout raiz
│   │   └── page.tsx     # Página inicial (placeholder)
│   ├── components/      # Componentes React reutilizáveis
│   ├── lib/             # Utilitários e helpers
│   │   └── utils.ts     # Funções utilitárias (cn, etc)
│   └── styles/
│       └── globals.css  # Estilos globais e variáveis CSS
├── .env.example         # Exemplo de variáveis de ambiente
├── components.json      # Configuração shadcn/ui
├── next.config.ts       # Configuração Next.js
├── tailwind.config.ts   # Configuração Tailwind
├── tsconfig.json        # Configuração TypeScript
└── package.json         # Dependências do projeto
```

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm/yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd caseai
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📦 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Cria a build de produção
- `pnpm start` - Inicia o servidor de produção
- `pnpm lint` - Executa o linter
- `pnpm format` - Formata o código com Prettier

## 🧩 shadcn/ui

O projeto está configurado para usar componentes shadcn/ui. Para adicionar novos componentes:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

Os componentes serão automaticamente instalados em `src/components/ui/`.

## 🌍 Deploy

O deploy ainda está sendo definido. A aplicação é compatível com:

- **AWS** (Amplify, EC2, ECS, etc)
- **Vercel** (recomendado para Next.js)

Instruções específicas de deploy serão adicionadas conforme a infraestrutura for definida.

## 🔐 Variáveis de Ambiente

### Desenvolvimento Local

Para desenvolvimento local, crie um arquivo `.env.local` na raiz do projeto:

```bash
cp .env.example .env.local
```

**Variáveis disponíveis:**

- **NEXT_PUBLIC_N8N_BASE_URL** - URL base do n8n (padrão: `http://localhost:5678`)
  - Local: `http://localhost:5678`
  - Produção: `https://seu-n8n-domain.com`

**Nota:** O prefixo `NEXT_PUBLIC_` indica que a variável é exposta ao cliente (navegador). Use apenas para URLs públicas.

### Produção

Para produção, crie um arquivo `.env.production` com a URL do seu n8n deployado:

```bash
NEXT_PUBLIC_N8N_BASE_URL=https://seu-n8n-domain.com
```

## 📝 Status Atual

Este commit inicial contém **apenas as configurações gerais** do projeto:

- ✅ Estrutura base do Next.js com App Router
- ✅ TypeScript configurado
- ✅ TailwindCSS configurado
- ✅ shadcn/ui pronto para uso (sem componentes instalados)
- ✅ Zod instalado
- ✅ ESLint + Prettier configurados
- ✅ Estrutura de pastas organizada

**Próximas etapas incluirão:**
- Implementação de telas e fluxos
- Integração com APIs
- Autenticação com AWS Cognito
- Integração com webhooks n8n

## 🤝 Contribuindo

Este é um projeto em desenvolvimento. Diretrizes de contribuição serão adicionadas em breve.

## 📄 Licença

[Definir licença]
