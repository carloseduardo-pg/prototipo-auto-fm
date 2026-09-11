# Análise técnica — Portal FM Transportes

Fontes: Relatório Geral (02/09/2026), Documento Base v4, ata 01/09, campo 19/08, Plano MTO v4, mockup `modelo-inicial`. Sínteses em [`documentacao-base/`](documentacao-base/).

## Decisão de solução

Plataforma própria. GW fica. Integração por API, não por digitação. Primeiro caso: CT-e. Coleta OTM em **duas telas** (custos + dados) — restrição da fonte.

## Foco do 1º entregável (2026-09-11)

Cerne da operação: remessas, três fontes, prévia, motorista. Manifesto fora. API GW e cadastro institucional (CNPJ) fora. Dados: RPA (Vini) + seed. Central visual por setor fora.

## Riscos adiados (não bloqueiam o protótipo)

- Cobertura de campos da API GW
- Ambiente de teste (sandbox) do GW e do OTM
- Frequência real de arquivo SFTP fora do NOTEFIZ
- Percentual oficial da M. Dias

Voltam quando formos emitir de verdade ou montar business case externo.

## Referência de implementação UI

`referencia-ui/` é a fonte visual. Não reimplementar Distac vermelho/`Source Sans 3` neste produto.
