# Portal FM Transportes (`prototipo-auto-fm`)

Portal interno de operações da **FM Transportes**, desenvolvido pela **Prottus**.

Primeiro caso de uso: **cerne da expedição** — remessas do dia, cruzamento das três fontes, prévia humana e motorista. Manifesto e disparo real no GW ficam para depois. Os dados de remessa vêm de seed / RPA (Vini).

Este repositório é o **protótipo do portal**. Abra **esta pasta** no Cursor (não o guarda-chuva). Comece por `docs/projeto/`.

O scaffold React + NestJS + Prisma está gerado (domínio remessas, tokens FM). Mockup HTML permanece em [`referencia-ui/`](referencia-ui/).

---

## O que já dá para abrir hoje

O mockup navegável (HTML/CSS) está em [`referencia-ui/`](referencia-ui/). Abra `referencia-ui/index.html` no navegador.

| Tela | Arquivo |
|------|---------|
| Login | `referencia-ui/index.html` |
| Início | `referencia-ui/inicio.html` |
| Remessas | `referencia-ui/remessas.html` |
| Design system | `referencia-ui/design-system.html` |

Regras visuais que não se negociam: [`docs/projeto/design-system.md`](docs/projeto/design-system.md).

---

## Objetivo

Neste protótipo o operador informa o motorista e **confirma a prévia**. A coleta das fontes é o RPA do Vini. Emitir de verdade no GW é fase seguinte. Manifesto fora da 1ª entrega.

## Stack (confirmada — padrão Prottus Distac)

React + Vite + TypeScript · NestJS · Prisma · PostgreSQL · JWT em cookies httpOnly.

Detalhe: [`docs/projeto/especificacoes.md`](docs/projeto/especificacoes.md).

## Como rodar

```bash
cp .env.example .env && cp .env backend/.env
npm run install:all
npm run setup          # DB + migrate + seed
npm run dev            # API :3000/api + UI :5190 (Ctrl+C para os dois)
```

Login seed (campo vazio na tela): `operador@fm.local` / `fm123456`.

Mockup HTML (referência visual): `referencia-ui/index.html`.

Variáveis: copiar [`.env.example`](.env.example) para `.env` e `backend/.env`. Nunca versionar secrets reais. Credenciais de GW/OTM/SFTP ficam **somente** na pasta guarda-chuva `FM Transportes/Acessos/` — não entram neste repositório.

---

## Documentação

| Comece por | Arquivo |
|------------|---------|
| Contexto e escopo | [`docs/projeto/contexto.md`](docs/projeto/contexto.md) |
| Tech lead | [`docs/projeto/DOMINIO-TECNICO.md`](docs/projeto/DOMINIO-TECNICO.md) |
| Fluxo da aplicação | [`docs/projeto/FLUXO-APLICACAO.md`](docs/projeto/FLUXO-APLICACAO.md) |
| Segurança | [`docs/projeto/seguranca.md`](docs/projeto/seguranca.md) |
| Escalabilidade | [`docs/projeto/escalabilidade.md`](docs/projeto/escalabilidade.md) |
| Domínio | [`docs/projeto/mapa-entidades.md`](docs/projeto/mapa-entidades.md) |
| Status | [`docs/projeto/modulos/STATUS_PROTOTIPO.md`](docs/projeto/modulos/STATUS_PROTOTIPO.md) |
| Metodologia Prottus (**não editar**) | [`docs/prottus/`](docs/prottus/) |
| Origem da base Distac | [`docs/projeto/USAR-COMO-BASE.md`](docs/projeto/USAR-COMO-BASE.md) |
| Fontes de descoberta | [`docs/projeto/documentacao-base/`](docs/projeto/documentacao-base/) |

## Equipe

| Quem | Papel |
|------|--------|
| Sidney Feijó (Prottus) | Liderança técnica e estratégica |
| Charllys (Prottus) | Execução técnica |
| Cadu (Prottus) | Ponto focal, relacionamento e tradução de negócio |
| Paulo e Rodrigo (FM) | Sócios — priorização |
| Gutemberg (FM) | Coordenador da operação — validação de regra de negócio |

FM Transportes × Prottus
