# Padrão de aplicações — Portal FM Transportes

Métricas de construção **deste projeto**. Toda nova tela: este arquivo + catálogo [`docs/prottus/aplicacoes/`](../prottus/aplicacoes/) + mockup [`referencia-ui/`](../../referencia-ui/).

Marca: [`design-system.md`](design-system.md). Stack: [`especificacoes.md`](especificacoes.md).

---

## 1. Plataforma

| Item | Valor |
|------|-------|
| Plataforma | Web custom (React + NestJS) — não Scriptcase |
| Conexão padrão (BD) | PostgreSQL via `DATABASE_URL` |
| App de segurança / login | `/login` + API auth JWT (cookies httpOnly) |
| App inicial pós-login | Shell → Início (`/`) |
| Menu | Shell vertical: Início, Remessas; bloqueados: Manifestos, Indicadores, Automações |

---

## 2. Tema visual

| Item | Valor |
|------|-------|
| Espelha tokens de | `docs/projeto/design-system.md` + `referencia-ui/assets/tokens.css` |
| Primária | `#0079FC` |
| Header fundo / texto | `#FFFFFF` / `#3A3A38` |
| Tipografia | stack de sistema (SF Pro / Segoe / Inter) |
| Logo | `imagens/fm-logo.png` · marca `imagens/fm-mark.png` |

---

## 3. Defaults de construção

| Família (catálogo Prottus) | Equivalente neste projeto |
|----------------------------|---------------------------|
| Formulário | Prévia de emissão (drawer) — `frm_previa_cte` |
| Consulta / relatório | Tabela de remessas — `grid_remessa` |
| Dashboard | Início `/` com métricas da última coleta |
| Menu | `menu_main` — ver mockup `inicio.html` |
| Gráfico / calendário | Fora do escopo inicial |
| i18n | pt-BR |

---

## 4. Padrões de grid / tabela

| Item | Valor |
|------|-------|
| Orientação | Horizontal |
| Quicksearch | Sim (remessa, nota, destino) |
| Paginação | 20 (quando a lista deixar de ser “do dia”) |
| Colunas obrigatórias (Remessas) | Remessa, NF, Destino, Fontes (3), Situação, Valor do frete, ação |
| Header de tabela | tokens FM (não o azul Distac `#60A0D8`) |
| API | Inglês (`/api/shipments`); rotas UI em português (`/remessas`) |

### Exports

| Formato | Consulta | Resumo |
|---------|----------|--------|
| PDF | A definir | Não |
| Excel | A definir | Não |

---

## 5. Nomenclatura

| Prefixo | Uso |
|---------|-----|
| `frm_` | Formulários / prévia |
| `grid_` | Listagens |
| `menu_` | Shell |
| `blank_` | Login |

Rotas: `/login`, `/`, `/remessas`, `/usuarios`.  
API: `/api/auth`, `/api/dashboard/summary`, `/api/shipments`, `/api/users`.

---

## 6. Exceções

1. Drawer de prévia (não página cheia) — espelha `referencia-ui/remessas.html`.
2. Desvio pontual: `docs/projeto/aplicacoes/NN-*.md`.
3. Não alterar `docs/prottus/aplicacoes/`.
