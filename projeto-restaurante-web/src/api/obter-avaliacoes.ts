import { AvaliacaoProps } from "../contexts/restauranteContext";
import { api } from "../lib/axios";

export interface ObterAvaliacoesInput{
  restauranteId: string;
}

export async function obterAvaliacoes(restauranteID: ObterAvaliacoesInput): Promise<AvaliacaoProps[]>{
  //Precisei converte aqui em String pois ao ser chamado por algum motivo ela esta sendo convertida em Object
  //console.log(`chamada da API - id extraído da url: ${id}`, typeof id); // Aqui será um objeto
  const id = restauranteID.restauranteId.toString() 
  //console.log(`chamada da API - id extraído da url: ${id}`, typeof id); // Aqui será uma string

  const response = await api.get<AvaliacaoProps[]>(`/avaliacoes/${id}`, {
  });
  
  return response.data
}