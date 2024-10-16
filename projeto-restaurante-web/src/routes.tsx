import { createBrowserRouter } from "react-router-dom";
// import { Dashboard } from "./pages/app/dashboard/dashboard";
// import { SignIn } from "./pages/auth/sign-in";
// import { SignUp } from "./pages/auth/sign-up";
// import { AuthLayout } from "./pages/_layouts/auth";
// import { AppLayout } from "./pages/_layouts/app";
// import { Orders } from "./pages/app/orders/orders";
import { NotFound } from "./pages/404/404";
import { Restaurantes } from "./pages/restaurantes/restaurantes";
import { ErrorPage } from "./pages/error/error";

// export const router = createBrowserRouter([
//     { path: '/', element: <Dashboard /> },
//     { path: '/sign-in', element: <SingIn /> }
// ])

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Restaurantes />,
    errorElement: <ErrorPage />,
    // children: [
    //   { path: "/", element: <Dashboard /> },
    //   { path: "/orders", element: <Orders /> },
    // ],
  },
  // {
  //   path: "/",
  //   element: <AuthLayout />,
  //   children: [
  //     { path: "/sign-in", element: <SignIn /> },
  //     { path: "/sign-up", element: <SignUp /> },
  //   ],
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);
