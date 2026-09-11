# Backend — exports

| Símbolo | Onde | Papel |
|---------|------|--------|
| `AppModule` | `src/app.module.ts` | Módulo raiz (JWT + Throttler globais) |
| `AuthService` | `src/auth/auth.service.ts` | Login / refresh / me |
| `UsersService` | `src/users/users.service.ts` | CRUD de usuários |
| `ShipmentsService` | `src/shipments/shipments.service.ts` | Lista, prévia, bloqueio de emissão |
| `DashboardService` | `src/dashboard/dashboard.service.ts` | Summary do Início |
| `validateEnv` | `src/config/env.validation.ts` | Validação do `.env` |
| `parsePage` / `pageResult` | `src/common/pagination.ts` | Envelope paginado |
| `Public` | `src/common/public.decorator.ts` | Exceção do JwtAuthGuard |
