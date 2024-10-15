import { api } from "../lib/axios";

export interface DeletarRestauranteInput{
    id: string;
}

export async function deletarRestaurante({id}: DeletarRestauranteInput){
    const response = await api.delete(`/restaurantes/${id}`)
    return response.data
}