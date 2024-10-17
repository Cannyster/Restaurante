import { SearchForm } from "../../components/SearchForm/SearchForm";
import { restauranteContext } from "../../contexts/restauranteContext";
import { useContextSelector } from "use-context-selector";
import { MainContainer, RestauranteTable, StyledLink } from "./styles";
// import { DialogTrigger, Root as DialogRoot } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Restaurantes() {
  // const selectedrestauranteId = useContextSelector(
  //   restauranteContext,
  //   (context) => context.selectedrestauranteId
  // );

  // const setSelectedrestauranteId = useContextSelector(
  //   restauranteContext,
  //   (context) => context.setSelectedrestauranteId
  // );

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
                        {/* <DialogRoot
                        open={
                          selectedrestauranteId === restaurante.restauranteId
                        }
                        onOpenChange={(isOpen) =>
                          setSelectedrestauranteId(
                            isOpen ? restaurante.restauranteId : null
                          )
                        }
                      >
                        <DialogTrigger asChild>
                          <Search className="h-3 w-3" />
                        </DialogTrigger>
                        <RestauranteModalDetalhes
                          key={restaurante.restauranteId} // Força re-renderização
                          open={
                            selectedrestauranteId === restaurante.restauranteId
                          }
                          restauranteId={restaurante.restauranteId}
                        />
                      </DialogRoot> */}
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
