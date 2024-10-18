import { RestaurantesProvider } from './contexts/RestauranteContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { defaultTheme } from './styles/themes/default';
import { ThemeProvider } from 'styled-components';
import { RouterProvider } from 'react-router-dom';
import { queryClient } from './lib/react-query';
import { GlobalStyle } from './styles/global';
import { router } from './routes';
import { Toaster } from 'sonner';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Helmet titleTemplate="Restaurantes | %s" />
        <Toaster
          position="top-left"
          closeButton
          expand={true}
          toastOptions={{
            style: {
              fontSize: '16px',
              padding: '10px',
              maxWidth: '400px',
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
