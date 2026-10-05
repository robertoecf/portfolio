<div align="center">

# Roberto E. C. Freitas — Portfolio

**Consultor Financeiro CFP® | Strategy & Operations | Fintech & AI**

[![Live Site](https://img.shields.io/badge/Live-robertoecf.com-000?style=flat-square&logo=cloudflare&logoColor=white)](https://robertoecf.com/)
[![PT-BR](https://img.shields.io/badge/PT--BR-robertoecf.com.br-009c3b?style=flat-square)](https://robertoecf.com.br/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

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

- **Fonte única de dados** — perfil, redes, projetos, experiência e certificações vivem em `content/profile.ts` e alimentam o site, o chat e os arquivos de SEO
- **Bilíngue por domínio** — `.com` em inglês, `.com.br` em português, com alternância manual PT/EN
- **Projetos open source** — seção com os repositórios públicos, projeto em destaque e links para GitHub e npm
- **Chat com IA** — assistente via Cloudflare Pages Function (xAI Grok), chave apenas no servidor, limites de tamanho de mensagem e histórico
- **SEO e GEO** — `robots.txt`, `sitemap.xml` com hreflang, `llms.txt`, `llms-full.txt`, páginas `knowledge/` legíveis sem JavaScript, OpenGraph e JSON-LD `Person`, todos gerados no build
- **Head por domínio** — middleware troca `lang`, título, descrição, canonical e JSON-LD para português em `robertoecf.com.br`

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS 3 (compilado no build), Lucide Icons |
| Build | Vite 6 + plugin local que gera os arquivos de SEO |
| Backend | Cloudflare Pages Functions (`functions/`) |
| IA | xAI Grok (`grok-3-mini`) |
| Deploy | Cloudflare Pages |

## Onde editar o conteúdo

| O que mudar | Arquivo |
|-------------|---------|
| Nome, headline, resumo, localização, foto | `content/profile.ts` → `PERSON` |
| Título e descrição para Google e redes sociais | `content/profile.ts` → `SEO` |
| WhatsApp, email, LinkedIn, GitHub e novas redes | `content/profile.ts` → `CONTACT` e `SOCIALS` (ícone novo em `components/SocialLinks.tsx`) |
| Projetos | `content/profile.ts` → `PROJECTS` (`featured: true` para o destaque) |
| Experiência, competências, formação, certificações, idiomas | `content/profile.ts` |
| Textos de interface (menu, títulos de seção, botões) | `contexts/LanguageContext.tsx` |
| Persona e regras do assistente | `functions/api/chat.ts` |

`robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt` e `knowledge/*.html` **não existem no repositório**: são gerados a partir de `content/profile.ts` em cada build (`content/seo.ts`). Basta editar o perfil.

## Estrutura do projeto

```
├── App.tsx                    # Layout, background e footer
├── index.tsx                  # Entry point React
├── index.html                 # Template; o bloco seo:start/seo:end é gerado no build
├── index.css                  # Tailwind + estilos globais
├── tailwind.config.js         # Paleta e animações
├── vite.config.ts             # Vite + geração dos arquivos de SEO
├── content/
│   ├── profile.ts             # Fonte única: perfil, redes, projetos, carreira
│   └── seo.ts                 # Geradores: head, JSON-LD, llms.txt, sitemap, knowledge pages, contexto do chat
├── components/
│   ├── Navbar.tsx             # Navegação + troca de idioma
│   ├── SocialLinks.tsx        # Ícones de contato e redes
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Expertise.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── AIChat.tsx
│   └── ui/Button.tsx
├── contexts/
│   └── LanguageContext.tsx    # Textos de interface PT/EN
├── services/
│   └── chat.ts                # Cliente do endpoint /api/chat
├── functions/
│   ├── _middleware.ts         # Head em português para robertoecf.com.br
│   └── api/chat.ts            # Endpoint do assistente (xAI)
└── public/
    ├── _routes.json           # Limita as Functions a "/" e "/api/*"
    └── profile.jpg
```

## Rodando localmente

**Pré-requisitos:** Node.js 20+

```bash
git clone git@github.com:robertoecf/portfolio.git
cd portfolio
npm install

# Só o frontend (sem chat), em http://localhost:3000
npm run dev

# Frontend + Functions (chat e middleware), em http://localhost:8788
cp .dev.vars.example .dev.vars   # preencha XAI_API_KEY
npm run pages:dev
```

## Variáveis de ambiente

| Variável | Obrigatória | Onde | Descrição |
|----------|-------------|------|-----------|
| `XAI_API_KEY` | Para o chat | `.dev.vars` local; secret no projeto Cloudflare Pages | Chave da API xAI |

Sem a chave o site funciona normalmente; apenas o chat responde com mensagem de indisponibilidade.

## Deploy

Cloudflare Pages com build command `npm run build` e output `dist`. Os dois domínios (`robertoecf.com` e `robertoecf.com.br`) apontam para o mesmo projeto.

Deploy manual:

```bash
npm run pages:deploy
```

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Roberto_Freitas-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/robertoecf/)
[![GitHub](https://img.shields.io/badge/GitHub-robertoecf-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/robertoecf)

## Licença

Uso pessoal. Para reutilizar, faça um fork e substitua o conteúdo de `content/profile.ts` pelo seu.
