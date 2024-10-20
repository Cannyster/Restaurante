import {
  DialogCloseButton,
  DialogContent,
  DialogOverlay,
  GlobalForm,
} from '../../styles/global';
import {
  RestauranteContext,
  RestauranteProps,
} from '../../contexts/RestauranteContext';
import { editarRestauranteSchema } from '../../validation/validationSchemas';
import { useContextSelector } from 'use-context-selector';
import { ButtonContainer, LocalButton } from './styles';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { X } from 'phosphor-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';

type EditarRestauranteFormInputs = z.infer<typeof editarRestauranteSchema>;
export interface DetalhesRestauranteProps {
  restaurante: RestauranteProps;
  openCloseModal: () => void;
  refetchRestaurantes: () => void;
}

export function ModalRestaurante({
  restaurante,
  openCloseModal,
  refetchRestaurantes,
}: DetalhesRestauranteProps) {
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
  } = useForm<EditarRestauranteFormInputs>({
    resolver: zodResolver(editarRestauranteSchema),
    defaultValues: {
      restauranteId: restaurante.restauranteId || '',
      nome: restaurante.nome || '',
      localizacao: restaurante.localizacao || '',
      cozinha: restaurante.cozinha || '',
    },
  });

  useEffect(() => {
    if (restaurante) {
      reset({
        restauranteId: restaurante.restauranteId || '',
        nome: restaurante.nome || '',
        localizacao: restaurante.localizacao || '',
        cozinha: restaurante.cozinha || '',
      });
    }
  }, [open, restaurante, reset]);

  function LimparFomulário() {
    reset();
  }

  function cancelar() {
    LimparFomulário();
    openCloseModal();
  }

  async function handleEditarRestaurante(dados: EditarRestauranteFormInputs) {
    await editarRestaurante(dados);
    refetchRestaurantes();
    openCloseModal();
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent onPointerDownOutside={LimparFomulário}>
        <Dialog.Title>Detalhes Do Restaurante</Dialog.Title>
        <Dialog.DialogDescription>
          Restaurante Id: {restaurante.restauranteId}
        </Dialog.DialogDescription>

        <DialogCloseButton onClick={LimparFomulário}>
          <X size={24} />
        </DialogCloseButton>

        <GlobalForm onSubmit={handleSubmit(handleEditarRestaurante)}>
          <input
            type="hidden"
            value={restaurante.restauranteId}
            {...register('restauranteId')}
          />
          <input
            type="Text"
            placeholder="Nome do Restaurante"
            required
            {...register('nome')}
            onBlur={() => errors.nome && toast.error(errors.nome.message)}
          />
          <input
            type="Text"
            placeholder="Localização Do Restaurante"
            required
            {...register('localizacao')}
            onBlur={() =>
              errors.localizacao && toast.error(errors.localizacao.message)
            }
          />
          <select {...register('cozinha')} required>
            <option value="Baiana">Baiana</option>
            <option value="Mineira">Mineira</option>
            <option value="Goiana">Goiana</option>
            <option value="Paraense">Paraense</option>
            <option value="Cearense">Cearense</option>
            <option value="Catarinense">Catarinense</option>
            <option value="Pernanbucana">Pernanbucana</option>
            <option value="Amazonense">Amazonense</option>
          </select>
          <ButtonContainer>
            <LocalButton type="button" onClick={cancelar}>
              Cancelar
            </LocalButton>
            <LocalButton type="submit" disabled={isSubmitting}>
              Salvar
            </LocalButton>
          </ButtonContainer>
        </GlobalForm>
      </DialogContent>
    </Dialog.Portal>
  );
}
