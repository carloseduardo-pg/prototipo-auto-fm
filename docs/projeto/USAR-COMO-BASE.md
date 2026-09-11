# Usar a base Distac neste projeto FM

Este repositório **não** é a Distac. É o portal FM, iniciado a partir do modelo [`Modelo-Prottus---Distribuidora-Distac-main`](../../../Modelo-Prottus---Distribuidora-Distac-main/) (guarda-chuva).

Metodologia empresa (não alterar): [`../prottus/`](../prottus/).  
Fontes de negócio FM: [`documentacao-base/`](documentacao-base/).

---

## O que já foi feito

1. Copiados `docs/prottus/` e `.cursor/rules/prottus/` **intactos**.
2. Preenchidos `docs/projeto/*` com o domínio FM (releitura das fontes 2026-09-11).
3. Rule `.cursor/rules/projeto/fm.mdc`.
4. Mockup visual em `referencia-ui/` (origem: `modelo-inicial/`).
5. Logos em `imagens/`.
6. Scaffold Nest + React + Prisma (`fm_auto`) com remessas — **sem** domínio de vendas Distac.

## O que se manteve da Distac

- JWT httpOnly + Helmet + rate limit + ValidationPipe
- Paginação e `/dashboard/summary`
- `database/` scripts + triggers/`audit_log`
- `tests/load` (cenários FM)
- ConfigModule + Swagger `/api/docs`
- Skills prefixadas `fm-*`

## O que se trocou

- Marca / tokens / logo (`#0079FC`, não o vermelho Distac)
- Schema Prisma (`shipments`, não `orders`)
- Módulos Nest e páginas React
- Título Swagger: Portal FM Transportes
- `.env` com `fm_auto`
- `SEED_DEMO_USER_ON_BOOT=false` em ambiente de cliente

## Critério de pronto (código)

- [x] Login seguro
- [x] `FLUXO-APLICACAO.md` batendo com arquivos reais
- [x] Lista de remessas paginada + summary
- [x] Prévia + bloqueio de emissão
- [x] Triggers/audit
- [x] Swagger ok
- [ ] Smoke executável com API no ar (`npm run test:smoke`)
