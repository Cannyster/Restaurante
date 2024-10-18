import { AvaliacaoProps } from '../contexts/RestauranteContext';
import { api } from '../lib/axios';

export interface EditarAvaliacaoInput {
  id: string;
  usuario: string;
  comentario: string;
  avaliacao: number;
}

export async function editarAvaliacao({
  id,
  usuario,
  comentario,
  avaliacao,
}: EditarAvaliacaoInput): Promise<AvaliacaoProps> {
  const response = await api.put<AvaliacaoProps>(`/avaliacoes/${id}`, {
    usuario,
    comentario,
    avaliacao,
  });
  return response.data;
}
