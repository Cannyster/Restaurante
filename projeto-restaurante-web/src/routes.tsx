import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404/404";
import { Restaurantes } from "./pages/Restaurantes/Restaurantes";
import { ErrorPage } from "./pages/error/error";
import { PageLayout } from "./pages/_layouts/pageLayout";
import { RestauranteDetalhes } from "./pages/RestauranteDetalhes/RestauranteDetalhes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Restaurantes /> },
      {
        path: "restaurante/:id",
        element: <RestauranteDetalhes restaurante={undefined} />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
