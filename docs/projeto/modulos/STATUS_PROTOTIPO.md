# Status do protótipo — Portal FM Transportes

**Atualizado:** 2026-09-11 (docs alinhadas aos DOCX de `FM Transportes/`)  
**Papel:** pasta do portal (protótipo) no guarda-chuva FM Transportes.

## Veredito

| Critério | Status |
|----------|--------|
| Kickoff documental (Caminho A) | OK — 2026-09-11 |
| Docs Prottus | Intactos (copiados do Distac) |
| Mockup visual | OK — `referencia-ui/` |
| Frontend React | OK — login, Início, Remessas, Usuários |
| Backend Nest | OK — auth JWT, shipments, dashboard, users |
| Banco Prisma | OK — `fm_auto`, seed de 18 remessas |
| Integração API GW | Fora do 1º entregável (POST /issue registra prévia e devolve 503 explícito) |
| Coleta OTM/SFTP neste repo | Fora — RPA (Vini); POST /shipments/collect devolve 501 |
| Manifesto | Fora do 1º entregável (menu cinza) |
| Homolog/prod / CI | A definir |

## Camadas

| Camada | Status |
|--------|--------|
| Docs Prottus | Intactos |
| Docs projeto | Relidos os DOCX de `FM Transportes/` (2026-09-11) + scaffold |
| Referência UI | Completa (login, início, remessas, DS) |
| Frontend | React + Vite — tokens FM |
| Backend | Nest `/api` + Swagger `/api/docs` |
| Banco | Prisma + triggers/audit |
| Cursor | OK — `fm.mdc` + skills `fm-*` + agent Cadu |

## Rotas UI → API

| UI | API |
|----|-----|
| `/login` | `/api/auth/*` |
| `/` | `/api/dashboard/summary` |
| `/remessas` | `/api/shipments` |
| Prévia / emitir | `/api/shipments/:id/preview` · `POST /api/shipments/:id/issue` |
| `/usuarios` | `/api/users` |

## Como subir

```bash
cp .env.example .env && cp .env backend/.env
npm run install:all
npm run setup
npm run dev        # API :3000/api + UI :5190
```

Login seed (não pré-preenchido na tela): `operador@fm.local` / `fm123456`.
