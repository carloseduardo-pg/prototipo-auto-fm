# Síntese — Ata gestores 01/09/2026

**Origem:** `FM Transportes/Reuniões/09.2026/01.09 - Ata de Reuniao com Gestores FM Transportes.docx`  
Presencial, 14h–16h30 (2h30). Sem gravação; anotações de Cadu. Local: unidade FM a confirmar.

## Participantes

| Nome | Papel |
|------|--------|
| Cadu | Prottus — condução e registro |
| Sidney Feijó | Prottus — liderança |
| Paulo | FM — sócio |
| Rodrigo | FM — sócio |
| Gutemberg | FM — coordenador da operação; conhece o processo ponta a ponta; referência de regra daqui pra frente |

Primeira reunião do projeto com sócios e gestores na mesma sala. Até então só havia contato operacional (19/08).

## Objetivo

Definir qual problema atacar primeiro e responder a pergunta de escopo aberta em 19/08 (reescrever o GW vs RPA de input).

## Decisão de escopo

Nenhuma das duas opções de 19/08. Direção: plataforma própria de automação que integra fontes, monta o registro correto e emite o CT-e no GW **via API**. A partir daí é possível estimar o 1º entregável com escopo real.

## Visão dos gestores vs Sidney

- Gestores: central que centraliza informações da empresa, visual, “o que aconteceu em cada setor”. Ponto de partida: cerne da operação = emissão de CT-e (o mesmo do campo).
- Sidney: plataforma de automação; timeline é consequência, não o produto. Usuário dá a ordem; robô aplica regras FM.

As visões não são opostas nem iguais. 1º passo claro = automação do CT-e. Se “ver cada setor” está neste entregável **não ficou fechado** — risco de expectativa.

**Recorte 11/09:** 1º entregável = fluxo da expedição (Início + Remessas), não a central da empresa.

## Processo escolhido

Área: Expedição (escritório). Processo: geração de CT-e e Manifesto. Objetivo: dado chegar correto no GW, pronto para emitir.

AS IS segundo a coordenação: NF M. Dias via SFTP → lançamento no Excel → operador emite CT-e/Manifesto → conferência de valores (preços e tributações) entre GW e OTM. M. Dias citada nesta reunião como “mais de 50% das vendas” (vs ~80% anterior).

## Arquitetura do protótipo (ata)

Automatizar o processo inteiro; usuário só informa o **motorista**. Três fontes, nesta ordem:

1. **OTM** — remessa aprovada/confirmada; fonte mais segura; começa por aqui. Duas telas obrigatórias (custos do CT-e + dados do CT-e); não há relatório único.
2. **SFTP** — NF daquele CT-e e carga (M. Dias).
3. **Planilha** — o que a operação lançou; conferência nesta fase; intenção de eliminar depois.

Emissão: API GW (“conhecimento”). Prévia obrigatória; confirmação dispara; alerta de sucesso ou falha. Manter a prévia no PRD.

## Impedimento SFTP

NOTEFIZ nem sempre chega; às vezes foto, XML ou PDF. Quebra a 2ª fonte. A automação deve tratar formatos alternativos **ou** falhar de forma explícita e legível — nunca em silêncio.

## Impacto registrado na ata

- Escopo deixou de estar bloqueado.
- Achado de campo confirmado pela gestão.
- Estimativa possível, **não feita** nesta reunião.
- Nenhuma data comprometida com o cliente.
- Excel = fonte de transição; eliminação no roadmap.

## Encaminhamentos (sem prazo na ata)

PRD (Cadu/Sidney); estimativa (Sidney/Charllys); API GW (Cadu); OTM + duas telas (Charllys); SFTP + frequência de formato (Charllys); % M. Dias (Cadu); alinhar central visual (Cadu/Sidney); cópia da planilha (Cadu).

## Pontos a confirmar (ata)

Central visual no 1º entregável?; % M. Dias; frequência SFTP fora do padrão; dono da planilha e quantas pessoas; cobertura da API GW; sandbox GW/OTM; Manifesto no 1º entregável vs só CT-e; local exato da reunião.
