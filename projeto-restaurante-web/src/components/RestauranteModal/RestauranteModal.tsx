import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton, Content, Overlay } from "./styles";
import { useContextSelector } from "use-context-selector";
import { RestauranteContext } from "../../contexts/RestauranteContext";
import { novoRestauranteFormSchema } from "../../validation/validation";
import { useEffect, useState } from "react";
import { SkeletonRestauranteModal } from "../SkeletonRestauranteModal";
import { obterRestaurante } from "../../api/obter-restaurante";

type novoRestauranteFormInputs = z.infer<typeof novoRestauranteFormSchema>;

export interface PropriedadesDetalhesRestaurante {
  id: string;
  open: boolean;
}

export function RestauranteModalDetalhes({
  id,
  open,
}: PropriedadesDetalhesRestaurante) {
  // (Flag) estado para controlar se o input pode ser editado
  const [isNotEditable, setIsNotEditable] = useState(true);

  // Função que alterna a flag de edição do input
  const toggleEdit = () => {
    setIsNotEditable((prevState) => !prevState);
  };

  const { data: restaurante, isFetching } = useQuery({
    queryKey: ["restaurante", id],
    queryFn: () => obterRestaurante({ id }),
    enabled: open,
    //vai ser ativo apenas se a propriedade open for true, desativa a busca automatica
    //por isso vai ser true apenas quando um modal for aberto na página restaurantes.
    //controlado pelo estado - isModalOpen - que inicia com valor false
    //decidi usar useQuery devido ao cacheamento de informações e outras vantagens que ela possui em relação a  useCallback
    //ela foi construida fora do contexto pois este eo único local, que precisará dela
  });

  const editarRestaurante = useContextSelector(
    RestauranteContext,
    (context) => {
      return context.editarRestauranteFn;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<novoRestauranteFormInputs>({
    resolver: zodResolver(novoRestauranteFormSchema),
    defaultValues: {
      nome: restaurante?.nome || "",
      localizacao: restaurante?.localizacao || "",
      cozinha: restaurante?.cozinha || "",
    },
  });

  useEffect(() => {
    if (open && restaurante) {
      setValue("nome", restaurante.nome || "");
      setValue("localizacao", restaurante.localizacao || "");
      setValue("cozinha", restaurante.cozinha || "");
    }
  }, [open, restaurante, setValue, toggleEdit]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function LimparFomulário() {
    reset();
    setValue("nome", "");
    setValue("localizacao", "");
    setValue("cozinha", "");
  }

  async function handleEditarRestaurante(dados: novoRestauranteFormInputs) {
    editarRestaurante(dados);
    LimparFomulário();
  }

  //Aplicando SkeletonModal se os dados estiverem em  carregamento
  if (isFetching) {
    return <SkeletonRestauranteModal />;
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={!isNotEditable ? toggleEdit : undefined}>
        <Dialog.Title>Detalhes Do Restaurante</Dialog.Title>
        <Dialog.DialogDescription>
          Restaurante Id: {id}
        </Dialog.DialogDescription>

        <CloseButton onClick={!isNotEditable ? toggleEdit : undefined}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditarRestaurante)}>
          <input
            type="Text"
            placeholder="Nome do Restaurante"
            required
            {...register("nome")}
            onBlur={() => errors.nome && toast.error(errors.nome.message)}
            disabled={isNotEditable}
          />

          <input
            type="Text"
            placeholder="Localização Do Restaurante"
            required
            {...register("localizacao")}
            onBlur={() =>
              errors.localizacao && toast.error(errors.localizacao.message)
            }
            disabled={isNotEditable}
          />

          <input
            type="Text"
            placeholder="Tipo de Cozinha"
            required
            {...register("cozinha")}
            onBlur={() => errors.cozinha && toast.error(errors.cozinha.message)}
            disabled={isNotEditable}
          />

          {isNotEditable ? (
            <button type="button" onClick={toggleEdit}>
              Editar
            </button>
          ) : (
            <>
              <button type="submit" disabled={isSubmitting}>
                Salvar
              </button>

              <button type="button" onClick={toggleEdit}>
                Cancelar
              </button>
            </>
          )}
        </form>
      </Content>
    </Dialog.Portal>
  );
}
