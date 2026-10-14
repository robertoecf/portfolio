import type { Lang } from './profile';

export const UI = {
  en: {
    nav: { work: 'Work', career: 'Career', ask: 'Ask', contact: 'Contact' },
    hero: {
      kicker: 'Financial planner · Software builder',
      title: 'I’ve spent eight years planning family wealth.',
      titleAccent: 'Now I build the software my profession still doesn’t have.',
      lede: '',
      sticker: 'CFP® who ships',
      cta: 'See the work',
      ctaHref: '#work',
      secondary: 'Ask about Roberto',
      secondaryHref: '#chat',
    },
    work: {
      label: 'Index of work',
      more: 'Also built',
      pinned: 'Pinned · open source',
      all: 'All repositories on GitHub',
    },
    career: {
      label: 'Career',
      education: 'Education',
      credentials: 'Credentials',
      languages: 'Languages',
    },
    chat: {
      label: 'Ask',
      title: 'Ask about Roberto',
      subtitle: 'An AI assistant that answers from his résumé: career, projects, how he works.',
      you: 'You',
      assistant: 'Assistant',
      placeholder: 'e.g. What is Wealthuman OS?',
      send: 'Send',
      disclaimer: 'AI can make mistakes. For anything important, talk to Roberto.',
      initialMessage: 'Hi. I can answer questions about Roberto’s career, his projects and how he works. What would you like to know?',
      processing: 'Thinking…',
    },
    footer: {
      title: 'Let’s talk?',
      desc: 'Product, AI for finance, or the software behind wealth planning.',
      mark: 'CFP® is a mark owned by FPSB',
    },
  },
  pt: {
    nav: { work: 'Trabalho', career: 'Trajetória', ask: 'Pergunte', contact: 'Contato' },
    hero: {
      kicker: 'Planejador financeiro · Atendendo clientes desde 2018',
      title: 'Cuido do patrimônio de famílias há oito anos.',
      titleAccent: 'Com método, dados e as ferramentas que eu mesmo construo.',
      lede: 'Meu trabalho é ajudar pessoas e famílias a tomarem decisões melhores e alcançarem seus objetivos de vida.',
      sticker: '',
      cta: 'Agende uma conversa',
      ctaHref: '#contact',
      secondary: 'Ver o trabalho',
      secondaryHref: '#work',
    },
    work: {
      label: 'Índice do trabalho',
      more: 'Também construí',
      pinned: 'Fixado · open source',
      all: 'Todos os repositórios no GitHub',
    },
    career: {
      label: 'Trajetória',
      education: 'Formação',
      credentials: 'Certificações',
      languages: 'Idiomas',
    },
    chat: {
      label: 'Pergunte',
      title: 'Pergunte sobre o Roberto',
      subtitle: 'Um assistente de IA que responde a partir do currículo dele: carreira, projetos e forma de trabalhar.',
      you: 'Você',
      assistant: 'Assistente',
      placeholder: 'Ex.: O que é o Wealthuman OS?',
      send: 'Enviar',
      disclaimer: 'A IA pode errar. Para decisões financeiras, converse com o Roberto.',
      initialMessage: 'Olá. Posso responder perguntas sobre a carreira do Roberto, os projetos dele e a forma como ele trabalha. O que você quer saber?',
      processing: 'Pensando…',
    },
    footer: {
      title: 'Vamos conversar?',
      desc: 'Se você tem qualquer dúvida sobre planejamento financeiro, acumulação, aposentadoria, perpetuidade, sucessão, impostos ou investimentos, já vale o papo.',
      mark: 'A marca CFP® pertence à FPSB',
    },
  },
};

/** Returns a lookup for dotted keys, e.g. t('hero.title'). */
export const translator = (lang: Lang) => (path: string): any =>
  path.split('.').reduce((obj: any, key) => obj && obj[key], UI[lang]);
