import { api } from "../lib/axios";

export interface ObterRestauranteInput{
    id: string;
}

export interface ObterRestauranteResponse{
    id: string;
    nome: string;
    localizacao: string;
    cozinha: string;
    avaliacoes:{
        id: string,
        restauranteId: string,
        usuario: string,
        comentario: string,
        avaliacao: number,
        datahora: string
    }[]
}

export async function obterRestaurante({id}: ObterRestauranteInput){
    const response = await api.get<ObterRestauranteResponse>(`/restaurantesComAvaliacoes/${id}`)
    return response.data
}