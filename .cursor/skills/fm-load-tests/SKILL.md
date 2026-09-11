---
name: fm-load-tests
description: >-
  Smoke and load tests after scaffold (health, login throttle, list shipments).
  Use when running tests/load or stress.
---

# FM — testes de carga

Quando `tests/load` existir (cópia Distac adaptada): `node tests/load/run-node.mjs smoke`.

Cenários FM: login, summary, listagem de remessas. Não disparar emissão real no GW em teste de carga.
