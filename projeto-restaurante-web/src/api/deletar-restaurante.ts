import { api } from '../lib/axios';

export interface DeletarRestauranteInput {
  restauranteId: string;
}

export async function deletarRestaurante({
  restauranteId,
}: DeletarRestauranteInput): Promise<void> {
  const response = await api.delete<void>(`/restaurantes/${restauranteId}`);
  return response.data;
}
