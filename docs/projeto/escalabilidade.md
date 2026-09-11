# Escalabilidade — Portal FM Transportes

Princípio Distac: arquitetura simples e correta primeiro; otimizar com evidência.

---

## 1. O que já está desenhado

| Prática | Por quê |
|---------|---------|
| Listagem do dia + paginação depois | Operação cabe em dezenas/centenas de remessas/dia, não em dump |
| `GET /api/dashboard/summary` | Home sem carregar a tabela inteira |
| Coleta assíncrona | OTM (2 telas) + SFTP não podem bloquear o clique “Emitir” |
| Monólito modular | Auth, shipments, issuance, users |
| Triggers leves | Integridade sem round-trip extra |

## 2. Quando não escalar mais

Poucos operadores no escritório; um Postgres local/gerenciado. Não introduzir Kafka “por padrão”.

## 3. Escada (ordem)

1. Medir (smoke/carga após scaffold)
2. Índices (`code`, `status`, `collected_at`, `invoice_number`)
3. Summary / read models
4. Fila só para coleta e para retry de API GW
5. Cache se summary ficar quente
6. Particionar `audit_log` se crescer

Cada degrau preserva JWT httpOnly e a prévia humana (não paralelizar emissão em massa sem confirmação).
