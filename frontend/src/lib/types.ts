/** Domain types mirroring the FM English API (Decimals may arrive as string|number). */

export type SourceState = 'OK' | 'WAIT' | 'FAIL';

export type ShipmentStatus =
  | 'READY'
  | 'WAITING'
  | 'FILE'
  | 'DIVERGENCE'
  | 'ISSUED';

export type ShipmentSources = {
  OTM: SourceState;
  SFTP: SourceState;
  SPREADSHEET: SourceState;
};

export type Shipment = {
  id: string;
  code: string;
  invoiceNumber: string;
  destination: string;
  customerName: string;
  freightValue: string | number;
  weightKg: string | number;
  volumeCount: number;
  status: ShipmentStatus;
  discrepancyNote: string | null;
  driverName: string | null;
  sources: ShipmentSources;
  canIssue: boolean;
  blockers?: string[];
  preview?: { driverName: string; confirmedAt: string | null } | null;
  lastIssuance?: { status: string; message: string } | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  active: boolean;
};

export type PageResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages?: number;
};

export type DashboardSummary = {
  ready: number;
  waiting: number;
  file: number;
  divergence: number;
  issuedToday: number;
  lastCollection: {
    ranAt: string;
    status: string;
    shipmentCount: number;
    readyCount: number;
    notes: string | null;
  } | null;
};

/** Formats a monetary value in pt-BR / BRL. */
export function money(value: string | number) {
  const n = typeof value === 'string' ? Number(value) : value;
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Formats a weight in kg with pt-BR grouping. */
export function weight(value: string | number) {
  const n = typeof value === 'string' ? Number(value) : value;
  return `${n.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} kg`;
}

/** Formats invoice for display (thousand separators). */
export function invoiceLabel(value: string) {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return n.toLocaleString('pt-BR');
}

/** Clock from an ISO timestamp (pt-BR). */
export function clock(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
