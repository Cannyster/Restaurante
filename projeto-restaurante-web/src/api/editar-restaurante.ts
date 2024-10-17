import { Restaurante } from "../contexts/RestauranteContext";
import { api } from "../lib/axios";

export interface EditarRestauranteInput{
    restauranteId: string;
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function editarRestaurante({
    restauranteId, 
    nome, 
    localizacao, 
    cozinha}: EditarRestauranteInput): Promise<Restaurante>{
        const response = await api.put<Restaurante>(`/restaurantes/${restauranteId}`, {
            nome, 
            localizacao, 
            cozinha})
        return response.data
}