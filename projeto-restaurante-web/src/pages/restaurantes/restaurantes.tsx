import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { RestauranteContext } from "../../contexts/RestauranteContext";
import { useContextSelector } from "use-context-selector";
import { RestauranteContainer, RestauranteTable } from "./styles";
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
      <Header />
      <RestauranteContainer>
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
                    <tr key={restaurante.id}>
                      <td>
                        <DialogRoot
                          open={selectedrestauranteId === restaurante.id}
                          onOpenChange={(isOpen) =>
                            setSelectedrestauranteId(
                              isOpen ? restaurante.id : null
                            )
                          }
                        >
                          <DialogTrigger asChild>
                            <Search className="h-3 w-3" />
                          </DialogTrigger>
                          <RestauranteModalDetalhes
                            key={restaurante.id} // Força re-renderização
                            open={selectedrestauranteId === restaurante.id}
                            id={restaurante.id}
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
      </RestauranteContainer>
    </div>
  );
}
