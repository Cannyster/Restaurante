import { AvaliacaoProps } from "../contexts/restauranteContext";
import { api } from "../lib/axios";

export interface CriarAvaliacaoInput{
    usuario: string,
    comentario: string,
    avaliacao: number,
    restauranteId: string
}

export async function criarAvaliacao({
    usuario,
    comentario,
    avaliacao,
    restauranteId
    }: CriarAvaliacaoInput): Promise<AvaliacaoProps>{
    const response = await api.post<AvaliacaoProps>(`/avaliacoes`, {
        usuario,
        comentario,
        avaliacao,
        restauranteId
    })
    return response.data
}