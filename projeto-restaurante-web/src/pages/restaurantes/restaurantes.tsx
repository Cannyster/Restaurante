import { SearchForm } from "../../components/SearchForm/index";
import { RestauranteContext } from "../../contexts/RestauranteContext";
import { useContextSelector } from "use-context-selector";
import { RestauranteTable } from "./styles";
import { DialogTrigger, Root as DialogRoot } from "@radix-ui/react-dialog";
import { RestauranteModalDetalhes } from "../../components/RestauranteModal/RestauranteModal";
import { Search } from "lucide-react";

export function Restaurantes() {
  const selectedrestauranteId = useContextSelector(
    RestauranteContext,
    (context) => context.selectedrestauranteId
  );

  const setSelectedrestauranteId = useContextSelector(
    RestauranteContext,
    (context) => context.setSelectedrestauranteId
  );

  const restaurantes = useContextSelector(RestauranteContext, (context) => {
    return context.restaurantesCache;
  });

  return (
    <div>
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
                      <DialogRoot
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
                      </DialogRoot>
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
    </div>
  );
}
