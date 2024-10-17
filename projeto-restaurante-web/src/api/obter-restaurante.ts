import { api } from "../lib/axios";

export interface ObterRestauranteInput{
    restauranteId: string;
}

export interface ObterRestauranteResponse{
    restauranteId: string;
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function obterRestaurante({restauranteId}: ObterRestauranteInput){
    const response = await api.get<ObterRestauranteResponse>(`/restaurantes/${restauranteId}`)
    return response.data
}