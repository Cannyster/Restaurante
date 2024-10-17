import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { avaliacaoSchema } from "../../validation/validation";
import { Overlay, Content, CloseButton, Form } from "./styled";

export function AvalicaoModal({ review, closeModal }) {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(avaliacaoSchema),
    defaultValues: review || {
      usuario: "",
      comentario: "",
      avaliacao: 0,
    },
  });

  const onSubmit = (data) => {
    if (review) {
      // Lógica para editar a avaliação existente
    } else {
      // Lógica para criar nova avaliação
    }
    closeModal();
    reset();
  };

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Usuário"
            {...register("usuario")}
            required
          />
          <textarea
            placeholder="Comentário"
            {...register("comentario")}
            required
          />
          <input
            type="number"
            placeholder="Avaliação"
            {...register("avaliacao")}
            required
          />
          <button type="submit">
            {review ? "Salvar Alterações" : "Adicionar Avaliação"}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
