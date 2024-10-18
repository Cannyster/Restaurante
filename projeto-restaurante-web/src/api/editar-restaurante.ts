import { RestauranteProps } from '../contexts/RestauranteContext';
import { api } from '../lib/axios';

export interface EditarRestauranteInput {
  restauranteId: string;
  nome: string;
  localizacao: string;
  cozinha: string;
}

export async function editarRestaurante({
  restauranteId,
  nome,
  localizacao,
  cozinha,
}: EditarRestauranteInput): Promise<RestauranteProps> {
  const response = await api.put<RestauranteProps>(
    `/restaurantes/${restauranteId}`,
    {
      nome,
      localizacao,
      cozinha,
    }
  );
  return response.data;
}
