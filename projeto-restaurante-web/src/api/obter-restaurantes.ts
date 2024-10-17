import { Restaurante } from "../contexts/restauranteContext";
import { api } from "../lib/axios";

export async function obterRestaurantes(query?: string): Promise<Restaurante[]>{
  const response = await api.get<Restaurante[]>(`/restaurantes`, {
    params: { 
      _sort: "nome", 
      _order: "desc", 
      q: query },
  });
  
  console.log(response.data);
  
  return response.data
}