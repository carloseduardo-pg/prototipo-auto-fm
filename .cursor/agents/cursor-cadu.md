# Cursor — Cadu

**Repositório:** prototipo-auto-fm — Portal FM Transportes  
**Última atualização:** 2026-09-11 (docs relidas do guarda-chuva)  
**Local:** `.cursor/agents/cursor-cadu.md`

---

## Estado atual do projeto (snapshot)

| Item | Valor |
|------|-------|
| Cliente | FM Transportes |
| Sistema | Portal de operações (protótipo) |
| Stack | React+Vite+TS · NestJS · Prisma · PostgreSQL · JWT httpOnly |
| Status | Scaffold rodável — login, Início, Remessas (seed), Usuários. Sem GW / sem coleta nativa |
| UI | React (`frontend/`) + mockup `referencia-ui/` |

---

## Histórico de sessões

### 2026-09-11 — Kickoff documental via documentacao-base

**Objetivo:** criar a pasta `prototipo-auto-fm` sintetizando o guarda-chuva FM, o mockup visual e o modelo Distac.

**Decisões:**
- Caminho A Prottus: docs preenchidos; `docs/prottus/` e rules Prottus intactos.
- Não scaffoldar Distac ainda (domínio de vendas não deve ir para a FM).
- Mockup copiado para `referencia-ui/`.
- Credenciais GW/OTM fora deste repo.
- Marca: `#0079FC` / asfalto; logos oficiais em `imagens/`.

**Arquivos:** `docs/projeto/*`, `.cursor/rules/projeto/fm.mdc`, README do produto, `.env.example`.

### 2026-09-11 — Recorte do 1º entregável

**Decisões:**
- Manifesto fora.
- API GW e ambiente de teste do GW: depois; agora o fluxo operacional.
- Sem CNPJ/endereço neste protótipo.
- Sem “central da empresa por setor”: só expedição (Início + Remessas).
- Dados de remessa: RPA do Vini + seed; este repo não constrói o coletor.

---

### 2026-09-11 — Scaffold Distac → domínio remessas

**Objetivo:** código mínimo rodável sem trazer vendas Distac.

**Feito:**
- Copiada infra Distac (Nest, Vite, JWT httpOnly, Helmet, Throttler, Prisma, audit).
- Schema `users` / `shipments` / `source_snapshots` / `cte_previews` / `cte_issuances` / `collection_runs` / `audit_log`.
- Seed: `operador@fm.local` / `fm123456` + 18 remessas do mockup.
- UI: login, Início, Remessas (prévia + Emitir desabilitado se fontes não conferem), Usuários.
- POST `/shipments/:id/issue` registra prévia e devolve 503 explícito (GW fora).
- POST `/shipments/collect` 501 explícito (RPA / Vini).

**Arquivos:** `frontend/`, `backend/`, `database/`, `tests/`, `package.json`.

### 2026-09-11 — Releitura das fontes `FM Transportes/`

**Objetivo:** as sínteses em `docs/projeto/documentacao-base/` estavam rasas; vários docs do projeto ainda falavam em “scaffold por fazer”.

**Feito:**
- Releu Relatório Geral, Documento Base v4, ata 01/09, campo 19/08, Plano MTO (arquivo V2 / conteúdo v4) e cabeçalhos da planilha.
- Reescreveu as sínteses e criou `08-plano-mto.md`.
- Alinhou contexto, requisitos, mapa, GATE, DOMINIO-TECNICO, USAR-COMO-BASE e especificações ao estado atual + ao que os DOCX realmente dizem.
- Não copiou senhas nem PII.

## Pendências abertas

- Combinar contrato de dados com o RPA do Vini (formato da remessa / três fontes)
- API GW e Manifesto: backlog, não agora
- Remote GitHub: `https://github.com/carloseduardo-pg/prototipo-auto-fm.git`

## Como atualizar

Append no Histórico. Manter snapshot e pendências atualizados.  
Não registrar stack na metodologia Prottus — só em `especificacoes.md`.
