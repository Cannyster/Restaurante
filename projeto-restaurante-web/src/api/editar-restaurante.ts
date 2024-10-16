import { api } from "../lib/axios";

export interface EditarRestauranteInput{
    id: string;
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function editarRestaurante({id, nome , localizacao, cozinha}: EditarRestauranteInput){
    const response = await api.put(`/restaurantes/${id}`, {nome , localizacao, cozinha})
    return response.data
}