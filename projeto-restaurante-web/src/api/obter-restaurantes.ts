import { Restaurante } from "../contexts/RestauranteContext";
import { api } from "../lib/axios";

export async function obterRestaurantes(query?: string): Promise<Restaurante[]>{
    const response = await api.get(`/restaurantes`,{
        params: { _sort: "nome", _order: "desc", q: query },
      })
      console.log(response.data);
    return response.data
}