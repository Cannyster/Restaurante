import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { RestaurantesProvider } from "./contexts/RestauranteContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./lib/react-query";
import { router } from "./routes";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Helmet titleTemplate="%s | Restaurantes" />
        <Toaster
          position="top-left"
          closeButton
          expand={true}
          toastOptions={{
            style: {
              fontSize: "16px",
              padding: "10px",
              maxWidth: "400px",
            },
          }}
        />
        <QueryClientProvider client={queryClient}>
          <RestaurantesProvider>
            <RouterProvider router={router} />
          </RestaurantesProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
