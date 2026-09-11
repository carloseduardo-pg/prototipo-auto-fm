---
name: fm-local-run
description: >-
  Sobe o Portal FM: mockup HTML agora; depois do scaffold, Postgres, migrate,
  API Nest e UI Vite. Use when the user asks to run the project or open the prototype.
---

# FM — subir ambiente

## Agora (sem scaffold)

Abrir `referencia-ui/index.html` no navegador. Design system: `referencia-ui/design-system.html`.

## Depois do scaffold Distac

1. Postgres `:5432`
2. `.env` a partir de `.env.example` (database `fm_auto`)
3. `npm run install:all` · `npm run setup`
4. `npm run dev` → API `/api` + `/api/docs` e UI `:5190` (os dois juntos). Avulso: `dev:api` / `dev:web`.

Não usar login Distac (`vendedor@distac.local`) neste produto. Seed FM a definir no scaffold.

Smoke: `curl -s http://127.0.0.1:3000/api/health`
