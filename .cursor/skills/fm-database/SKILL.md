---
name: fm-database
description: >-
  PostgreSQL fm_auto, Prisma, triggers, audit_log. Use when changing schema,
  migrations, seed, or shipment/source tables.
---

# FM — banco

Database local `fm_auto`. Domínio inglês: `users`, `shipments`, snapshots, `audit_log` — **não** `clients`/`orders` Distac.

Triggers: audit + regras que a API não deve burlar (ex.: não marcar emitido sem registro de confirmação).

PII da planilha (motorista, placa) não vai para dumps no git.
