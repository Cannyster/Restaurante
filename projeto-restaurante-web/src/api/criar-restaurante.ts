import { Restaurante } from "../contexts/restauranteContext";
import { api } from "../lib/axios";

export interface CriarRestauranteInput{
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function criarRestaurante({
    nome, 
    localizacao,
    cozinha}: CriarRestauranteInput): Promise<Restaurante>{
    const response = await api.post<Restaurante>(`/restaurantes`, {
        nome,
        localizacao,
        cozinha
    })
    return response.data
}