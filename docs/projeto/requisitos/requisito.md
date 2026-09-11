# Requisitos — Portal FM Transportes

Sistema: **Portal de operações FM Transportes** | Cliente: **FM Transportes** | Desenvolvedora: **Prottus**

---

## 1. Visão

Plataforma que reconcilia OTM, SFTP e planilha, mostra ao operador de expedição o que está pronto ou bloqueado, exige confirmação humana da prévia (e o motorista) e emite o CT-e no GW Webtrans via API.

## 2. Operações (núcleo)

- Autenticar operador
- Disparar / acompanhar coleta das três fontes
- Listar remessas do dia com estado de cada fonte
- Registrar divergência de forma visível
- Informar motorista e confirmar prévia
- Emitir CT-e (API GW) e mostrar sucesso ou falha
- Bloquear emissão se as três fontes não conferirem
- Falhar de forma explícita se o SFTP não for NOTEFIZ

## 3. Perguntas que o sistema responde

- Quais remessas estão prontas para emitir?
- Qual fonte falta ou falhou?
- Onde está a divergência (ex.: tributação OTM vs SFTP)?
- A última coleta rodou quando e o que trouxe?
- Este CT-e já foi emitido hoje?

## 4. Requisitos não-funcionais

| ID | Requisito | Como atende | Doc |
|----|-----------|-------------|-----|
| RNF-01 | Escalável conforme o contexto | Paginação, summary, jobs de coleta fora do request HTTP | [`escalabilidade.md`](../escalabilidade.md) |
| RNF-02 | Seguro | JWT httpOnly, Helmet, rate limit, secrets em env | [`seguranca.md`](../seguranca.md) |
| RNF-03 | Simples e completo no domínio | Remessa + fontes + emissão; GW continua fiscal | [`mapa-entidades.md`](../mapa-entidades.md) |
| RNF-04 | Integridade no banco | Triggers + `audit_log` (scaffold Distac) | [`database/`](../../../database/) |
| RNF-05 | Dados sensíveis protegidos | bcrypt; hash omitido na auditoria; credenciais de integração fora do git | [`seguranca.md`](../seguranca.md) |
| RNF-06 | Qualidade verificável | Smoke + carga após scaffold | `tests/` (a criar) |
| RNF-07 | UI sem emojis | `Icon` + DS FM | [`design-system.md`](../design-system.md) |
| RNF-08 | Controle humano na emissão fiscal | Prévia obrigatória; botão desabilitado, não oculto | ata 01/09/2026 |
| RNF-09 | Sem falha silenciosa | Erro de fonte/formato visível na linha e na prévia | ata 01/09/2026 |

## 5. Integrações

| Sistema | Tipo | Status |
|---------|------|--------|
| GW Webtrans | API emissão (“conhecimento”) | Fase seguinte — não bloqueia o protótipo de fluxo |
| Oracle Logistics (OTM) | Coleta (2 telas) | Acesso encaminhado |
| SFTP | Arquivos de NF/carga | Acesso encaminhado; formato inconsistente confirmado |
| Planilha Excel | Conferência transitória | Cópia operacional existe no guarda-chuva (`PROJETO - INTEGRAÇÃO OPERACIONAL.xlsx`) |

## 6. Setores ainda sem descoberta (DOP)

Administrativo, Fiscal, Contábil, Financeiro — divisão herdada de outro cliente; **não validada** na FM. Não construir módulos para essas áreas agora.

## 7. Prioridade imediata após esta documentação

1. Scaffold Distac com domínio FM (auth + shell + Início + Remessas).
2. Fluxo operacional: lista, três fontes, prévia, motorista, bloqueio de emitir.
3. Consumir dados que o RPA do Vini (e o seed) trouxerem — não construir coleta OTM/SFTP neste entregável.
4. API GW e Manifesto: depois.
