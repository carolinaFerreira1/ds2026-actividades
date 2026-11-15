import { obtenerToken } from './sesion';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = obtenerToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const base = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';
  const path = endpoint.startsWith('/api') ? endpoint.slice(4) : endpoint;
  const url = `${base}${path}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401 && token) {
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.error || errorData.message || `Error ${response.status}`
    );
  }

  return response.json();
}