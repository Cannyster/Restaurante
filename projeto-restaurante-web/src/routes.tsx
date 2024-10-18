import { RestauranteDetalhes } from './pages/RestauranteDetalhes/RestauranteDetalhes';
import { RestauranteNovo } from './pages/RestauranteNovo/RestauranteNovo';
import { Restaurantes } from './pages/Restaurantes/Restaurantes';
import { PageLayout } from './pages/_layouts/pageLayout';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from './pages/error/error';
import { NotFound } from './pages/404/404';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Restaurantes /> },
      {
        path: 'restaurante/:restauranteId',
        element: <RestauranteDetalhes />,
      },
      {
        path: 'restaurante/novo',
        element: <RestauranteNovo />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
