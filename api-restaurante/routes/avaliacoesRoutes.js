import { uuidv4, router } from '../config.js';
import { z } from 'zod';

const avaliacaoSchema = z.object({
  avaliacao: z.number().min(1, 'deve ser no mínimo 1').max(5, 'deve ser no máximo 5'),
  comentario: z.string().min(5, 'O comentário deve ter pelo menos 5 caracteres.'),
  usuario: z.string().min(5, 'O nome deve ter pelo menos 5 caracteres.'),
});

export const avaliacoesRoutes = (server) => {
  const db = router.db; // Acessa o banco de dados JSON

  server.get('/avaliacoes/:restauranteId', (req, res) => {
    const { restauranteId } = req.params;
    const avaliacoes = db.get('avaliacoes')
    .filter({ restauranteId: restauranteId })
    .orderBy('datahora', 'desc')
    .value();
    
    if (avaliacoes.length === 0) {
      return res.status(204).json({ message: 'Nenhuma avaliação encontrada para este restaurante.' });
    }

    res.json(avaliacoes);
  });

  server.post('/avaliacoes', (req, res) => {
    console.log(`analise da requisição: ${req}`)
    const validacaoResultado = avaliacaoSchema.safeParse(req.body);
    if (!validacaoResultado.success) {
      console.log('erro na validação dos dados')
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