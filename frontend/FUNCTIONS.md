# Frontend — exports

| Símbolo | Onde | Papel |
|---------|------|--------|
| `App` | `src/App.tsx` | Rotas `/login`, `/`, `/remessas`, `/usuarios` |
| `AuthProvider` / `useAuth` | `src/auth/AuthContext.tsx` | Sessão em memória + cookies |
| `apiFetch` | `src/lib/api.ts` | HTTP com `credentials: 'include'` |
| `dashboardApi` / `shipmentsApi` / `usersApi` | `src/lib/resources.ts` | Facades tipadas |
| `AppShell` | `src/components/AppShell.tsx` | Sidebar + topbar FM |
| `Icon` | `src/components/Icon.tsx` | SVG outline (sem emoji) |
