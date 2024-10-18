import { uuidv4, router } from "../config.js";
import { z } from "zod";

const restauranteSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  localizacao: z.string().min(1, "Localização é obrigatória"),
  cozinha: z.string().min(1, "Tipo de cozinha é obrigatório"),
});

export const restaurantesRoutes = (server) => {
  const db = router.db;

  server.get("/restaurantes", (req, res) => {
    const { cozinha, localizacao } = req.query;
    let restaurantes = db.get("restaurantes").value();
    if (cozinha) {
      restaurantes = restaurantes.filter((r) => r.cozinha === cozinha);
    }
    if (localizacao) {
      restaurantes = restaurantes.filter((r) => r.localizacao === localizacao);
    }
    res.json(restaurantes);
  });

  server.get("/restaurantes/:restauranteId", (req, res) => {
    const { restauranteId } = req.params;
    const restauranteExistente = db
      .get("restaurantes")
      .find({ restauranteId })
      .value();

    if (!restauranteExistente) {
      return res.status(404).json({ error: "Restaurante não encontrado" });
    }

    res.json(restauranteExistente);
  });

  server.post("/restaurantes", (req, res) => {
    const validationResult = restauranteSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.message() });
      // return res.status(400).json({ errors: validationResult.error.format() });
    }
    const novoRestaurante = { restauranteId: uuidv4(), ...req.body };
    db.get("restaurantes").push(novoRestaurante).write();
    res.status(201).json(novoRestaurante);
  });

  server.put("/restaurantes/:restauranteId", (req, res) => {
    const { restauranteId } = req.params;
    const validationResult = restauranteSchema.safeParse(req.body);
    const restauranteExistente = db
      .get("restaurantes")
      .find({ restauranteId })
      .value();

    if (!restauranteExistente) {
      return res.status(404).json({ error: "Restaurante não encontrado" });
    }

    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.format() });
    }

    const restauranteAtualizado = db
      .get("restaurantes")
      .find({ restauranteId })
      .assign(req.body)
      .write();

    res.json(restauranteAtualizado);
  });

  server.delete("/restaurantes/:restauranteId", (req, res) => {
    const { restauranteId } = req.params;
    const restauranteExistente = db
      .get("restaurantes")
      .find({ restauranteId })
      .value();

    if (!restauranteExistente) {
      return res.status(404).json({ message: "Restaurante não encontrado." });
    }

    db.get("restaurantes").remove({ restauranteId }).write();
    db.get("avaliacoes").remove({ restauranteId }).write();

    res.status(204).send();
  });
};
