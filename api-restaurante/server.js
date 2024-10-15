import jsonServer from 'json-server';
import { v4 as uuidv4 } from 'uuid';

const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware para gerar o ID com uuid antes de criar um evento
server.use(jsonServer.bodyParser);

server.post('/restaurantes', (req, res, next) => {
    req.body.id = uuidv4(); // Gerando o ID com uuid
    next();
});

server.post('/avaliacoes', (req, res, next) => {
    req.body.id = uuidv4(); // Gerando o ID com uuid
    req.body.datahora = new Date().toISOString();
    next();
});

// Middleware para excluir avaliações vinculadas ao excluir um restaurante
server.delete('/restaurantes/:id', (req, res) => {
    const restauranteId = req.params.id;
    const db = router.db;
  
    // Remove as avaliações associadas ao restaurante
    const avaliacoes = db.get('avaliacoes').value();
    const avaliacoesRelacionadas = avaliacoes.filter(
      (avaliacao) => avaliacao.restauranteId === restauranteId
    );
    avaliacoesRelacionadas.forEach((avaliacao) => {
      db.get('avaliacoes').remove({ id: avaliacao.id }).write();
    });
  
    // Remove o restaurante
    db.get('restaurantes').remove({ id: restauranteId }).write();
  
    //especifica o status code de retorno da operação
    res.status(204).send();
});

server.delete('/avaliacoes/:id', (req, res) => {
  const avaliacaoId = req.params.id;
  const db = router.db;

  // Remove a avaliação
  db.get('avaliacoes').remove({ id: avaliacaoId }).write();

  //especifica o status code de retorno da operação
  res.status(204).send();
});

// Rotas padrão
server.use(router);

const PORT = 3335;

// Inicia o servidor
server.listen(PORT, () => {
    console.log(`JSON Server está rodando em http://localhost:${PORT}`);
});
