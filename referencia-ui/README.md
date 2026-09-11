# Portal FM Transportes — protótipo de interface

Cópia de trabalho dentro de `prototipo-auto-fm` (origem: pasta `modelo-inicial` do guarda-chuva).
O produto documentado está em `docs/projeto/`. Este HTML é a **referência visual**.

Protótipo navegável do portal interno da FM Transportes, desenvolvido pela Prottus.
HTML, CSS e JavaScript puros, sem build e sem dependência externa: abra `index.html` no navegador e funciona.

Serve como **base visual** para o projeto real. A intenção é que este pacote seja aberto
no Cursor e usado como referência de design system ao implementar a aplicação de verdade.

---

## O que já existe

| Arquivo | O que é |
|---|---|
| `index.html` | Tela de login |
| `inicio.html` | Início do portal — resumo da última coleta e o que precisa de atenção |
| `remessas.html` | Módulo de Remessas — lista, cruzamento das três fontes e prévia de emissão |
| `design-system.html` | Documentação viva do design system: cores, tipografia, componentes e regras |
| `assets/tokens.css` | Todos os tokens: cor, tipo, espaço, raio, elevação, movimento |
| `assets/fm.css` | Base e componentes |
| `assets/img/` | Logomarca e símbolo da FM |

Comece por `design-system.html`. É lá que está o porquê de cada decisão.

---

## Como usar no Cursor

1. Descompacte a pasta dentro do projeto.
2. Abra `design-system.html` no navegador para ver a linguagem visual inteira numa página.
3. Ao implementar telas novas, **importe `tokens.css` e `fm.css`** e componha com as classes
   existentes antes de escrever CSS novo.
4. Se precisar de uma cor que não existe, adicione em `tokens.css` com um comentário
   dizendo por quê. Não use valor cru direto no componente.

Ao migrar para React/Vue, os tokens vão direto como CSS custom properties — não precisa
reescrever a paleta. Os componentes de `fm.css` mapeiam quase 1:1 para componentes.

---

## O design em uma página

**Cor.** Toda cor saiu da logomarca. O azul da marca é `#0079FC` — que por coincidência
é praticamente o azul de sistema da Apple, então a estética minimalista pedida é nativa
da FM, não emprestada. Os neutros vêm do cinza do asfalto do logo. O texto primário é
asfalto (`#3A3A38`), não preto: preto puro sobre branco vibra e cansa em tela de operação
usada o dia inteiro.

**Tipografia.** Stack de sistema — SF Pro no macOS, Segoe no Windows, Inter de reserva.
Sem webfont, porque é ferramenta interna e precisa abrir rápido na rede do escritório.
Valores e códigos usam numeral tabular para alinhar em coluna na tabela.

**O elemento com personalidade.** O chevron do logo vira o indicador de avanço da remessa.
A marca da FM é literalmente uma seta sobre uma estrada, e remessa é carga que avança —
a figura carrega significado em vez de decorar.

**A tela que importa.** Em Remessas, cada linha mostra o estado das **três fontes**
(OTM, SFTP, planilha). É o que o RPA alimenta e é a razão de a plataforma existir:
a camada de reconciliação que hoje não existe e é feita por uma pessoa olhando duas telas.

---

## Regras que não se negociam

Estas não são preferências estéticas. São decisões de produto tomadas na reunião de
01/09/2026 e registradas na ata. Remover qualquer uma muda o risco do sistema.

- **A prévia com confirmação humana nunca sai.** O robô monta o dado, mas quem emite o
  documento fiscal é a pessoa. Sem esse ponto de controle, um erro de reconciliação vira
  emissão errada em massa.
- **Falha nunca é silenciosa.** Se uma fonte não respondeu ou o arquivo chegou fora do
  padrão NOTEFIZ, a tela diz qual e o que fazer.
- **Emissão fica bloqueada enquanto as três fontes não conferem.** O botão fica
  desabilitado, não escondido — o operador precisa entender por que não pode agir.
- **Verde, âmbar e vermelho só comunicam estado de dado.** Nunca decoram, nunca entram
  em botão ou fundo de seção.
- **Nada anima sozinho.** Movimento responde a ação: abrir a prévia, confirmar, fechar.

---

## O que é falso neste protótipo

Para não haver dúvida na hora de implementar:

- **O login aceita qualquer credencial preenchida.** Não há autenticação.
- **As 18 remessas são fixas**, no array `REMESSAS` dentro de `remessas.html`.
  No sistema real vêm da API alimentada pelo RPA de coleta.
- **"Coletar agora" e "Emitir CT-e" simulam** com `setTimeout`. Nenhuma chamada sai daqui.
- **Manifestos, Indicadores e Automações** estão na navegação como itens desabilitados,
  para mostrar o portal como guarda-chuva. Não têm tela.

---

## Decisões (2026-09-11)

- **Manifesto fora** do 1º entregável — o item do menu continua desabilitado de propósito.
- Este mockup **é** o recorte visual do 1º entregável: expedição (Início + Remessas), não um painel de todos os setores.
- API GW e CNPJ/endereço não mudam estas telas agora. Dados de remessa virão do RPA (Vini) / seed.

---

FM Transportes × Prottus
