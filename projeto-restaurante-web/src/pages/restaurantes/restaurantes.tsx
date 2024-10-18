import { SearchForm } from '../../components/SearchForm/SearchForm';
import { restauranteContext } from '../../contexts/restauranteContext';
import { useContextSelector } from 'use-context-selector';
import { MainContainer, RestauranteTable, StyledLink } from './styles';
import { Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function Restaurantes() {
  const restaurantes = useContextSelector(restauranteContext, (context) => {
    return context.restaurantesCache;
  });

  return (
    <>
      <Helmet title="Principal" />
      <MainContainer>
        <SearchForm />

        <RestauranteTable>
          <tbody>
            <tr>
              <td></td>
              <td>Nome</td>
              <td>Localização</td>
              <td>Tipo Cozinha</td>
            </tr>
            {restaurantes !== undefined
              ? restaurantes.map((restaurante) => {
                  return (
                    <tr key={restaurante.restauranteId}>
                      <td>
                        <StyledLink
                          to={`/restaurante/${restaurante.restauranteId}`}
                        >
                          <Search className="h-3 w-3" />
                        </StyledLink>
                      </td>
                      <td>{restaurante.nome}</td>
                      <td>{restaurante.localizacao}</td>
                      <td>{restaurante.cozinha}</td>
                    </tr>
                  );
                })
              : undefined}
          </tbody>
        </RestauranteTable>
      </MainContainer>
    </>
  );
}
