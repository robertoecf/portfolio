<div align="center">

# Roberto E. C. Freitas | Portfolio

**Consultor Financeiro CFP® | Strategy & Operations | Fintech & AI**

[![Live Site](https://img.shields.io/badge/Live-robertoecf.com-000?style=flat-square&logo=cloudflare&logoColor=white)](https://robertoecf.com/)
[![PT-BR](https://img.shields.io/badge/PT--BR-robertoecf.com.br-009c3b?style=flat-square)](https://robertoecf.com.br/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

</div>

---

## Sumário

- [Sobre](#sobre)
- [Features](#features)
- [Stack](#stack)
- [Onde editar o conteúdo](#onde-editar-o-conteúdo)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Rodando localmente](#rodando-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Deploy](#deploy)
- [Contato](#contato)

## Sobre

Portfólio pessoal e profissional bilíngue, com design inspirado em interfaces de comando e HUD. O idioma padrão depende do domínio: `robertoecf.com` abre em inglês (perfil Strategy & Operations) e `robertoecf.com.br` abre em português (perfil de consultoria patrimonial). Inclui um assistente virtual com IA que responde com base no mesmo conteúdo do site.

## Features

- **Fonte única de dados**: perfil, redes, projetos, experiência e certificações vivem em `content/profile.ts` e alimentam o site, o chat e os arquivos de SEO
- **Bilíngue por domínio**: `.com` em inglês, `.com.br` em português, com alternância manual PT/EN
- **Projetos open source**: seção com os repositórios públicos, projeto em destaque e links para GitHub e npm
- **Chat com IA**: assistente via Cloudflare Worker (Cerebras, Qwen), chave apenas no servidor, limites de tamanho de mensagem e histórico
- **SEO e GEO**: `robots.txt`, `sitemap.xml` com hreflang, `llms.txt`, `llms-full.txt`, páginas `knowledge/` legíveis sem JavaScript, OpenGraph e JSON-LD `Person`, todos gerados no build
- **Página por domínio**: o build gera `/` em inglês e `/pt/` em português; o Worker serve `/pt/` na raiz de `robertoecf.com.br`

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Astro 7 (HTML estático), React 19 só na ilha do chat, TypeScript, Tailwind CSS 4, Lucide Icons |
| Build | `astro build`; os arquivos de SEO saem de `src/pages/[...file].ts` |
| Backend | Cloudflare Worker (`worker/`) com static assets |
| IA | Cerebras (`qwen-3.8-27b`) |
| Deploy | Cloudflare Workers (Workers Builds a cada push na `main`) |

## Onde editar o conteúdo

| O que mudar | Arquivo |
|-------------|---------|
| Nome, headline, resumo, localização, foto | `content/profile.ts` → `PERSON` |
| Título e descrição para Google e redes sociais | `content/profile.ts` → `SEO` |
| WhatsApp, email, LinkedIn, GitHub e novas redes | `content/profile.ts` → `CONTACT` e `SOCIALS` (ícone novo em `components/SocialLinks.tsx`) |
| Projetos | `content/profile.ts` → `PROJECTS` (`featured: true` para o destaque) |
| Experiência, competências, formação, certificações, idiomas | `content/profile.ts` |
| Textos de interface (menu, títulos de seção, botões) | `content/ui.ts` |
| Persona e regras do assistente | `worker/chat.ts` |

`robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` e `knowledge/*.html` **não existem no repositório**: são gerados a partir de `content/profile.ts` em cada build (`content/seo.ts`). Basta editar o perfil.

## Estrutura do projeto

```
├── astro.config.mjs           # Astro + React (ilha do chat) + Tailwind
├── wrangler.jsonc             # Worker, static assets em dist/ e build
├── index.css                  # Tailwind: paleta, fontes e animações (@theme) + estilos globais
├── src/
│   ├── layouts/Page.astro     # Documento completo: head, seções e chat
│   └── pages/
│       ├── index.astro        # Inglês (/)
│       ├── pt/index.astro     # Português (/pt/)
│       └── [...file].ts       # robots, sitemap, llms e knowledge pages
├── content/
│   ├── profile.ts             # Fonte única: perfil, redes, projetos, carreira
│   ├── ui.ts                  # Textos de interface PT/EN
│   └── seo.ts                 # Geradores: head, JSON-LD, llms.txt, sitemap, knowledge pages, contexto do chat
├── components/
│   ├── Masthead.tsx           # Topo + links PT/EN para o outro domínio
│   ├── Footer.tsx
│   ├── SocialLinks.tsx        # Ícones de contato e redes
│   └── sections/              # Hero, Work, Career, AIChat
├── services/
│   └── chat.ts                # Cliente do endpoint /api/chat
├── worker/
│   ├── index.ts               # Idioma por domínio e rota /api/chat
│   └── chat.ts                # Endpoint do assistente (Cerebras)
└── public/
    ├── photos/
    ├── icon.jpg               # Favicon
    └── og-en.jpg, og-pt.jpg   # Imagens de compartilhamento (1200x630)
```

## Rodando localmente

**Pré-requisitos:** Node.js 24.22.1 (patch de segurança; validado antes de cada build)

```bash
git clone git@github.com:robertoecf/portfolio.git
cd portfolio
npm install

# Só o frontend (sem chat), em http://127.0.0.1:4317
npm run dev

# Site + Worker (chat e idioma por domínio), em http://localhost:8787
cp .dev.vars.example .dev.vars   # preencha CEREBRAS_API_KEY
npm run worker:dev
```

## Variáveis de ambiente

| Variável | Obrigatória | Onde | Descrição |
|----------|-------------|------|-----------|
| `CEREBRAS_API_KEY` | Para o chat | `.dev.vars` local; secret do Worker `portfolio` | Chave da API Cerebras |

Sem a chave o site funciona normalmente; apenas o chat responde com mensagem de indisponibilidade.

## Deploy

Cloudflare Workers, Worker `portfolio`, com `robertoecf.com` e `robertoecf.com.br` como Custom Domains (`wrangler.jsonc`). O Workers Builds roda `npm run build` e faz o deploy a cada push na `main`; branches geram só uma versão de preview.

Deploy manual:

```bash
npm run deploy
```

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Roberto_Freitas-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/robertoecf/)
[![GitHub](https://img.shields.io/badge/GitHub-robertoecf-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/robertoecf)

## Licença

Uso pessoal. Para reutilizar, faça um fork e substitua o conteúdo de `content/profile.ts` pelo seu.
