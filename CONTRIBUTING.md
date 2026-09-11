# Contribuindo — Portal FM Transportes

Uso interno da Prottus. Este repo é o **protótipo do portal** da FM Transportes, com stack e pilares de segurança herdados da base Distac.

## Antes de mudar código

1. Ler [`docs/projeto/DOMINIO-TECNICO.md`](docs/projeto/DOMINIO-TECNICO.md).
2. Fluxo: [`docs/projeto/FLUXO-APLICACAO.md`](docs/projeto/FLUXO-APLICACAO.md).
3. Segurança / escala: [`seguranca.md`](docs/projeto/seguranca.md) · [`escalabilidade.md`](docs/projeto/escalabilidade.md).
4. UI: [`referencia-ui/`](referencia-ui/) + [`design-system.md`](docs/projeto/design-system.md).
5. **Não editar** `docs/prottus/` nem enfraquecer JWT httpOnly / audit / paginação sem decisão documentada.
6. **Não versionar** senhas de GW, OTM ou SFTP.

## Regras de produto que não se negociam

- Prévia com confirmação humana antes de emitir CT-e.
- Falha nunca é silenciosa (fonte ausente ou arquivo fora do padrão NOTEFIZ).
- Emissão bloqueada enquanto as três fontes não conferem.
- Verde / âmbar / vermelho só para estado de dado.

## Checklist de PR

- [ ] Sem secrets no git
- [ ] UI sem emojis (usar `Icon`)
- [ ] Código/DB em inglês; labels em português
- [ ] Spec da tela em `docs/projeto/aplicacoes/` se for tela nova
