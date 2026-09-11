# Arquitetura web — Portal FM Transportes

Referência de padrão: Modular Monolith + SPA (mesma decisão da base Distac / Prottus). Detalhe do artigo Wildnet: ver o Distac original; aqui só o que vale para a FM.

---

## 1. Decisão: Modular Monolith + SPA

| Critério | FM |
|----------|-----|
| Time pequeno / primeiro módulo | **Modular Monolith** |
| Portal interno | **SPA** React + Vite — não PWA |
| Microservices | Fora de escopo agora |
| Emissão fiscal | GW Webtrans permanece sistema de record; Nest orquestra coleta + reconciliação + chamada de API |

---

## 2. Camadas

```
┌─────────────────────────────────────────────┐
│ Presentation                                │
│  frontend/ — React SPA (tokens FM)          │
│  referencia-ui/ — mockup HTML (referência)  │
└──────────────────┬──────────────────────────┘
                   │ HTTPS + cookies httpOnly
┌──────────────────▼──────────────────────────┐
│ Business                                    │
│  backend/ — Nest: auth, shipments,          │
│  dashboard, issuance, users                 │
└──────────────────┬──────────────────────────┘
                   │ Prisma
┌──────────────────▼──────────────────────────┐
│ Data                                        │
│  PostgreSQL + triggers + audit_log          │
└─────────────────────────────────────────────┘
                   │
     OTM  ·  SFTP  ·  Excel  ·  GW API
```

O browser **nunca** fala com OTM/SFTP/GW — só com `/api`.

---

## 3. Segurança na borda da API

Igual Distac: `JwtAuthGuard` global, JWT httpOnly, Helmet, Throttler, ValidationPipe, CORS, prefixo `/api`, Swagger `/api/docs`.

Públicas: `GET /api/health`, `POST /api/auth/login|refresh|logout`.

---

## 4. Escalabilidade

Coleta das fontes **não** deve travar o request do operador. Caminho: job/processo de coleta → persistir snapshots → UI lê o banco. Cache/fila só com evidência ([`escalabilidade.md`](escalabilidade.md)).

---

## 5. Roadmap técnico consciente

- CI + TLS: A definir
- API GW / ambiente de teste do GW: fase seguinte (emissão real). Protótipo agora = fluxo da operação com dados do RPA/seed
