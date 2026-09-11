# Triggers

Aplicados na migration `20260911180000_init_shipments_domain_audit`:

- `fn_audit_row` — DML em users/shipments/snapshots/discrepancies/previews/issuances/collection_runs; omite `password_hash`
- `fn_set_updated_at` — `updated_at` em users/shipments/snapshots/previews
- `fn_shipment_issue_guard` — não marca remessa `ISSUED` sem registro de emissão com status `ISSUED`

Reaplicar functions: `bash database/scripts/apply-triggers.sh`.
