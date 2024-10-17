import * as z from "zod";
import { toast } from "sonner";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { Avaliacao } from "../Avaliacao/Avaliacao";
import { queryClient } from "../../lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { obterRestaurante } from "../../api/obter-restaurante";
import { editarRestauranteSchema } from "../../validation/validation";
import { RestauranteContext } from "../../contexts/RestauranteContext";
import { SkeletonRestauranteModal } from "../SkeletonRestauranteModal";
import { AvaliacaoBox, CloseButton, Content, Overlay } from "./styles";
import { DeletarRestauranteInput } from "../../api/deletar-restaurante";

type EditarRestauranteFormInputs = z.infer<typeof editarRestauranteSchema>;
export interface PropriedadesDetalhesRestaurante {
  restauranteId: string;
  open: boolean;
}

export function RestauranteModalDetalhes({
  restauranteId,
  open,
}: PropriedadesDetalhesRestaurante) {
  const setSelectedrestauranteId = useContextSelector(
    RestauranteContext,
    (context) => context.setSelectedrestauranteId
  );

  const [isNotEditable, setIsNotEditable] = useState(true);

  const toggleEdit = () => {
    setIsNotEditable((prevState) => !prevState);
  };

  const { data: restaurante, isFetching } = useQuery({
    queryKey: ["restaurante", restauranteId],
    queryFn: () => obterRestaurante({ restauranteId }),
    staleTime: 1000 * 60 * 5, // 5 minutos de "freshness"
    gcTime: 1000 * 60 * 10, // 10 minutos de cache
    refetchOnWindowFocus: false, // Evita refetch ao focar a janela do navegador
    enabled: open && !queryClient.getQueryData(["restaurante", restauranteId]), // Apenas requisita se os dados não estão no cache
  });

  const editarRestaurante = useContextSelector(
    RestauranteContext,
    (context) => {
      return context.editarRestauranteFn;
    }
  );

  const deletarRestaurante = useContextSelector(
    RestauranteContext,
    (context) => {
      return context.deletarRestauranteFn;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<EditarRestauranteFormInputs>({
    resolver: zodResolver(editarRestauranteSchema),
  });

  if (Object.keys(errors).length > 0) {
    console.log("Erros no formulário:", errors); // Log de erros
  }

  useEffect(() => {
    if (open && restaurante) {
      console.log("Restaurante data:", restaurante); // Adicione este log para debugar
      reset({
        restauranteId: restaurante.restauranteId || "",
        nome: restaurante.nome || "",
        localizacao: restaurante.localizacao || "",
        cozinha: restaurante.cozinha || "",
      });
    }
  }, [open, restaurante, reset]);

  async function handleEditarRestaurante(dados: EditarRestauranteFormInputs) {
    await editarRestaurante(dados);
  }

  async function handleDeletarRestaurante(
    restauranteId: DeletarRestauranteInput
  ) {
    setSelectedrestauranteId(null);
    await deletarRestaurante(restauranteId);
    reset();
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
          Restaurante Id: {restauranteId}
        </Dialog.DialogDescription>

        <CloseButton onClick={!isNotEditable ? toggleEdit : undefined}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditarRestaurante)}>
          <input
            type="hidden"
            value={restauranteId}
            {...register("restauranteId")}
          />
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
          <select {...register("cozinha")} disabled={isNotEditable} required>
            <option value="Baiana">Baiana</option>
            <option value="Mineira">Mineira</option>
            <option value="Goiana">Goiana</option>
            <option value="Paraense">Paraense</option>
            <option value="Cearense">Cearense</option>
            <option value="Catarinense">Catarinense</option>
            <option value="Pernanbucana">Pernanbucana</option>
            <option value="Amazonense">Amazonense</option>
          </select>
          <div>
            {isNotEditable ? (
              <>
                <button type="button" onClick={toggleEdit}>
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletarRestaurante({ restauranteId })}
                >
                  Excluir
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => console.log()}
                >
                  Salvar
                </button>

                <button type="button" onClick={toggleEdit}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
