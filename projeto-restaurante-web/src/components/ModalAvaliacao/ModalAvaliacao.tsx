import * as Dialog from '@radix-ui/react-dialog';
import { Overlay, Content, CloseButton } from './styled';
import { X } from 'phosphor-react';
import { toast } from 'sonner';
import { editarAvaliacaoSchema } from '../../validation/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import {
  AvaliacaoProps,
  restauranteContext,
} from '../../contexts/restauranteContext';
import * as z from 'zod';
import { useEffect } from 'react';

type EditarAvaliacaoFormInputs = z.infer<typeof editarAvaliacaoSchema>;

interface AvaliacaoModalProps {
  avaliacao: AvaliacaoProps;
  refetchAvaliacoes: () => void;
}

export function ModalAvaliacao({
  avaliacao,
  refetchAvaliacoes,
}: AvaliacaoModalProps) {
  const editarAvaliacao = useContextSelector(restauranteContext, (context) => {
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

          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
