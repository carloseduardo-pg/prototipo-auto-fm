# GATE DE LIBERAÇÃO — Portal FM Transportes

Kickoff documental (Caminho A) em 2026-09-11.

## Checklist

**Documentação do projeto**

- [x] `docs/projeto/contexto.md`
- [x] `docs/projeto/especificacoes.md`
- [x] `docs/projeto/design-system.md`
- [x] `docs/projeto/mapa-entidades.md`
- [x] `docs/projeto/requisitos/requisito.md`
- [x] `docs/projeto/modulos/STATUS_PROTOTIPO.md`
- [x] `docs/projeto/modulos/README.md`
- [x] `docs/projeto/padrao-aplicacoes.md`

**Cursor**

- [x] `.cursor/rules/projeto/fm.mdc`
- [x] `.cursor/rules/prottus/` intacto
- [x] `.cursor/agents/cursor-cadu.md`
- [x] `docs/prottus/` intacto

**Extras**

- [x] Logo em `imagens/`
- [x] `.gitignore` alinhado à stack
- [x] Fontes em `docs/projeto/documentacao-base/`
- [x] Mockup em `referencia-ui/`

## Prompt para colar quando for gerar código

```text
GATE DE LIBERAÇÃO PROTTUS CONCLUÍDO.

Validei docs/projeto/ e .cursor/rules/projeto/fm.mdc.
docs/prottus/ e .cursor/rules/prottus/ permanecem intactos.

Pode iniciar o scaffold seguindo docs/projeto/especificacoes.md,
docs/projeto/USAR-COMO-BASE.md e as regras Prottus.

Primeira tarefa: copiar a estrutura Distac (frontend/backend/database/tests)
trocando o domínio de vendas por remessas/CT-e, tokens FM e logos.
Mínimo rodável: install/dev, login JWT, shell, Início e lista de remessas
(dados seed / contrato futuro com o RPA do Vini). Sem Manifesto. Sem API GW
nesta entrega. Sem coleta OTM/SFTP neste repo.

Ao terminar: atualize docs/projeto/modulos/STATUS_PROTOTIPO.md
e registre a sessão em .cursor/agents/cursor-cadu.md.
```
