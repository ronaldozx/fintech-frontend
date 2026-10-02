# Fintech Frontend

Interface de um app de finanças pessoais que lê as contas do próprio usuário via **Open Finance** (Pluggy) e mostra para onde o dinheiro está indo: fluxo de caixa, orçamentos, metas, agenda de contas, investimentos e um assistente baseado em regras.

Backend: [fintech-backend](https://github.com/ronaldozx/fintech-backend)

## Telas

| Rota | Tela |
| --- | --- |
| `/home` | Visão geral: saldo do período, fluxo de caixa, despesas por categoria e transações recentes |
| `/transacoes` | Busca e filtros, edição, lançamento manual, conciliação de transferências e exportação em CSV |
| `/contas` | Saldos, cheque especial e limite dos cartões, direto dos bancos |
| `/orcamentos` | Orçamentos por categoria e metas de economia |
| `/insights` | Taxa de poupança, projeção do mês, categorias que mais mudaram, cobranças recorrentes e gastos fora do padrão |
| `/agenda` | Próximos vencimentos (faturas e cobranças fixas) |
| `/investimentos` | Carteira, alocação por tipo e cobertura da reserva de emergência |
| `/assistente` | Sugestões por regras a partir dos seus dados, sem IA externa |
| `/configuracoes` | Perfil, senha, exportação dos dados e exclusão da conta |

Também há um sino de notificações (orçamento estourado, metas, saúde da sincronização) e a conexão de bancos pelo widget da Pluggy.

## Stack

- React 19 e TypeScript
- Vite
- styled-components
- React Router
- Axios
- `react-pluggy-connect` para o fluxo de conexão de bancos
- ESLint

Os gráficos são SVG próprios, sem biblioteca de charts. O layout se ajusta à altura da janela para evitar rolagem de página em telas a partir de 1024 x 620.

## Como rodar

Pré-requisitos: Node 20.19+ (ou 22.12+) e o [backend](https://github.com/ronaldozx/fintech-backend) rodando em `http://localhost:8080`.

```bash
npm install
npm run dev
```

O app abre em `http://localhost:5173`.

Para apontar para outra API, crie um `.env.local`:

```
VITE_API_URL=https://sua-api.exemplo.com/
```

Outros comandos:

```bash
npm run lint     # ESLint
npm run build    # checagem de tipos + build de produção
npm run preview  # serve o build localmente
```

## Estrutura

```
src
├── pages        uma pasta por rota
├── modules      blocos de dashboard (cashflow, categorias, orçamentos...)
├── components   componentes compartilhados (frame, tabela, modal, botões...)
├── hooks        busca de dados e utilidades de interface
├── services     chamadas à API
├── context      autenticação
├── styles       tema, estilos globais e cores dos gráficos
├── types        tipos da API
└── utils        formatação e regras puras
```

## Design

Tema escuro em grafite com uma única cor de destaque (azul), bordas de 1px, sombras suaves e gráficos em tons sóbrios. As animações respeitam `prefers-reduced-motion`.

## Aviso

O projeto é educacional. As sugestões do assistente e a tela de investimentos não são recomendação financeira nem de investimento.
