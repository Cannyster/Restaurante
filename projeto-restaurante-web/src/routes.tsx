import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/404/404";
import { Restaurantes } from "./pages/restaurantes/restaurantes";
import { ErrorPage } from "./pages/error/error";
import { PageLayout } from "./pages/_layouts/pageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/", element: <Restaurantes /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
