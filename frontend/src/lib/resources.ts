import { apiFetch } from './api';
import type { DashboardSummary, PageResult, Shipment, User } from './types';

export type { User };

function qs(params: Record<string, string | number | undefined>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '') sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
}

/**
 * Typed FM resource facades.
 * Every call goes through `apiFetch` (cookies + silent refresh).
 */
export const dashboardApi = {
  summary: () => apiFetch<DashboardSummary>('/dashboard/summary'),
};

export const shipmentsApi = {
  list: (opts?: { search?: string; page?: number; pageSize?: number }) =>
    apiFetch<PageResult<Shipment>>(
      `/shipments${qs({
        search: opts?.search,
        page: opts?.page ?? 1,
        pageSize: opts?.pageSize ?? 20,
      })}`,
    ),
  preview: (id: string) => apiFetch<Shipment>(`/shipments/${id}/preview`),
  collect: () =>
    apiFetch<unknown>('/shipments/collect', { method: 'POST' }),
  issue: (id: string, driverName: string) =>
    apiFetch<unknown>(`/shipments/${id}/issue`, {
      method: 'POST',
      body: JSON.stringify({ driverName }),
    }),
};

export const usersApi = {
  list: (opts?: { search?: string; page?: number; pageSize?: number }) =>
    apiFetch<PageResult<User>>(
      `/users${qs({
        search: opts?.search,
        page: opts?.page ?? 1,
        pageSize: opts?.pageSize ?? 20,
      })}`,
    ),
  create: (body: {
    name: string;
    email: string;
    password: string;
    active: boolean;
  }) =>
    apiFetch<User>('/users', { method: 'POST', body: JSON.stringify(body) }),
  update: (
    id: string,
    body: Partial<{
      name: string;
      email: string;
      password: string;
      active: boolean;
    }>,
  ) =>
    apiFetch<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  remove: (id: string) =>
    apiFetch<unknown>(`/users/${id}`, { method: 'DELETE' }),
};
