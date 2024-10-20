import { RestauranteProps } from '../contexts/RestauranteContext';
import { api } from '../lib/axios';

export async function obterRestaurantes(
  query?: string
): Promise<RestauranteProps[]> {
  const response = await api.get<RestauranteProps[]>(`/restaurantes`, {
    params: {
      _sort: 'nome',
      _order: 'desc',
      q: query,
    },
  });
  return response.data;
}
