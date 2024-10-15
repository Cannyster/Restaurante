import { api } from "../lib/axios";

export interface CriarRestauranteInput{
    nome: string;
    localizacao: string;
    cozinha: string;
}

export async function criarRestaurante({
    nome, 
    localizacao,
    cozinha}: CriarRestauranteInput){
    const response = await api.post(`/restaurantes`, {
        nome,
        localizacao,
        cozinha
    })
    return response.data
}