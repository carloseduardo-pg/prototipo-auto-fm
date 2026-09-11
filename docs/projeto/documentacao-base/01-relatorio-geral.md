# Síntese — Relatório Geral (v1, 02/09/2026)

**Origem:** `FM Transportes/Relatórios/Relatorio Geral do Projeto - FM Transportes x Prottus.docx`  
**Base:** visita 19/08/2026 + reunião 01/09/2026. Documento único da operação; as atas continuam como registro detalhado.

## O que o documento é

Diagnóstico da operação e definição de escopo. Consolida as duas reuniões de descoberta. Cliente: FM Transportes. Fornecedor: Prottus — Inteligência e Tecnologia.

## Status na data do relatório (02/09)

- Escopo do 1º entregável: **definido** em 01/09 — o bloqueio desde 19/08 foi resolvido.
- Estimativa de esforço: **não** realizada. Cronograma com data ao cliente: **não existe**.
- Acessos técnicos (API GW, OTM, SFTP): **ainda não obtidos** naquela data.

## Empresa (só LinkedIn `linkedin.com/company/fmtransp`)

Transporte rodoviário de carga; distribuição em todo o Brasil; sede Recife-PE; fundada em 2018; 51–200 funcionários; filiais PB, CE, RN, SP, BA e RJ; empresa privada.

Regra permanente: presença digital mínima; nome comum no setor. Já houve duas pesquisas em homônimas. Únicas fontes válidas: LinkedIn acima + material do cliente. Sem site e sem Instagram. Sem CNPJ, razão social ou endereço confirmados — pedir ao cliente, nunca pesquisar.

### M. Dias

Cliente núcleo: notas via SFTP; conferência no OTM sobre a carga dela. Duas cifras internas, nenhuma oficial: “mais de 50% das vendas” (01/09) vs ~80% da operação (campo). Confirmar antes de business case ou documento externo.

### Equipe

| Quem | Papel |
|------|--------|
| Sidney Feijó (Prottus) | Liderança: direção técnica e estratégica |
| Charllys (Prottus) | Execução técnica |
| Cadu (Prottus) | Ponto focal: cliente, reuniões, tradução do negócio |
| Paulo e Rodrigo (FM) | Sócios: decisão e priorização |
| Gutemberg (FM) | Coordenador da operação; validador de regra de negócio |

## Histórico de descoberta

| Data | Tipo | Duração | Prottus | FM |
|------|------|---------|---------|-----|
| 19/08/2026 | Shadowing | 1h30 | Cadu, Charllys | 2 operadores da expedição |
| 01/09/2026 | Gestores | 2h30 (14h–16h30) | Cadu, Sidney | Paulo, Rodrigo, Gutemberg |

Campo viu o problema por baixo (retrabalho GW × Oracle). Gestores escolheram o mesmo processo por cima — não era caso isolado.

## AS IS — Expedição (CT-e e Manifesto, escritório)

### Fontes

| Fonte | Papel | Situação |
|-------|--------|----------|
| Oracle Logistics (OTM) | Remessa e custos do CT-e; fonte mais confiável | Consulta manual, campo a campo |
| SFTP | NF da M. Dias e dados da carga | Formato inconsistente (NOTEFIZ nem sempre) |
| Planilha Excel | Controle do que emitir | Alimentada à mão |
| GW Webtrans | Destino fiscal (NF e CT-e) | Importa, mas não puxa contrato de frete nem manifesto |

### Fluxo

Chegada SFTP → lançamento manual no Excel → operador verifica o que emitir → importação no GW (código de remessa **ou** arquivo) → dados frequentemente incorretos → conferência campo a campo no OTM → correção no GW → emissão de CT-e / Manifesto.

### Dores (causa única: sem fonte de verdade)

1. GW não puxa contrato de frete nem manifesto (campo 19/08).
2. Importação frequentemente errada — força conferência no OTM (campo + gestores).
3. Controle depende de Excel manual (gestores).
4. OTM sem relatório único: custos do CT-e e dados do CT-e em **duas telas** (gestores).
5. SFTP às vezes traz foto, XML ou PDF no lugar do NOTEFIZ (gestores).

A solução não é “consertar o GW” nem “robô digitando”: é a camada de reconciliação que não existe.

## Solução definida (01/09)

| Opção | Situação |
|-------|----------|
| Reescrever o GW | Descartada |
| RPA digitando no GW | Descartada — integração via API |
| Plataforma Prottus × FM | **Escolhida** — coleta, reconcilia, emite via API, com visibilidade |

Plataforma de automação: usuário dá a ordem; robô aplica regras FM; timeline do que acontece. 1º caso de uso = emissão automática de CT-e.

Divergência de expectativa: sócios pediram “central visual por setor”; Sidney propôs automação com visibilidade como consequência. O 1º passo (CT-e) foi acordado; se a central de todos os setores entra neste entregável **não ficou fechado no DOCX**.

**Recorte 11/09 no protótipo:** o 1º entregável **não** é a central da empresa; é o fluxo da expedição.

### Arquitetura funcional (DOCX)

Ordem das fontes: (1) OTM — remessa aprovada/confirmada, duas telas; (2) SFTP — NF e carga; (3) planilha — conferência, com intenção de eliminar depois. Comparação produz o conjunto para o GW.

Emissão: API GW já citada (“conhecimento”). Prévia humana obrigatória; depois dispara e alerta sucesso/falha. A prévia é deliberada (documento fiscal) — registrar no PRD para não “automatizar mais” por engano.

Ganho declarado: intervenção humana só em motorista + confirmação da prévia.

## Impedimentos e riscos (02/09)

1. NOTEFIZ inconsistente — quebra a 2ª fonte; frequência desconhecida.
2. Acessos técnicos ainda não obtidos (na data do relatório).
3. Expectativa da central visual vs 1º entregável.
4. API GW pode não cobrir todos os campos (pode invalidar o desenho).
5. Sandbox GW/OTM desconhecido — testar emissão fiscal em produção é inaceitável.
6. % M. Dias 50% vs 80%.

Prioridade no DOCX: itens 4 e 5 **antes** de estimar prazo ao cliente.

## Encaminhamentos sem prazo (02/09)

Cobertura API GW + sandbox (Charllys); acesso/docs API GW (Cadu); acesso OTM e mapear duas telas (Charllys); acesso SFTP e frequência de formato (Charllys); cópia da planilha (Cadu); PRD (Cadu/Sidney); estimativa (Sidney/Charllys); alinhar central visual (Cadu/Sidney); % M. Dias (Cadu); Manifesto no 1º entregável? (Cadu).

Observação do relatório: encaminhamento sem data é intenção.

## Pontos em aberto no DOCX

Central visual; % M. Dias; frequência SFTP fora do padrão; cobertura API GW; sandbox; Manifesto no 1º entregável; dono da planilha e quantas pessoas alimentam; dor homogênea na expedição?; nomes dos operadores de 19/08; CNPJ/razão/endereço; estrutura de áreas do Plano de Trabalho (Administrativo/Fiscal/Contábil/Financeiro) — hipótese Amarante, não validada.

**Fechado no protótipo (11/09):** Manifesto fora; sem API GW nesta entrega; sem CNPJ/endereço; sem central por setor; dados via RPA (Vini) + seed. Ainda não bloqueiam o protótipo: % M. Dias, NOTEFIZ, sandbox GW.
