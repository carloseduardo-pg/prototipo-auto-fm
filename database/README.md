# Database (ops)

Postgres local, sem Docker. Database: `fm_auto`.

```bash
npm run setup          # cria DB + migrate + seed
bash database/scripts/check.sh
bash database/scripts/studio.sh
```

Não commitar dumps com dados reais de motorista/NF.

Tabelas: `users`, `shipments`, `source_snapshots`, `discrepancies`, `cte_previews`, `cte_issuances`, `collection_runs`, `audit_log`.
