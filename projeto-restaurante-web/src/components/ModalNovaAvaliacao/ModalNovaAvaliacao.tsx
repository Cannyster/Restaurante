import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton } from "./styled";
import { X } from "phosphor-react";
import { toast } from "sonner";
import { novaAvaliacaoSchema } from "../../validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { restauranteContext } from "../../contexts/restauranteContext";
import * as z from "zod";

type NovoAvaliacaoFormInputs = z.infer<typeof novaAvaliacaoSchema>;

interface DetalhesAvaliacaoProps {
  restauranteId: string;
}

export function ModalNovaAvaliacao({
  restauranteId,
  refetchAvaliacoes,
}: DetalhesAvaliacaoProps & { refetchAvaliacoes: () => void }) {
  const criarAvaliacao = useContextSelector(restauranteContext, (context) => {
    return context.criarAvaliacaoFn;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<NovoAvaliacaoFormInputs>({
    resolver: zodResolver(novaAvaliacaoSchema),
  });

  function LimparFomulário() {
    reset();
  }

  async function handleCriarNovaAvaliacao(dados: NovoAvaliacaoFormInputs) {
    const { usuario, avaliacao, comentario, restauranteId } = dados;
    await criarAvaliacao({ usuario, avaliacao, comentario, restauranteId });
    refetchAvaliacoes();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        <Dialog.DialogTitle>Nova Avaliação</Dialog.DialogTitle>
        <Dialog.DialogDescription>
          Nos conte como foi sua experiência
        </Dialog.DialogDescription>

        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCriarNovaAvaliacao)}>
          <input
            type="hidden"
            value={restauranteId}
            {...register("restauranteId")}
          />

          <input
            type="text"
            placeholder="Nome do Usuário"
            required
            {...register("usuario")}
            onBlur={() => errors.usuario && toast.error(errors.usuario.message)}
          />

          <input
            type="text"
            placeholder="Comentários"
            required
            {...register("comentario")}
            onBlur={() =>
              errors.comentario && toast.error(errors.comentario.message)
            }
          />

          <input
            type="text"
            placeholder="Nota da Avaliação - 1 a 5"
            required
            {...register("avaliacao", { valueAsNumber: true })}
            onBlur={() =>
              errors.avaliacao && toast.error(errors.avaliacao.message)
            }
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
