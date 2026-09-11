# Backend

API NestJS. Prefixo `/api`, Swagger `/api/docs`.

```bash
npm run dev --prefix backend
```

Health: `GET /api/health` → `{ "status": "ok", "service": "fm-api" }`.

Domínio: `users`, `shipments`, `source_snapshots`, `cte_previews`, `cte_issuances`, `collection_runs`, `audit_log`. Sem clients/products/orders.
