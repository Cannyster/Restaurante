import * as z from "zod";

export const restauranteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  localizacao: z.string().min(1, "Localização é obrigatória"),
  cozinha: z.string().min(1, "Tipo de cozinha é obrigatório"),
});

export const avaliacaoSchema = z.object({
  avaliacao: z
    .number()
    .min(1, "deve ser no mínimo 1")
    .max(5, "deve ser no máximo 5"),
  comentario: z
    .string()
    .min(5, "O comentário deve ter pelo menos 5 caracteres."),
  usuario: z.string().min(5, "O nome deve ter pelo menos 5 caracteres."),
});
