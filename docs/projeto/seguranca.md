# Segurança — Portal FM Transportes

Herdado da base Distac. Não baixar a barra. Metodologia: [`docs/prottus/metodologia.md`](../prottus/metodologia.md).

---

## 1. Princípios

1. Defesa em profundidade — API valida; banco reforça; testes comprovam.
2. Secrets fora do git.
3. Mínimo privilégio — JWT curto; rotas autenticadas; cookies httpOnly.
4. Sensíveis nunca em claro na auditoria / logs.
5. Login sem credenciais pré-preenchidas.
6. **Credenciais GW/OTM/SFTP não entram neste repositório** — só na pasta guarda-chuva `FM Transportes/Acessos/`.

---

## 2. Autenticação (JWT)

| Item | Implementação |
|------|----------------|
| Token | Cookie **httpOnly** (`access_token`, `refresh_token`) — **não** localStorage |
| SameSite | `lax` |
| Secure | `true` quando `NODE_ENV=production` |
| Access | ~15m |
| Refresh | ~7d |
| Secrets | `JWT_*` obrigatórios, sem fallback fraco |
| FE | `credentials: 'include'`; Context só com perfil |

---

## 3. Proteção da API

Helmet · Throttler (300/min global; login 10/min; refresh 20/min) · CORS `CORS_ORIGIN` · ValidationPipe whitelist · `JwtAuthGuard` global · health público.

Rotas de emissão de CT-e **nunca** públicas.

---

## 4. Banco

Triggers BEFORE/AFTER + `audit_log`. Omitir `password_hash`. Campos fiscais/PII (motorista, placa, valores) — mascarar no log de aplicação; na auditoria DML, documentar o que entra em JSON.

---

## 5. Frontend

Sem token no localStorage. Sem emojis. Sem senha no HTML.

---

## 6. Integrações

| Risco | Mitigação |
|-------|-----------|
| Testes de emissão em produção | Neste protótipo **não** disparar CT-e real. Ambiente de teste do GW só na fase de integração |
| Token GW no git | Env only |
| Arquivo SFTP indevido | Falha explícita; não processar foto/PDF como NOTEFIZ sem decisão |

---

## 7. Produção (próximos)

Revogação de refresh no banco · TLS · secrets fortes · CSRF se o SameSite não bastar.
