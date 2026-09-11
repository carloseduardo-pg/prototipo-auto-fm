# Design System — Portal FM Transportes

Extende o padrão Prottus: [`docs/prottus/design-system.md`](../prottus/design-system.md).

Defaults de apps: [`padrao-aplicacoes.md`](padrao-aplicacoes.md).  
Documentação viva (abrir no navegador): [`referencia-ui/design-system.html`](../../referencia-ui/design-system.html).  
Tokens CSS: [`referencia-ui/assets/tokens.css`](../../referencia-ui/assets/tokens.css).

**Fonte da marca:** logos oficiais [`imagens/fm-logo.png`](../../imagens/fm-logo.png) e [`imagens/fm-mark.png`](../../imagens/fm-mark.png) (chevron azul sobre a estrada). **Não usar** paleta de empresas homônimas (SP / outros CNPJs).

Toda cor saiu da logomarca. O azul `#0079FC` é o chevron e as letras “FM”. Os neutros vêm do cinza do asfalto do logo. Texto primário é asfalto (`#3A3A38`), não preto.

Hover/active da primária: `--fm-blue-press` `#0063D1` (declarado no mockup).

## 1. Marca

| Token | Hex | Uso |
|-------|-----|-----|
| `--fm-blue` / `--brand-primary` | `#0079FC` | Ações primárias, foco, chevron |
| `--fm-blue-press` | `#0063D1` | Pressionado / active |
| `--fm-blue-soft` | `#E8F2FE` | Seleção, fundo de destaque |
| `--fm-blue-deep` | `#01477C` | Títulos de marca (letra M do logo) |

Não há secundária de marca além dos neutros da estrada.

## 2. Superfícies

| Token | Hex | Uso |
|-------|-----|-----|
| `--asphalt` | `#3A3A38` | Texto primário |
| `--road` | `#6A6A69` | Texto secundário |
| `--road-light` | `#96968F` | Placeholder, terciário |
| `--lane` | `#DEDEDE` | Bordas |
| `--lane-soft` | `#EDEDF0` | Divisórias internas |
| `--fog` | `#F5F5F7` | Fundo da aplicação |
| `--surface` | `#FFFFFF` | Cartões, barras, tabelas |
| Header fundo / texto | `#FFFFFF` / `#3A3A38` | Topbar |
| Sidebar | superfície branca do mockup (`referencia-ui`) | Largura `--sidebar-w: 244px` |

## 3. Semânticos (só estado de dado)

Verde, âmbar e vermelho **nunca** decoram botão ou fundo de seção.

| Token | Hex | Uso |
|-------|-----|-----|
| `--ok` | `#16A34A` | Fonte conferida |
| `--ok-soft` | `#E8F6EC` | Fundo de selo ok |
| `--wait` | `#B4780A` | Aguardando fonte |
| `--wait-soft` | `#FDF3E0` | Fundo de selo wait |
| `--fail` | `#C81E1E` | Falha / divergência |
| `--fail-soft` | `#FDECEC` | Fundo de selo fail |

## 4. Tipografia

Stack de sistema (ferramenta interna, sem webfont): SF Pro / Segoe UI / Inter.

| Token | Valor |
|-------|-------|
| `--font` | `system-ui, -apple-system, "Segoe UI", Inter, Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--t-display` | 2.125rem (título de tela) |
| `--t-title` | 1.3125rem |
| `--t-lead` | 1.0625rem |
| `--t-body` | 0.9375rem |
| `--t-small` | 0.8125rem |
| `--t-micro` | 0.6875rem (selos) |

Números de valor e código: numeral tabular. UI **sem emojis**.

## 5. Movimento e raio

Movimento só responde a ação (abrir prévia, confirmar, fechar). Nada anima sozinho. `prefers-reduced-motion` no tokens.css.

| Token | Valor |
|-------|-------|
| `--r-sm` … `--r-xl` | 6 / 10 / 14 / 20 px |
| `--ease` | `cubic-bezier(0.32, 0.72, 0, 1)` |
| `--fast` / `--slow` | 140ms / 260ms |

## 6. Personalidade

O chevron do logo é o indicador de avanço da remessa — a marca é uma seta sobre a estrada; remessa é carga que avança.

## 7. Assets

| Item | Caminho |
|------|---------|
| Logo completo | `imagens/fm-logo.png` |
| Símbolo | `imagens/fm-mark.png` |
| Tokens | `referencia-ui/assets/tokens.css` → no scaffold: `frontend/src/styles/fm-tokens.css` |
| Componentes de referência | `referencia-ui/assets/fm.css` |

## 8. Regras de produto na UI (ata 01/09/2026)

- A prévia com confirmação humana **nunca sai**.
- Falha nunca é silenciosa.
- Botão de emitir fica **desabilitado**, não escondido, enquanto as três fontes não conferem.
- Login **sem** credenciais pré-preenchidas.
