import { Avaliacao } from "../contexts/restauranteContext";
import { api } from "../lib/axios";

export interface ObterAvaliacoesInput{
  restauranteId: string;
}

export async function obterAvaliacoes(restauranteID: ObterAvaliacoesInput){
  const response = await api.get<Avaliacao[]>(`/avaliacoes/${restauranteID}`, {
  });
  
  console.log(response.data);
  
  return response.data
}