# Plano: migrar o portfolio para Astro

## Goal

robertoecf.com e robertoecf.com.br servidos por um build estático do Astro, com o mesmo visual, o mesmo texto e o mesmo SEO de hoje. O único JavaScript no navegador é o do chat. O deploy continua no projeto Pages atual. A migração para Workers vem depois, numa fase separada.

Critério de pronto:

- `astro check` e `astro build` passam, e o build das Functions também.
- O HTML de `/` (EN) e de `/pt/` (PT) já traz o texto da página, sem depender de JavaScript.
- robertoecf.com abre em inglês e robertoecf.com.br abre em português, cada um com o próprio `<head>` (title, description, canonical, og, JSON-LD).
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `/knowledge/en` e `/knowledge/pt` saem idênticos aos de produção (diff vazio).
- O chat responde nos dois idiomas.
- As capturas em 1440px e 375px batem com a produção atual.

## Fato que muda a ordem

O adaptador `@astrojs/cloudflare` não suporta mais o Cloudflare Pages desde a v13. A versão atual é a v14, com Astro 7.3. Por isso a fase 1 usa Astro sem adaptador, gerando só arquivos estáticos. O chat e o roteamento por domínio continuam nas Pages Functions que já existem. O adaptador entra apenas na fase 2, junto com Workers.

## Fase 1: Astro estático no Pages

### Estrutura

- `astro.config.mjs`:
  - integração `@astrojs/react`, que serve só para a ilha do chat;
  - `@tailwindcss/vite` em `vite.plugins`;
  - `site: 'https://robertoecf.com'`.
- `src/layouts/Base.astro`: `<html lang>`, fontes, CSS e `headTags(lang)` de `content/seo.ts`.
- `src/pages/index.astro` (EN) e `src/pages/pt/index.astro` (PT). As duas páginas montam a mesma `Home` com `lang`.
- As seções continuam como componentes React (Masthead, Hero, Work, Career, Footer, SocialLinks), mas o Astro as renderiza só no servidor, sem diretiva `client:`. O HTML sai pronto e o navegador não recebe JavaScript delas. Reescrever em `.astro` não mudaria nenhum comportamento e aumentaria o diff.
- `components/sections/AIChat.tsx` continua em React, como ilha `client:visible`, e recebe `lang` e os textos por props.
- Os textos de interface saem de `contexts/LanguageContext.tsx` para `content/ui.ts`, como um objeto `UI[lang]`. O React Context deixa de existir.
- Um endpoint estático `src/pages/[...file].ts` gera os arquivos de `staticSeoFiles()`, nos mesmos caminhos de hoje.

### Idioma por domínio

- O build gera duas páginas: `/` em inglês e `/pt/` em português.
- `functions/_middleware.ts` passa a servir `/pt/` quando o host termina em `.com.br` e o caminho é `/` ou `/index.html`, usando `env.ASSETS.fetch`. Hoje ele reescreve o `<head>`; o código novo é menor.
- O seletor PT/EN vira link para o outro domínio (`SITE_URL`), em vez de trocar o texto na mesma página. Cada idioma já tem uma narrativa própria, então a troca de domínio combina com o conteúdo.
- O `canonical` de `/pt/` aponta para robertoecf.com.br, o que evita conteúdo duplicado no robertoecf.com.

### Removido

`index.html`, `index.tsx`, `App.tsx`, `vite.config.ts`, `contexts/LanguageContext.tsx` e `localizeIndexHtml` com os marcadores de SEO em `content/seo.ts`.

### Sem mudança

- `content/profile.ts`;
- os geradores de `content/seo.ts`;
- `functions/api/chat.ts`;
- `services/chat.ts`;
- o secret `CEREBRAS_API_KEY`;
- o comando de deploy (`wrangler pages deploy dist`).

### Dependências

- Entram `astro` e `@astrojs/react`, autorizados pelo Roberto em 2026-10-13.
- Saem `vite` e `@vitejs/plugin-react`, porque o Astro já traz o Vite.
- O gerenciador continua o npm, porque o repositório usa `package-lock.json`.

### Verificação

1. `astro check`, `astro build` e `wrangler pages functions build`.
2. Comparar os arquivos de SEO com a produção: `curl` de cada arquivo e `diff`.
3. Testar o roteamento por domínio localmente, com `wrangler pages dev dist`. Chamar `/` e `/index.html` com `Host: robertoecf.com.br` e `Host: robertoecf.com`. Em cada resposta, verificar o idioma do corpo, o `<html lang>`, o canonical e o JSON-LD. Testar só `/pt/` não basta: ele não passa pelo middleware, que é a peça nova. Se o `wrangler` não repassar o host, a verificação acontece em produção, logo depois do deploy. Nesse caso, o rollback para o deploy anterior fica preparado com antecedência.
4. Fazer o deploy de preview em uma branch e checar `<head>` e texto no HTML, em EN e PT.
5. Testar o chat no preview com `curl`.
6. Tirar capturas em 1440px e 375px e comparar com a produção.
7. Fazer o review adversarial do diff e, depois, o merge com o OK do Roberto.

### Riscos

- No preview `*.pages.dev`, o host não termina em `.com.br`. Por isso o PT é testado direto em `/pt/`.
- Se o Vite 8 do Astro 7 não aceitar o `@tailwindcss/vite` 4.3.3, é preciso subir a versão do plugin. Isso ainda não foi verificado.

## Fase 2: Workers (depois da fase 1 no ar)

Decisão de 2026-10-14: sem o adaptador `@astrojs/cloudflare`. O site continua 100% estático; um Worker próprio com static assets cuida só do chat e do idioma por domínio. O adaptador só traria renderização sob demanda, que o site não usa, e uma dependência a mais.

1. `wrangler.jsonc`: Worker `portfolio`, assets em `dist/` com binding `ASSETS`, `run_worker_first` para `/`, `/index.html` e `/api/*`, e `build.command` = `npm run build`.
2. `worker/index.ts`: `/api/chat` (só POST) chama `worker/chat.ts`; em `.com.br`, `/` e `/index.html` servem `/pt/`; o resto vai para os assets.
3. Saem `functions/` e `public/_routes.json`.
4. Secret `CEREBRAS_API_KEY` no Worker a partir do Doppler; teste em `portfolio.robertoecf.workers.dev`.
5. Domínios: tirar `robertoecf.com` e `robertoecf.com.br` do projeto Pages e ligar como Custom Domains do Worker. É o único passo com risco de queda, e ele é reversível (devolver os domínios ao Pages).
6. Workers Builds já está ligado ao repositório com o Worker `portfolio`: o deploy fica automático a cada push na `main`.
7. Apagar o projeto Pages só depois de alguns dias estável.

Diferenças aceitas em relação ao Pages: redirect de `*.html` passa de 308 para 307 (padrão do Workers assets), e caminho inexistente responde 404 em vez de 200 com a home.
