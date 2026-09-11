#!/usr/bin/env bash
# Verifica conexão e conta registros de exemplo
set -euo pipefail

HOST="127.0.0.1"
PORT="5432"
USER="postgree"
PASS="postgree"
DB="fm_auto"
URL="postgresql://${USER}:${PASS}@${HOST}:${PORT}/${DB}"

echo "==> FM DB check ($USER@$HOST:$PORT/$DB)"

if ! command -v pg_isready >/dev/null 2>&1; then
  echo "ERRO: pg_isready não encontrado. Instale o cliente PostgreSQL."
  exit 1
fi

if ! pg_isready -h "$HOST" -p "$PORT" >/dev/null 2>&1; then
  echo "ERRO: PostgreSQL não responde em $HOST:$PORT. Inicie o serviço local."
  exit 1
fi
echo "OK  serviço no ar"

if ! psql "$URL" -c 'SELECT 1' >/dev/null 2>&1; then
  echo "ERRO: não conectou no database \"$DB\"."
  echo "Rode: bash database/scripts/setup.sh"
  exit 1
fi

psql "$URL" -c "SELECT current_database() AS db, current_user AS usr;"

psql "$URL" -c "
SELECT 'users' AS tabela, COUNT(*)::int AS qtd FROM users
UNION ALL SELECT 'shipments', COUNT(*)::int FROM shipments
UNION ALL SELECT 'source_snapshots', COUNT(*)::int FROM source_snapshots
UNION ALL SELECT 'collection_runs', COUNT(*)::int FROM collection_runs
UNION ALL SELECT 'audit_log', COUNT(*)::int FROM audit_log
ORDER BY 1;
"

echo "OK  conexão FM"
