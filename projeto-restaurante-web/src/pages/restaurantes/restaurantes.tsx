import { RestauranteContext } from '../../contexts/RestauranteContext';
import { MainContainer, RestauranteTable, StyledLink } from './styles';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { useContextSelector } from 'use-context-selector';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';

export function Restaurantes() {
  const restaurantes = useContextSelector(RestauranteContext, (context) => {
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
