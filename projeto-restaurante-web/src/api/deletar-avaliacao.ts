import { api } from '../lib/axios';

export interface DeletarAvaliacaoInput {
  id: string;
}

export async function deletarAvaliacao({
  id,
}: DeletarAvaliacaoInput): Promise<void> {
  const response = await api.delete<void>(`/avaliacoes/${id}`);
  return response.data;
}
