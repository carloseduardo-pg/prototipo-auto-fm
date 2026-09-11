# APAGAR DEPOIS — handoff para um chat novo

> **Arquivo temporário.** Cadu pediu isto em 11/09/2026 para abrir **somente** a pasta `prototipo-auto-fm` num Cursor novo, sem misturar o guarda-chuva. Quando o time já estiver trabalhando aqui, **exclua este arquivo**.
>
> Contexto permanente (não apagar): `README.md`, `docs/projeto/`, `.cursor/agents/cursor-cadu.md`.

Se você é um agente: leia este arquivo **inteiro**, depois `docs/projeto/contexto.md` e `docs/projeto/GATE.md`. Não peça de novo o guarda-chuva, o Distac nem o mockup original — já estão sintetizados aqui.

---

## 0. Como o Cadu deve abrir o projeto (humano)

Hoje o Cursor está na pasta **pai** (`FM Transporte`), que mistura três coisas. Por isso o chat “vê demais”.

1. **File → Open Folder** (não Add Folder to Workspace).
2. Escolha **só**:
   `…/Document/FM Transporte/prototipo-auto-fm`
3. Confira na raiz do workspace: `README.md`, `referencia-ui/`, `docs/`, `.cursor/`.
   **Não** devem aparecer `FM Transportes/`, `modelo-inicial/` nem `Modelo-Prottus---…` como pastas irmãs dentro deste workspace.
4. Abra um **chat novo** e anexe este arquivo (`@_APAGAR-DEPOIS-HANDOFF-NOVO-CHAT.md`).
5. Git: esta pasta ainda **não** é um repo isolado (nasceu dentro do guarda-chuva). No chat novo: `git init` nesta pasta + remote, se quiser linkar. Não copiar `.git` do pai, se existir.

O modelo Distac **não está dentro** desta pasta (de propósito, para não misturar domínio de vendas). O código Distac continua no irmão:
`../Modelo-Prottus---Distribuidora-Distac-main/`
Só precisa dele na hora do **scaffold**. Se o workspace for só `prototipo-auto-fm`, copie o Distac de fora ou aponte o caminho absoluto.

---

## 1. O que é este projeto

**Produto:** portal interno de operações da **FM Transportes** (cliente) feito pela **Prottus**.

**Pasta:** `prototipo-auto-fm` — é **o** repositório do protótipo do portal. Não é o guarda-chuva do contrato.

**Problema:** emitir CT-e hoje exige conferência manual entre três fontes que não conversam (OTM, SFTP, planilha Excel) e digitação no GW Webtrans.

**1º entregável (cerne):** tela de operação — login, início, lista de remessas com estado das **três fontes**, prévia humana, campo **motorista**, botão Emitir **desabilitado** se as fontes não conferirem. Dados de remessa = **seed** e/ou **RPA do Vini**. Este repo **não** constrói o coletor OTM/SFTP agora e **não** dispara CT-e real no GW agora.

---

## 2. O que já foi feito (11/09/2026)

Kickoff **Caminho A Prottus** (documentar antes de código Nest/React).

### 2.1 Fontes (já lidas e sintetizadas — não reler o pai)

| Fonte original (guarda-chuva) | Onde está a síntese aqui |
|-------------------------------|---------------------------|
| Atas, relatório geral, documento base, campo 19/08, plano MTO | `docs/projeto/documentacao-base/` |
| Mockup HTML do Claude (`modelo-inicial`) | `referencia-ui/` (cópia) + `imagens/` (logos) |
| Modelo Distac (metodologia + stack + segurança) | `docs/prottus/` e `.cursor/rules/prottus/` **intactos**; regras FM em `.cursor/rules/projeto/fm.mdc` |

**Não** foram copiados para este repo: senhas de GW/OTM, a planilha xlsx com PII, o código Distac de clientes/produtos/pedidos.

### 2.2 Artefatos criados

- README do **produto** (raiz)
- `docs/projeto/*` preenchido (contexto, specs, DS, entidades, requisitos, módulos, apps, segurança, escala, arquitetura, fluxo, domínio técnico, GATE)
- `.cursor/` (rules FM + skills `fm-*` + agent Cadu)
- `.gitignore`, `.env.example` (database `fm_auto`)
- Placeholders `frontend/`, `backend/`, `database/` (README só — **sem app rodando**)
- Mockup navegável: abrir `referencia-ui/index.html`

### 2.3 Decisões de recorte (mesma data, segundo chat)

| Tema | Decisão |
|------|---------|
| Manifesto | **Fora** do 1º entregável (menu cinza ok) |
| API GW / campos / “sandbox” | **Depois**. Sandbox = ambiente de teste do GW para não emitir fiscal de verdade. Agora não emite. |
| “Central visual por setor” | **Fora.** Os sócios pediram painel da empresa toda; o 1º entregável é só expedição (Início + Remessas). |
| CNPJ / endereço | **Fora** deste protótipo |
| Dados de remessa | **Vini (RPA)** + seed. Portal consome, não coleta. |
| Identidade FM | Só LinkedIn `fmtransp` + logos em `imagens/`. Não pesquisar homônimas. |

### 2.4 Equipe

Prottus: Sidney (liderança), Charllys (código), Cadu (focal). FM: Paulo e Rodrigo (sócios), Gutemberg (coordenador — regra de negócio). Vini: RPA das remessas.

---

## 3. Regras que o código não pode quebrar

- Prévia humana **obrigatória** (ata 01/09).
- Falha **nunca** silenciosa.
- Emitir **desabilitado**, não escondido, se as três fontes não conferem.
- Verde/âmbar/vermelho só estado de dado.
- JWT httpOnly (padrão Distac); sem token no localStorage; UI sem emojis.
- Código/DB em **inglês**; labels em **português**.
- Marca: primário `#0079FC`, texto `#3A3A38`, fundo `#F5F5F7`. **Não** usar vermelho Distac `#C02028`.
- **Não editar** `docs/prottus/` nem `.cursor/rules/prottus/`.
- **Não** versionar senhas. Acessos reais ficam fora (pasta Acessos do guarda-chuva, se ainda existir no disco).

UI de verdade a copiar: `referencia-ui/` (`tokens.css`, `fm.css`, `inicio.html`, `remessas.html`).

---

## 4. Stack (quando houver código)

React + Vite + TypeScript · NestJS · Prisma · PostgreSQL local **sem Docker** · JWT cookies httpOnly.

Domínio planejado (não inventar Distac): `users`, `shipments`, `source_snapshots`, prévia/emissão, `audit_log`. Database local: `fm_auto`.

Rotas UI: `/login`, `/`, `/remessas`, `/usuarios`.

---

## 5. O que **não** está feito (é o “seguir”)

1. **Scaffold** Distac → este repo, **apagando** vendas (clients/products/orders) e colocando remessas + tokens FM. Prompt pronto: `docs/projeto/GATE.md`.
2. App mínimo: install/dev, login, shell, Início, lista de remessas com seed.
3. Combinar **contrato de dados** com o RPA do Vini (formato da remessa e das três fontes).
4. Depois (backlog): API GW, Manifesto, coleta nativa.

Status canônico: `docs/projeto/modulos/STATUS_PROTOTIPO.md`.

---

## 6. Mapa rápido desta pasta

```
prototipo-auto-fm/          ← abrir SÓ isto no Cursor
  README.md                 produto
  referencia-ui/            mockup HTML (já funciona)
  imagens/                  logos FM
  docs/projeto/             verdade do cliente
  docs/prottus/             metodologia empresa (não editar)
  .cursor/                  rules + skills + agent Cadu
  frontend/ backend/        vazios até o scaffold
```

Ordem de leitura se este MD sumir: `README.md` → `docs/projeto/contexto.md` → `docs/projeto/design-system.md` → `docs/projeto/mapa-entidades.md` → `docs/projeto/GATE.md` → `referencia-ui/design-system.html`.

---

## 7. Prompt sugerido no chat novo (colar)

```text
Workspace = só prototipo-auto-fm.
Li @_APAGAR-DEPOIS-HANDOFF-NOVO-CHAT.md (temporário) e docs/projeto/.
Não misturar Distac (vendas) nem o guarda-chuva.
Próximo: scaffold conforme docs/projeto/GATE.md, domínio remessas, UI de referencia-ui/.
```

Quando o scaffold existir e o Cadu estiver confortável neste folder: **apague este arquivo** e tire qualquer menção a ele.
