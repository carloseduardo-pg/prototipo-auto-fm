# Contexto do projeto — Portal FM Transportes

> Stack → [`especificacoes.md`](especificacoes.md) · Segurança → [`seguranca.md`](seguranca.md) · Escala → [`escalabilidade.md`](escalabilidade.md)

## Objetivo

Portal interno da **FM Transportes** (Prottus) para operações de expedição. O problema atual: a emissão de CT-e depende de conferência manual entre três fontes desconectadas (OTM, SFTP e planilha Excel), com digitação no GW Webtrans. A plataforma coleta, reconcilia e apresenta uma prévia; o operador informa o motorista, confirma, e a emissão vai para o GW via API.

A FM Transportes é transportadora de cargas terrestres, sede em Recife-PE, fundada em 2018, filiais em PB, CE, RN, SP, BA e RJ (fonte: LinkedIn `linkedin.com/company/fmtransp` — única fonte institucional confirmada). Cliente núcleo da operação observada: **M. Dias**.

## Usuários principais

- **Operador de expedição:** conferir remessas do dia, ver estado das três fontes, informar motorista, confirmar prévia e emitir CT-e.
- **Coordenador da operação (Gutemberg):** referência de regra de negócio; mesma visão operacional, com acompanhamento do volume do dia.
- **Administrador da plataforma (Prottus / FM):** usuários ativos, papéis. Detalhe de papéis extras: A definir em DOP.

## Escopo inicial (1ª entrega — este protótipo)

- Login (JWT httpOnly)
- Início com resumo da última coleta
- Lista de remessas do dia com estado das três fontes
- Prévia de emissão com confirmação humana obrigatória
- Campo de motorista na prévia
- Disparo de CT-e via API do GW fica para uma fase seguinte — neste protótipo o fluxo para na prévia / confirmação (integração GW depois)
- Falha explícita quando fonte faltar ou o arquivo não bater
- Emissão bloqueada enquanto as três fontes não conferirem
- Integridade/auditoria no PostgreSQL (padrão Distac)
- UI conforme mockup em `referencia-ui/`
- Dados de remessa no protótipo: seed / o que o RPA do Vini trouxer — o portal não implementa a coleta OTM/SFTP nesta entrega

## Fora de escopo (1ª entrega) — decisão 2026-09-11

- **Manifesto** — fora. Menu continua “em breve”; não construir tela nem API
- Reescrever o GW Webtrans
- RPA digitando na interface do GW
- Cobertura/campos da API do GW — não bloqueia o protótipo; volta quando formos emitir de verdade
- Cadastro institucional (CNPJ, endereço) — não entra no protótipo de operação
- Indicadores e Automações como módulos completos
- Central da empresa “por setor” — o 1º entregável é só o cerne da expedição (remessas / CT-e), não um painel de todos os departamentos
- Eliminação definitiva da planilha Excel
- App do motorista, financeiro, CRM, frota completa

## Onde ler o quê

| Assunto | Arquivo |
|---------|---------|
| **Domínio técnico** | [`DOMINIO-TECNICO.md`](DOMINIO-TECNICO.md) |
| Metodologia Prottus | [`docs/prottus/metodologia.md`](../prottus/metodologia.md) |
| Specs | [`especificacoes.md`](especificacoes.md) |
| Segurança | [`seguranca.md`](seguranca.md) |
| Escalabilidade | [`escalabilidade.md`](escalabilidade.md) |
| Origem Distac | [`USAR-COMO-BASE.md`](USAR-COMO-BASE.md) |
| Marca | [`design-system.md`](design-system.md) |
| Domínio de negócio | [`mapa-entidades.md`](mapa-entidades.md) |
| Requisitos | [`requisitos/requisito.md`](requisitos/requisito.md) |
| Status | [`modulos/STATUS_PROTOTIPO.md`](modulos/STATUS_PROTOTIPO.md) |
| Fontes da descoberta | [`documentacao-base/`](documentacao-base/) |
| Mockup | [`../../referencia-ui/`](../../referencia-ui/) |
