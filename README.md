<div align="center">

# Roberto E. C. Freitas — Portfolio

**Consultor Financeiro CFP® | Strategy & Operations | Fintech & AI**

[![Live Site](https://img.shields.io/badge/Live-robertoecf.com-000?style=flat-square&logo=vercel&logoColor=white)](https://robertoecf.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## Sumario

- [Sobre](#sobre)
- [Features](#features)
- [Stack](#stack)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rodando localmente](#rodando-localmente)
- [Variaveis de ambiente](#variaveis-de-ambiente)
- [Deploy](#deploy)
- [Reutilizando este repositorio](#reutilizando-este-repositorio)
- [Contato](#contato)

## Sobre

Portfolio pessoal e profissional bilíngue (PT/EN), com design inspirado em interfaces de comando e HUD. Desenvolvido com React 19 + TypeScript e servido por Express, inclui um assistente virtual com IA para interação em tempo real.

## Features

- **Bilíngue** — alternância PT/EN com todas as traduções centralizadas em um único arquivo
- **Chat com IA** — assistente virtual integrado via backend server-side (sem exposição de chaves no client)
- **Design interativo** — grid responsivo ao mouse, animações laser, HUD card com métricas
- **SEO & GEO** — `robots.txt`, `sitemap.xml`, `llms.txt`, JSON-LD Person, OpenGraph, hreflang
- **Knowledge pages** — páginas HTML crawláveis em português e inglês para LLM discoverability

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS, Recharts, Lucide Icons |
| Build | Vite 6 |
| Backend | Express — API server-side para chat com IA |
| IA | Google Gemini 2.5 Flash |
| Deploy | Vercel · GitHub Pages · Docker |

## Estrutura do projeto

```
├── App.tsx                  # Layout principal + background effects
├── index.tsx                # Entry point React
├── index.html               # HTML template
├── server.mjs               # Express server (produção)
├── vite.config.ts           # Config do Vite
├── Dockerfile               # Multi-stage build (Node 20 Alpine)
├── components/
│   ├── Navbar.tsx            # Navegação + toggle de idioma
│   ├── sections/
│   │   ├── Hero.tsx          # Seção hero com HUD animado
│   │   ├── Expertise.tsx     # Cards de competências
│   │   ├── Experience.tsx    # Timeline profissional
│   │   └── AIChat.tsx        # Chat interativo com IA
│   └── ui/
│       └── Button.tsx        # Componente de botão reutilizável
├── contexts/
│   └── LanguageContext.tsx   # Provider i18n (PT/EN) com todo o conteúdo textual
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   └── knowledge/           # Páginas crawláveis (pt.html, en.html)
├── .github/
│   └── workflows/
│       └── deploy-pages.yml  # CI/CD GitHub Pages
└── docs/                    # Documentação interna
```

## Rodando localmente

**Pré-requisitos:** Node.js 20+

```bash
# 1. Clone o repositório
git clone git@github.com:robertoecf/portfolio.git
cd portfolio

# 2. Instale as dependências
npm install

# 3. Crie o arquivo de variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com sua chave (veja tabela abaixo)

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`.

Para rodar em modo produção local:

```bash
npm run build && npm start
```

## Variaveis de ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `GEMINI_API_KEY` | Sim | Chave da API Google Gemini — necessária para o chat com IA |

> Sem a chave, o site funciona normalmente mas o chat com IA ficará indisponível.

## Deploy

### Vercel

1. Conecte o repositório no Vercel
2. Adicione `GEMINI_API_KEY` como variável de ambiente server-side
3. Deploy automático a cada push na `main`

### GitHub Pages (estático, sem chat IA)

O workflow `.github/workflows/deploy-pages.yml` faz deploy automático usando `npm run build:pages`.

### Docker

```bash
docker build -t portfolio .
docker run -p 8080:8080 -e GEMINI_API_KEY="sua-chave" portfolio
```

## Reutilizando este repositorio

Para usar como base para seu próprio portfolio:

1. **Fork** o repositório
2. Edite `contexts/LanguageContext.tsx` — **todo o conteúdo textual** (nome, experiências, competências, traduções) está centralizado neste único arquivo
3. Substitua `profile.jpeg` pela sua foto
4. Atualize `metadata.json` com suas informações
5. Edite os arquivos em `public/` (`llms.txt`, `sitemap.xml`, knowledge pages) com seus dados
6. Configure sua própria `GEMINI_API_KEY` — ou remova a seção `AIChat` do `App.tsx` se não quiser IA
7. Ajuste as cores no Tailwind config para sua paleta

> **Dica:** O conteúdo é 100% data-driven. Você não precisa mexer nos componentes React para trocar textos, experiências ou competências — tudo vem do `LanguageContext.tsx`.

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Roberto_Freitas-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/robertoecf/)

## Licença

Uso pessoal. Para reutilização, faça um fork e substitua o conteúdo pelo seu.
