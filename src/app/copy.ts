/**
 * All visible copy for the landing lives here. Edit and redeploy.
 * Keep it Portuguese-first. EN can come later as a sibling export.
 *
 * NOTE: this is placeholder copy v0 — final wording lands when the M4 offer
 * doc on COCA-1 is ready. Pricing was set to a defensible market default
 * (R$ 4.500 / sprint of 2 weeks) until the board confirms the real number.
 */

export const ceoEmail = 'contato@carlosocarvalho.com.br';

export const copy = {
  meta: {
    title: 'COCA — desbloqueie seu projeto open source em 2 semanas',
    description:
      'A gente ajuda mantenedores de OSS a resolver o problema técnico ou de crescimento que está travando o projeto. Sprint fechado de 2 semanas, R$ 4.500.',
  },
  hero: {
    eyebrow: 'Para mantenedores de open source e indie hackers',
    title: 'Seu projeto open source está travado?',
    subtitle:
      'A gente entra junto, resolve um problema crítico e te entrega um plano de crescimento. Em 2 semanas, com PR mergeado — não slide.',
    primaryCta: 'Conta pra gente seu problema',
  },
  deliverables: {
    title: 'O que você recebe num sprint',
    items: [
      'Diagnóstico técnico em 48h, entregue como PR aberto no seu repo (não como apresentação).',
      'Um problema crítico resolvido em 2 semanas, com código mergeado e teste.',
      'Plano de crescimento com 3 experimentos prontos para rodar nos próximos 30 dias.',
      'Acompanhamento semanal por 1 mês depois do sprint, para destravar o que aparecer.',
    ],
  },
  price: {
    title: 'Preço',
    amount: 'R$ 4.500',
    cadence: 'por sprint de 2 semanas, escopo fechado',
    notes: [
      'Sem surpresa de orçamento. O escopo é fechado antes de começar.',
      'Se ao final do sprint você não viu valor, a gente não cobra.',
    ],
  },
  form: {
    title: 'Conta pra gente o que está travando',
    helper:
      'Resposta em até 1 dia útil. Sem spam, sem newsletter — só uma conversa pra entender se faz sentido.',
    fields: {
      name: { label: 'Seu nome', placeholder: 'Como te chamamos?' },
      projectUrl: {
        label: 'URL do projeto',
        placeholder: 'https://github.com/seu-usuario/seu-projeto',
      },
      problem: {
        label: 'Qual é o problema?',
        placeholder:
          'Pode ser técnico (build quebrado, arquitetura travando o time) ou de crescimento (não sei como achar usuários).',
      },
      email: { label: 'Seu e-mail', placeholder: 'voce@exemplo.com' },
    },
    submit: 'Enviar',
    submitting: 'Enviando…',
    success:
      'Recebido. A gente responde em até 1 dia útil no e-mail que você deixou.',
    error:
      'Algo falhou no envio. Tenta de novo ou manda direto pra ' + ceoEmail + '.',
  },
  thankYou: {
    title: 'Recebido. A gente já leu.',
    body:
      'Obrigado por contar pra gente o que está travando. Em até 1 dia útil você recebe uma resposta no e-mail que deixou — direto do CEO, não bot, não autoresponder.',
    backCta: 'Voltar para a página inicial',
  },
  footer: {
    repoLabel: 'Código deste site',
    repoUrl: 'https://github.com/carlosocarvalho/coca',
    contactLabel: 'Falar direto',
    contactEmail: ceoEmail,
  },
} as const;
