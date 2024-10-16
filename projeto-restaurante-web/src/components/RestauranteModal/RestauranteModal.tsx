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
import { DeletarRestauranteInput } from "../../api/deletar-restaurante";

type novoRestauranteFormInputs = z.infer<typeof novoRestauranteFormSchema>;

export interface PropriedadesDetalhesRestaurante {
  id: string;
  open: boolean;
}

export function RestauranteModalDetalhes({
  id,
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
    queryKey: ["restaurantes", id],
    queryFn: () => obterRestaurante({ id }),
    enabled: open,
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
    console.log("Aqui caralho EditarRestaurante");
  }

  async function handleDeletarRestaurante(id: DeletarRestauranteInput) {
    //Alterando o estado para fechar o modal
    setSelectedrestauranteId(null);
    LimparFomulário();
    deletarRestaurante(id);
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

          <select
            id="cozinha"
            {...register("cozinha")}
            required
            disabled={isNotEditable}
          >
            <option value="Baiana">Baiana</option>
            <option value="Mineira">Mineira</option>
            <option value="Goiâna">Goiâna</option>
            <option value="Paraense">Paraense</option>
            <option value="Cearense">Cearense</option>
            <option value="Catarinense">Catarinense</option>
            <option value="Pernanbucana">Pernanbucana</option>
            <option value="Amazonense">Amazonense</option>
          </select>

          {isNotEditable ? (
            <>
              <button type="button" onClick={toggleEdit}>
                Editar
              </button>

              <button
                type="button"
                onClick={() => handleDeletarRestaurante({ id })}
              >
                Excluir
              </button>
            </>
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
