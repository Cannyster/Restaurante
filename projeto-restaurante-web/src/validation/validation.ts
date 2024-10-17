import * as z from "zod";

export const novoRestauranteFormSchema = z.object({
    nome: z.string().min(5, 'O Nome deve ter pelo menos 5 caracteres.'),
    localizacao: z.string().min(5, 'A Localização deve ter pelo menos 5 caracteres.'),
    cozinha: z.string(),
});

export const editarRestauranteSchema = novoRestauranteFormSchema.extend({
    restauranteId: z.string()
});

export const filtrarRestauranteSchema = z.object({
    query: z.string(),
  });

export const avaliacaoSchema = z.object({
    usuario: z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
    comentario:  z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
    avaliacao: z.number(),
    restauranteId: z.string(),
});