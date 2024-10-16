import { uuidv4, router } from '../config.js';
import { z } from 'zod';

const restauranteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  localizacao: z.string().min(1, 'Localização é obrigatória'),
  tipoCozinha: z.string().min(1, 'Tipo de cozinha é obrigatório'),
});

export const restaurantesRoutes = (server) => {
  const db = router.db; 

  server.get('/restaurantes', (req, res) => {
    const { tipoCozinha, localizacao } = req.query;
    let restaurantes = db.get('restaurantes').value();
    if (tipoCozinha) {
      restaurantes = restaurantes.filter(r => r.tipoCozinha === tipoCozinha);
    }
    if (localizacao) {
      restaurantes = restaurantes.filter(r => r.localizacao === localizacao);
    }
    res.json(restaurantes);
  });

  server.get('/restaurantesComAvaliacoes/:id', (req, res) => {
    const db = router.db; // Acessa o banco de dados JSON
    const restauranteId = req.params.id;
  
    const restaurante = db.get('restaurantes').find({ id: restauranteId }).value();
  
    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante não encontrado' });
    }
  
    const avaliacoes = db
      .get('avaliacoes')
      .filter({ restauranteId })
      .orderBy(['datahora'], ['desc'])
      .value();

    const resultado = {
      ...restaurante,
      avaliacoes: avaliacoes || [],
    };
  
    res.json(resultado);
  });

  server.post('/restaurantes', (req, res) => {
    const validationResult = restauranteSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.format() });
    }
    const novoRestaurante = { id: uuidv4(), ...req.body };
    db.get('restaurantes').push(novoRestaurante).write();
    res.status(201).json(novoRestaurante);
  });

  server.put('/restaurantes/:idrestaurante', (req, res) => {
    const validationResult = restauranteSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.format() });
    }
    const { idrestaurante } = req.params;
    const restauranteAtualizado = db.get('restaurantes')
      .find({ id: idrestaurante })
      .assign(req.body)
      .write();

    res.json(restauranteAtualizado);
  });

  server.delete('/restaurantes/:idrestaurante', (req, res) => {
    const { idrestaurante } = req.params;
    db.get('restaurantes').remove({ id: idrestaurante }).write();
    res.status(204).send();
  });
};