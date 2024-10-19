import {
  AvaliacaoProps,
  RestauranteContext,
} from '../../contexts/RestauranteContext';
import { Overlay, Content, CloseButton, LocalButton } from './styled';
import { editarAvaliacaoSchema } from '../../validation/validation';
import { useContextSelector } from 'use-context-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { X } from 'phosphor-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

type EditarAvaliacaoFormInputs = z.infer<typeof editarAvaliacaoSchema>;

interface AvaliacaoModalProps {
  avaliacao: AvaliacaoProps;
  openCloseModal: () => void;
  refetchAvaliacoes: () => void;
}

export function ModalAvaliacao({
  avaliacao,
  openCloseModal,
  refetchAvaliacoes,
}: AvaliacaoModalProps) {
  const editarAvaliacao = useContextSelector(RestauranteContext, (context) => {
    return context.editarAvaliacaoFn;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<EditarAvaliacaoFormInputs>({
    resolver: zodResolver(editarAvaliacaoSchema),
    defaultValues: {
      usuario: avaliacao.usuario,
      comentario: avaliacao.comentario,
      avaliacao: avaliacao.avaliacao,
    },
  });

  if (Object.keys(errors).length > 0) {
    console.log('Erros no formulário:', errors); // Log de erros
  }

  function LimparFomulário() {
    reset();
  }

  useEffect(() => {
    if (avaliacao) {
      reset({
        usuario: avaliacao.usuario,
        comentario: avaliacao.comentario,
        avaliacao: avaliacao.avaliacao,
      });
    }
  }, [avaliacao, reset]);

  async function handleEditarAvaliacao(dados: EditarAvaliacaoFormInputs) {
    await editarAvaliacao(dados);
    refetchAvaliacoes();
    LimparFomulário();
    openCloseModal();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        <Dialog.DialogTitle>Alterar Avaliação</Dialog.DialogTitle>
        <Dialog.Description>Id: {avaliacao.id}</Dialog.Description>

        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleEditarAvaliacao)}>
          <input type="hidden" value={avaliacao.id} {...register('id')} />

          <input
            type="text"
            placeholder="Nome do Usuário"
            required
            {...register('usuario')}
            onBlur={() => errors.usuario && toast.error(errors.usuario.message)}
          />

          <input
            type="text"
            placeholder="Comentários"
            required
            {...register('comentario')}
            onBlur={() =>
              errors.comentario && toast.error(errors.comentario.message)
            }
          />

          <input
            type="text"
            placeholder="Nota da Avaliação - 1 a 5"
            required
            {...register('avaliacao', { valueAsNumber: true })}
            onBlur={() =>
              errors.avaliacao && toast.error(errors.avaliacao.message)
            }
          />

          <LocalButton type="submit" disabled={isSubmitting}>
            Salvar
          </LocalButton>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
