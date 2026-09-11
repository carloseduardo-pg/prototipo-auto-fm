/**
 * FM — teste de carga autenticado (k6)
 *
 *   k6 run tests/load/auth-crud.js
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = __ENV.BASE_URL || 'http://127.0.0.1:3000/api';
const EMAIL = __ENV.EMAIL || 'operador@fm.local';
const PASS = __ENV.PASS || 'fm123456';

export const options = {
  scenarios: {
    smoke: {
      executor: 'constant-vus',
      vus: Number(__ENV.VUS || 20),
      duration: __ENV.DURATION || '20s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<2000'],
  },
};

export function setup() {
  const res = http.post(
    `${BASE}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASS }),
    { headers: { 'Content-Type': 'application/json' } },
  );
  check(res, { 'setup login': (r) => r.status === 200 });
  return { cookies: res.cookies };
}

export default function (data) {
  const jar = http.cookieJar();
  if (data && data.cookies) {
    for (const [name, values] of Object.entries(data.cookies)) {
      for (const v of values) {
        jar.set(BASE.replace('/api', ''), name, v.value);
      }
    }
  }

  const summary = http.get(`${BASE}/dashboard/summary`);
  check(summary, { 'summary 200': (r) => r.status === 200 });

  const remessas = http.get(`${BASE}/shipments?page=1&pageSize=20`);
  check(remessas, { 'shipments 200': (r) => r.status === 200 });

  const users = http.get(`${BASE}/users?page=1&pageSize=20`);
  check(users, { 'users 200': (r) => r.status === 200 });

  sleep(0.2);
}
