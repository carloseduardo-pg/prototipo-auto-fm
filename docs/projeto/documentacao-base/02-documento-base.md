# Síntese — Documento Base interno (v4, 01/09/2026)

**Origem:** `FM Transportes/Relatórios/Prottus/Projeto FM Transportes Documento Base [INTERNO].docx`  
Deve ser atualizado a cada reunião, decisão ou descoberta, para qualquer pessoa (ou sessão) entender o histórico sem explicação verbal.

## Correção de identidade (obrigatório)

| Versão | Erro |
|--------|------|
| v1 / v2 | Pesquisaram “FM Transportes” de São Paulo (2004, site fmtransportes.com.br), inclusive Reclame Aqui. |
| v3 | Nome certo, mas CNPJ, razão, endereço, site e Instagram de **outras** homônimas de busca. |
| v4 | Só o confirmado: LinkedIn indicado pelo cliente + logos fornecidos. Cliente confirmou: **não tem site nem Instagram**. |

O achado de campo 19/08 (GW × Oracle) vale em todas as versões — era a empresa certa. Só a identidade institucional estava errada.

## Fontes válidas — regra permanente

1. LinkedIn `linkedin.com/company/fmtransp` (~432 seguidores na data do DOCX).
2. Imagens de logo fornecidas pelo cliente (chevron azul).

**Não usar:** qualquer site (ex. fmtransp.com), Instagram, CNPJ ou razão de busca. Qualquer pesquisa nova só entra em documento depois de validar com Cadu. Já houve dois casos de homônima (17/08 site institucional; 01/09 CNPJ/endereço/site/Instagram).

## O que sabemos (LinkedIn)

Nome: FM Transportes. “Empresa de transportes de cargas terrestres atuando em todo o Brasil.” Transportadora de distribuição; filiais PB, CE, RN, SP, BA e RJ. Setor: transporte rodoviário de carga. 51–200 funcionários. Sede Recife-PE. Privada. Fundada em 2018.

## O que não sabemos e não se inventa

- CNPJ e razão social
- Endereço além de Recife-PE
- Site e Instagram (confirmado que não existem)
- Segmentos além da operação com M. Dias; frota; volume/mês; faturamento
- Estrutura organizacional real — Administrativo/Fiscal/Contábil/Financeiro do Plano de Trabalho é hipótese de outro projeto
- Reputação pública — Reclame Aqui das v1/v2 era de homônima e foi removido

## Equipe Prottus (papéis)

- **Sidney:** lidera — direção técnica/estratégica e decisões de maior nível.
- **Charllys:** desenvolvedor responsável pela execução técnica.
- **Cadu:** ponto focal do dia a dia (cliente, coordenação, reuniões, tradução do negócio). Não é o responsável técnico por codar, ainda que codifique pontualmente.

## M. Dias (campo 19/08 + esclarecimento 01/09)

Principal cliente; ~80% citado nas anotações de campo (“Oracle Logistics — Coleta de Dados da M. Dias”). A dor GW × Oracle atravessa a maior parte do volume. Em 01/09 os gestores disseram “mais de 50% das vendas”. Confirmar número oficial.

## Stack observada em campo (19/08)

- **GW Webtrans:** emissão de NF e CT-e. Importação por código de remessa ou por arquivo — em nenhuma puxa contrato de frete ou manifesto.
- **Portal Oracle (OTM):** conferência cruzada porque a importação no GW frequentemente chega errada.

## Escopo (bloqueio resolvido em 01/09)

Não é reescrever o GW nem RPA de UI. É plataforma de automação Prottus × FM: três fontes (OTM, SFTP, planilha), prévia humana, emissão no GW via API. Detalhe no Relatório Geral.

## Status no DOCX (01/09)

Fase: fim da descoberta inicial e entrada em especificação. Escopo do 1º entregável definido; esforço **não** estimado; nenhuma data comprometida com o cliente.

Perguntas-chave então: cobertura API GW; sandbox GW/OTM; central visual por setor; % M. Dias; Manifesto no 1º entregável; frequência SFTP fora do padrão; organograma real; CNPJ/razão/endereço.

## Regras de documentação (do próprio DOCX)

- Registrar reunião/decisão/descoberta com data.
- Comunicação direta; riscos sem suavizar.
- Atualizar “o que sabemos” e reduzir “o que não sabemos” quando entrar fato novo.
- Logo Prottus + logo FM (chevron azul) em entregável formal.
- Validar causa-raiz em campo antes de desenhar solução.
- Separar fato confirmado com o cliente de hipótese Prottus.
- Confirmar fonte com Cadu antes de pesquisar dado externo.

## Log de decisões (DOCX)

| Data | Item |
|------|------|
| 17/08/2026 | Documento base criado; pesquisa na empresa errada — corrigido depois. |
| 19/08/2026 | Campo: 2 operadores, 1h30; dor back-office; pergunta de escopo aberta. |
| 01/09/2026 | 1ª correção de identidade (logo/paleta). |
| 01/09/2026 | 2ª correção (v4): só LinkedIn + logos. |
| 01/09/2026 | M. Dias esclarecido; papéis Prottus detalhados. |
| 01/09/2026 | Gestores: escopo da plataforma definido. |
| Pendente no DOCX | Viabilidade API GW + sandbox; PRD e estimativa. |
