import { Restaurante } from "../contexts/restauranteContext";
import { api } from "../lib/axios";

export interface ObterRestauranteInput{
    restauranteId: string;
}

export async function obterRestaurante({restauranteId}: ObterRestauranteInput){
    const response = await api.get<Restaurante>(`/restaurantes/${restauranteId}`)
    return response.data
}