# Testes — Portal FM

Smoke / carga (API no ar):

```bash
npm run test:smoke
# ou
node tests/load/run-node.mjs smoke
```

Credenciais seed: `operador@fm.local` / `fm123456`.

k6 (opcional): `k6 run tests/load/auth-crud.js`.
