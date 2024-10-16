import { api } from "../lib/axios";

export interface ObterRestauranteInput{
    id: string;
}

export interface ObterRestauranteResponse{
    id: string;
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function obterRestaurante({id}: ObterRestauranteInput){
    const response = await api.get<ObterRestauranteResponse>(`/restaurantes/${id}`)
    return response.data
}