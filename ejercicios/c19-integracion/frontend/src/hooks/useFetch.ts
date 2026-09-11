import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';

export function useFetch<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        setError(null); 
        
        const resultado = await apiFetch<T>(endpoint);
        setData(resultado);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [endpoint]); 

  return { data, loading, error };
}