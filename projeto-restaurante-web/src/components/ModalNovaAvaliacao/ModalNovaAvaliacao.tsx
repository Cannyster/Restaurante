import {
  DialogCloseButton,
  DialogContent,
  DialogOverlay,
  GlobalForm,
} from '../../styles/global';
import { RestauranteContext } from '../../contexts/RestauranteContext';
import { novaAvaliacaoSchema } from '../../validation/validation';
import { useContextSelector } from 'use-context-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { LocalButton } from './styled';
import { X } from 'phosphor-react';
import { toast } from 'sonner';
import * as z from 'zod';

type NovoAvaliacaoFormInputs = z.infer<typeof novaAvaliacaoSchema>;

interface DetalhesAvaliacaoProps {
  restauranteId: string;
  openCloseModal: () => void;
}

export function ModalNovaAvaliacao({
  restauranteId,
  openCloseModal,
  refetchAvaliacoes,
}: DetalhesAvaliacaoProps & { refetchAvaliacoes: () => void }) {
  const criarAvaliacao = useContextSelector(RestauranteContext, (context) => {
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
    openCloseModal();
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent onPointerDownOutside={LimparFomulário}>
        <Dialog.DialogTitle>Nova Avaliação</Dialog.DialogTitle>
        <Dialog.DialogDescription>
          Nos conte como foi sua experiência
        </Dialog.DialogDescription>

        <DialogCloseButton onClick={LimparFomulário}>
          <X size={24} />
        </DialogCloseButton>

        <GlobalForm onSubmit={handleSubmit(handleCriarNovaAvaliacao)}>
          <input
            type="hidden"
            value={restauranteId}
            {...register('restauranteId')}
          />

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
            Cadastrar
          </LocalButton>
        </GlobalForm>
      </DialogContent>
    </Dialog.Portal>
  );
}
