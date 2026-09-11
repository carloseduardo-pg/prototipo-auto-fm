# Tabelas

Aplicado no scaffold (`fm_auto`):

| Tabela | Papel |
|--------|--------|
| `users` | Operadores / admin (JWT) |
| `collection_runs` | Execução de coleta (seed / futuro RPA) |
| `shipments` | Remessas do dia |
| `source_snapshots` | Estado OTM / SFTP / planilha por remessa |
| `discrepancies` | Divergências explícitas |
| `cte_previews` | Prévia humana + motorista |
| `cte_issuances` | Tentativa de emissão (GW ainda bloqueado) |
| `audit_log` | Só triggers |

Ver `docs/projeto/mapa-entidades.md` e `backend/prisma/schema.prisma`.
