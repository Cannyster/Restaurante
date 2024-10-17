import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404/404";
import { Restaurantes } from "./pages/Restaurantes/Restaurantes";
import { ErrorPage } from "./pages/error/Error";
import { PageLayout } from "./pages/_layouts/PageLayout";
import { RestauranteDetalhes } from "./pages/RestauranteDetalhes/RestauranteDetalhes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Restaurantes /> },
      {
        path: "restaurante/:restauranteId",
        element: <RestauranteDetalhes />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
