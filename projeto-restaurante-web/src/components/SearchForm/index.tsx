import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestauranteContext } from "../../contexts/RestauranteContext";
import { useContextSelector } from "use-context-selector";
import { filtrarRestauranteSchema } from "../../validation/validation";

type SearchFormInputs = z.infer<typeof filtrarRestauranteSchema>;

export function SearchForm() {
  const filtrarRestaurantes = useContextSelector(
    RestauranteContext,
    (context) => {
      return context.filtrarRestaurantes;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(filtrarRestauranteSchema),
  });

  async function handleBuscarRestaurantes(data: SearchFormInputs) {
    await filtrarRestaurantes(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleBuscarRestaurantes)}>
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
