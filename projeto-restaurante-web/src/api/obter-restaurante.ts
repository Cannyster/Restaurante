import { RestauranteProps } from '../contexts/RestauranteContext';
import { api } from '../lib/axios';

export interface ObterRestauranteInput {
  restauranteId: string;
}

export async function obterRestaurante({
  restauranteId,
}: ObterRestauranteInput): Promise<RestauranteProps> {
  const response = await api.get<RestauranteProps>(
    `/restaurantes/${restauranteId}`
  );
  return response.data;
}
