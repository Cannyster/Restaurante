

import { api } from "../lib/axios";

export interface EditarRestauranteInput{
    id: string;
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function editarRestaurante({id,...resto}: EditarRestauranteInput){
    const response = await api.put(`/restaurantes/${id}`, {resto})
    return response.data
}