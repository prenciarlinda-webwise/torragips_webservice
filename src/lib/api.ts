const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('tg_token');
}

export function setToken(token: string) {
  localStorage.setItem('tg_token', token);
}

export function clearToken() {
  localStorage.removeItem('tg_token');
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard/login/';
    }
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || JSON.stringify(err));
  }

  if (res.status === 204) return {} as T;
  return res.json();
}

// Auth
export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Kredencialet jane gabim');
  const data = await res.json();
  setToken(data.token);
  return data;
}

// Paginated response type
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Generic CRUD
function crud<T>(base: string) {
  return {
    list: (params = '') => request<PaginatedResponse<T>>(`/api/${base}/${params ? '?' + params : ''}`),
    get: (id: number) => request<T>(`/api/${base}/${id}/`),
    create: (data: Partial<T>) => request<T>(`/api/${base}/`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<T>) => request<T>(`/api/${base}/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/api/${base}/${id}/`, { method: 'DELETE' }),
  };
}

// Dashboard stats
export async function getDashboardStats() {
  const [clients, projects, payments, costs, pendingSituacions] = await Promise.all([
    request<PaginatedResponse<any>>('/api/clients/?page_size=1'),
    request<PaginatedResponse<any>>('/api/projects/?page_size=1'),
    request<PaginatedResponse<any>>('/api/payments/?page_size=1000'),
    request<PaginatedResponse<any>>('/api/costs/?page_size=1000'),
    request<PaginatedResponse<any>>('/api/situacion/?payment_status=pending&page_size=1000'),
  ]);

  const totalRevenue = payments.results.reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);
  const totalCosts = costs.results.reduce((sum: number, c: any) => sum + parseFloat(c.amount), 0);

  // Calculate pending payment amount from pending situacion items
  const pendingAmount = pendingSituacions.results.reduce((sum: number, s: any) => {
    const sitTotal = (s.items || []).reduce((t: number, i: any) => t + (parseFloat(i.quantity || 0) * parseFloat(i.price || 0)), 0);
    return sum + sitTotal;
  }, 0);

  return {
    totalClients: clients.count,
    totalProjects: projects.count,
    totalRevenue,
    totalCosts,
    profit: totalRevenue - totalCosts,
    pendingPaymentsCount: pendingSituacions.count,
    pendingPaymentsAmount: pendingAmount,
  };
}

// API endpoints
export const servicesApi = crud<any>('services');
export const clientsApi = crud<any>('clients');
export const projectsApi = crud<any>('projects');
export const listeCmimeshApi = crud<any>('liste-cmimesh');
export const listeCmimeshItemsApi = crud<any>('liste-cmimesh-items');
export const preventivApi = crud<any>('preventiv');
export const preventivItemsApi = crud<any>('preventiv-items');
export const situacionApi = crud<any>('situacion');
export const situacionItemsApi = crud<any>('situacion-items');
export const paymentsApi = crud<any>('payments');
export const costsApi = crud<any>('costs');
