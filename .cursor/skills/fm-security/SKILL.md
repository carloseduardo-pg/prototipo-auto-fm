---
name: fm-security
description: >-
  JWT httpOnly, Helmet, throttler, ValidationPipe, audit sem password_hash,
  sem senhas de GW/OTM no git. Use when changing auth, CORS, login, secrets, or issuance.
---

# FM — segurança

Obrigatório: cookies httpOnly; nunca localStorage; `JwtAuthGuard` global; login sem pré-preencher; emissão de CT-e autenticada; `.env` gitignored; acessos reais só na pasta guarda-chuva `Acessos/`.

Doc: `docs/projeto/seguranca.md`.
