import { uuidv4, router } from '../config.js';
import { z } from 'zod';

const avaliacaoSchema = z.object({
  restauranteId: z.string().min(1, 'ID do restaurante é obrigatório'),
  nota: z.number().min(1, 'Nota deve ser no mínimo 1').max(5, 'Nota deve ser no máximo 5'),
  comentario: z.string(),
});

export const avaliacoesRoutes = (server) => {
  const db = router.db; // Acessa o banco de dados JSON

  server.get('/avaliacoes/:restauranteId', (req, res) => {
    const { restauranteId } = req.params;
    const avaliacoes = db.get('avaliacoes').filter({ restauranteId: restauranteId }).value();
    
    if (avaliacoes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma avaliação encontrada para este restaurante.' });
    }

    res.json(avaliacoes);
  });

  server.post('/avaliacoes', (req, res) => {
    const validacaoResultado = avaliacaoSchema.safeParse(req.body);
    if (!validacaoResultado.success) {
      return res.status(400).json({ errors: validacaoResultado.error.format() });
    }
    
    const novaAvaliacao = {
      id: uuidv4(),
      ...req.body,
      datahora: new Date().toISOString(),
    };
    db.get('avaliacoes').push(novaAvaliacao).write();
    res.status(201).json(novaAvaliacao);
  });

  server.put('/avaliacoes/:idavaliacao', (req, res) => {
    const validacaoResultado = avaliacaoSchema.safeParse(req.body);
    if (!validacaoResultado.success) {
      return res.status(400).json({ errors: validacaoResultado.error.format() });
    }

    const { idavaliacao } = req.params;
    const avaliacaoAtualizada = db.get('avaliacoes')
      .find({ id: idavaliacao })
      .assign(req.body)
      .write();

    res.json(avaliacaoAtualizada);
  });

  server.delete('/avaliacoes/:idavaliacao', (req, res) => {
    const { idavaliacao } = req.params;
    db.get('avaliacoes').remove({ id: idavaliacao }).write();
    res.status(204).send();
  });
};