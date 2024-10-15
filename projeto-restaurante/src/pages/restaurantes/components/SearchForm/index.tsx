import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestauranteContext } from "../../../../contexts/RestauranteContext";
import { useContextSelector } from "use-context-selector";

const SearchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof SearchFormSchema>;

export function SearchForm() {
  const buscarEventos = useContextSelector(RestauranteContext, (context) => {
    return context.buscaEventos;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(SearchFormSchema),
  });

  async function handleBuscarEventos(data: SearchFormInputs) {
    // para a query buscar corretamente foi preciso instalar a versão 0.17.0 do Json Server
    await buscarEventos(data.query);
    //console.log(data);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleBuscarEventos)}>
      <input
        type="text"
        placeholder="Busque um Restaurante"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
