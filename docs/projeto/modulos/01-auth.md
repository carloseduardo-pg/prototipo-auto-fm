# Auth — Portal FM Transportes

Login JWT httpOnly, padrão Distac. UI: `referencia-ui/index.html` — e-mail + senha, sem credenciais pré-preenchidas. Qualquer credencial no HTML é **falsa** (protótipo).

API planejada: `POST /api/auth/login|refresh|logout`, `GET /api/auth/me`. Guard global + `@Public()`.
