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

export function NovaAvaliacaoModal() {
  // Usando o use-context-selector, para selecionar unicamente uma informação que deve ser acompanhada
  // assim vai evitar a renderização completa que eo padrão do react
  const criarAvaliacao = useContextSelector(restauranteContext, (context) => {
    return context.criarRestauranteFn;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NovoAvaliacaoFormInputs>({
    resolver: zodResolver(novaAvaliacaoSchema),
  });

  //console.log(errors)

  function LimparFomulário() {
    reset();
    setValue("usuario", "");
    setValue("comentario", "");
    setValue("avaliacao", "");
    setValue("restauranteId", "");
  }

  async function handleCriarNovaAvaliacao(dados: NovoAvaliacaoFormInputs) {
    criarAvaliacao(dados);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        <Dialog.DialogTitle>Nova Avaliação</Dialog.DialogTitle>

        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCriarNovaAvaliacao)}>
          <input
            type="Text"
            placeholder="Nome do Usuário"
            required
            {...register("usuario")}
            onBlur={() => errors.usuario && toast.error(errors.usuario.message)}
          />

          <input
            type="Text"
            placeholder="Comentários"
            required
            {...register("comentario")}
            onBlur={() =>
              errors.comentario && toast.error(errors.comentario.message)
            }
          />

          <input
            type="text"
            placeholder="Nota da Avaliação"
            required
            {...register("avaliacao")}
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
