import * as z from "zod";

export const restauranteSchema = z.object({
    nome: z.string().min(5, 'O Nome deve ter pelo menos 5 caracteres.'),
    localizacao: z.string().min(5, 'A Localização deve ter pelo menos 5 caracteres.'),
    cozinha: z.string().min(5, 'O detalhe deve ter pelo menos 5 caracteres.')
});

export const avaliacaoSchema = z.object({
    usuario: z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
    comentario:  z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
    avaliacao: z.number()
});