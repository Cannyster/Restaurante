import { server, router, PORT } from './config.js';
import { restaurantesRoutes } from './routes/restaurantesRoutes.js';
import { avaliacoesRoutes } from './routes/avaliacoesRoutes.js';

// Configura as rotas
restaurantesRoutes(server);
avaliacoesRoutes(server);

// Usa o roteador padrão do JSON Server
server.use(router);

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
