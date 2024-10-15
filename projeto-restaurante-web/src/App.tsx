import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Restaurantes } from "./pages/restaurantes/restaurantes";
import { RestaurantesProvider } from "./contexts/RestauranteContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "./lib/react-query";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
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
          <Restaurantes />
        </RestaurantesProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
