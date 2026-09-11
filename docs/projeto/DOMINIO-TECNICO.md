# Domínio técnico — Portal FM Transportes

**Audiência:** tech lead e quem for evoluir o portal.  
**Estado:** scaffold rodável (Nest + React + Prisma `fm_auto`). Mockup HTML em `referencia-ui/`. Fontes de descoberta em [`documentacao-base/`](documentacao-base/).

| Tema | Arquivo |
|------|---------|
| Arquitetura | [`ARQUITETURA-WEB.md`](ARQUITETURA-WEB.md) |
| Fluxo | [`FLUXO-APLICACAO.md`](FLUXO-APLICACAO.md) |
| Specs | [`especificacoes.md`](especificacoes.md) |
| Segurança | [`seguranca.md`](seguranca.md) |
| Escala | [`escalabilidade.md`](escalabilidade.md) |
| Negócio | [`mapa-entidades.md`](mapa-entidades.md) |
| Origem Distac | [`USAR-COMO-BASE.md`](USAR-COMO-BASE.md) |
| UI | [`../../referencia-ui/`](../../referencia-ui/) |
| Metodologia | [`../prottus/metodologia.md`](../prottus/metodologia.md) |

---

## 1. O que este projeto é

1. **Produto:** portal de expedição da FM Transportes — reconciliação OTM + SFTP + planilha e emissão de CT-e no GW.
2. **Clone da base Prottus:** mesma stack e os mesmos pilares de auth/segurança/escala do Distac. Troca-se o domínio de vendas (clientes/produtos/pedidos) por remessas/fontes/emissão.

**Pergunta de sabatina:** *por que um portal de CT-e nasce com Helmet, audit_log e JwtAuthGuard global?*  
Porque a barra é da **empresa**, não do tamanho do primeiro módulo.

```
SPA React :5190  ←cookies→  Nest /api :3000  →  PostgreSQL fm_auto
                                      ↓
                          jobs: OTM · SFTP · Excel · GW
```

Sem Docker neste padrão.

---

## 2. O que não é

- Não é reescrita do GW.
- Não é RPA de digitação.
- Não é a central de todos os setores (fase posterior até alinhamento com sócios).
- Não é o Distac: não copiar `clients` / `products` / `orders` para produção.

---

## 3. Restrições da fonte (impactam desenho)

- OTM: duas telas obrigatórias (custos + dados do CT-e).
- SFTP: NOTEFIZ nem sempre chega.
- Planilha: fonte transitória; colunas reais no xlsx do guarda-chuva.
- API GW e ambiente de teste do GW: fase seguinte. Neste protótipo não emitir CT-e real.
- Coleta OTM/SFTP: RPA do Vini; o portal consome o resultado.
- Manifesto: fora do 1º entregável.

---

## 4. Scaffold (próximo)

Seguir Distac: `frontend/`, `backend/`, `database/`, `tests/`. Substituir domínio. Tokens: copiar `referencia-ui/assets/tokens.css` → `frontend/src/styles/fm-tokens.css`. Logo: `imagens/`.

Login seed: criar usuário de demonstração **sem** reutilizar senha Distac em produção; `SEED_DEMO_USER_ON_BOOT=false` fora do local.

---

## 5. Incidentes já ocorridos no guarda-chuva (não repetir)

- Pesquisa institucional aplicada a **empresas homônimas** (site SP 2004; CNPJ/Instagram de terceiros). Fonte válida: LinkedIn `fmtransp` + logos do cliente.
- Nome “FM Logística” / “CSC Amarante” em rascunhos do plano de trabalho — corrigido na v4.

---

## 6. Papéis Prottus

Sidney lidera. Charllys executa código. Cadu traduz negócio e coordena. Gutemberg valida regra operacional da FM.
