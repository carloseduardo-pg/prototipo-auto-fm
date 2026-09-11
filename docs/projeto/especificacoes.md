# Especificações técnicas — Portal FM Transportes

Documento do **produto**. Metodologia / qualidade: [`docs/prottus/metodologia.md`](../prottus/metodologia.md) — **não** misturar decisões de stack lá.

Segurança: [`seguranca.md`](seguranca.md) · Escalabilidade: [`escalabilidade.md`](escalabilidade.md) · Arquitetura: [`ARQUITETURA-WEB.md`](ARQUITETURA-WEB.md).

---

## 1. Arquitetura

| Decisão | Valor |
|---------|-------|
| Estilo | **Modular Monolith** + SPA (padrão MVP Prottus / Distac) |
| Repositório | Mono-repo (`prototipo-auto-fm`) |
| Containers | **Não** — Postgres e app locais (sem Docker neste padrão) |
| Papel do repo | Protótipo do portal FM — primeiro módulo: remessas / CT-e |
| Sistemas externos | GW Webtrans (emissão), Oracle Logistics / OTM (coleta), SFTP (notas), planilha Excel (conferência transitória) |

---

## 2. Stack (confirmada — herança Distac)

| Camada | Tecnologia |
|--------|------------|
| Frontend | React · Vite · TypeScript |
| Backend / API | NestJS · TypeScript |
| Banco | PostgreSQL |
| ORM | Prisma |
| Validação API | class-validator + ValidationPipe |
| HTTP client FE | `fetch` com `credentials: 'include'` |
| Auth | JWT access + refresh em cookie **httpOnly** |
| UI | CSS variables a partir de `referencia-ui/assets/tokens.css` |
| Filas / cache | Nenhum no escopo atual — coleta RPA/jobs: ver [`escalabilidade.md`](escalabilidade.md) |

| # | Tecnologia | Papel |
|---|------------|--------|
| 1 | TypeScript | FE e BE |
| 2 | React + Vite | SPA |
| 3 | NestJS | API REST modular |
| 4 | Prisma | Schema, migrations, client tipado |
| 5 | PostgreSQL | Persistência + triggers |
| 6 | JWT httpOnly | Sessão |
| 7 | Helmet + Throttler | Hardening HTTP |

Equivalência de telas: [`padrao-aplicacoes.md`](padrao-aplicacoes.md). Referência visual: `referencia-ui/`.

---

## 3. Infra e ambientes

| Item | Valor |
|------|-------|
| Local | Postgres `127.0.0.1:5432` + API `:3000` + UI `:5190` |
| Homolog / prod | A definir. Ambiente de teste do GW (sandbox) só importa quando formos emitir de verdade — não bloqueia este protótipo |
| CI/CD | A definir |
| Docs operacionais do banco | [`database/`](../../database/) |

### PostgreSQL (local)

| Item | Valor |
|------|-------|
| Host | `127.0.0.1` |
| Porta | `5432` |
| Usuário / senha | `postgree` / `postgree` (somente desenvolvimento) |
| Database | `fm_auto` |
| Triggers / audit | a criar no scaffold (`database/sql/03-triggers.sql`) |

---

## 4. Autenticação e integrações

| Item | Valor |
|------|-------|
| Auth | JWT em cookies httpOnly (`access_token`, `refresh_token`) |
| Usuário | Tabela `users` (plataforma) |
| Integrações | GW Webtrans API (“conhecimento”); OTM (duas telas: custos + dados do CT-e); SFTP (NOTEFIZ); planilha Excel de controle |

Detalhes e riscos: [`seguranca.md`](seguranca.md). Cobertura de campos da API do GW: **A definir** (pode invalidar emissão ponta a ponta).

---

## 5. Convenções deste repo

| Área | Convenção |
|------|-----------|
| Pastas | `frontend/`, `backend/`, `database/`, `docs/`, `imagens/`, `referencia-ui/` |
| Env (nomes) | `DATABASE_URL`, `JWT_*`, `PORT`, `CORS_ORIGIN`, `NODE_ENV`, `SEED_DEMO_USER_ON_BOOT`; FE opcional `VITE_API_URL`; integrações `GW_*`, `OTM_*`, `SFTP_*` (sem secrets no git) |
| Auth na API | `JwtAuthGuard` **global**; rotas públicas só com `@Public()` |
| Tabelas | domínio inglês (`shipments`, `source_snapshots`, …) + `users`, `audit_log` |
| UI | Português; sem emojis; `Icon` component |
| Tokens visuais | `--fm-blue` `#0079FC` — ver `design-system.md` |
| Secrets | Nunca no git. Acessos reais só na pasta guarda-chuva `FM Transportes/Acessos/` |

---

## 6. Restrições de domínio

- GW permanece o emissor fiscal; esta plataforma não substitui o GW.
- Não simular digitação na UI do GW.
- Prévia humana obrigatória antes do POST de emissão.
- Arquivo SFTP fora de NOTEFIZ: falha explícita, nunca silêncio.
- Metodologia Prottus em `docs/prottus/` permanece intacta.
- Não pesquisar CNPJ/site/Instagram da FM por busca — única fonte institucional: LinkedIn `fmtransp` + logos em `imagens/`.
