import * as z from "zod";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvaliacaoBox, CloseButton, Content, Overlay } from "./styles";
import { useContextSelector } from "use-context-selector";
import { RestauranteContext } from "../../contexts/RestauranteContext";
import { editarRestauranteSchema } from "../../validation/validation";
import { useEffect, useState } from "react";
import { SkeletonRestauranteModal } from "../SkeletonRestauranteModal";
import { obterRestaurante } from "../../api/obter-restaurante";
import { DeletarRestauranteInput } from "../../api/deletar-restaurante";
import { queryClient } from "../../lib/react-query";
import { Avaliacao } from "../Avaliacao/Avaliacao";

type EditarRestauranteFormInputs = z.infer<typeof editarRestauranteSchema>;

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
    console.log("teste de botão editar");
  };

  const { data: restaurante, isFetching } = useQuery({
    queryKey: ["restaurantes", id],
    queryFn: () => obterRestaurante({ id }),
    staleTime: 1000 * 60 * 5, // 5 minutos de "freshness"
    gcTime: 1000 * 60 * 10, // 10 minutos de cache
    refetchOnWindowFocus: false, // Evita refetch ao focar a janela do navegador
    enabled: open && !queryClient.getQueryData(["restaurante", id]), // Apenas requisita se os dados não estão no cache
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
    defaultValues: {
      nome: restaurante?.nome || "",
      localizacao: restaurante?.localizacao || "",
      cozinha: restaurante?.cozinha || "",
    },
  });

  useEffect(() => {
    if (open && restaurante) {
      reset({
        nome: restaurante.nome || "",
        localizacao: restaurante.localizacao || "",
        cozinha: restaurante.cozinha || "",
      });
      console.log("Limpando o formulário");
    }
  }, [open, restaurante, reset]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  async function handleEditarRestaurante(dados: EditarRestauranteFormInputs) {
    editarRestaurante(dados);
    console.log("Aqui caralho EditarRestaurante");
  }

  async function handleDeletarRestaurante(id: DeletarRestauranteInput) {
    setSelectedrestauranteId(null);
    reset();
    deletarRestaurante(id);
  }

  //Aplicando SkeletonModal se os dados estiverem em  carregamento
  if (isFetching) {
    return <SkeletonRestauranteModal />;
  }

  const testebotao = () => {
    console.log("teste de botão salvar kralho");
  };

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

          <select {...register("cozinha")} disabled={isNotEditable} required>
            <option value="Baiana">Baiana</option>
            <option value="Mineira">Mineira</option>
            <option value="Goiâna">Goiana</option>
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
                  onClick={() => handleDeletarRestaurante({ id })}
                >
                  Excluir
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={testebotao}
                >
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </button>

                <button type="button" onClick={toggleEdit}>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </form>
        <AvaliacaoBox>
          {restaurante?.avaliacoes.map((avaliacao) => {
            return (
              <Avaliacao
                key={avaliacao.id}
                id={avaliacao.id}
                avaliacao={avaliacao.avaliacao}
                datahora={avaliacao.datahora}
                comentario={avaliacao.comentario}
                restauranteId={avaliacao.restauranteId}
                usuario={avaliacao.usuario}
              />
            );
          })}
        </AvaliacaoBox>
      </Content>
    </Dialog.Portal>
  );
}
