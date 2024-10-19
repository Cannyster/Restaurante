import { ButtonContainer, DialogLocalContent, LocalButton } from './styles';
import { DialogCloseButton, DialogOverlay } from '../../styles/global';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'phosphor-react';

interface ConfirmDeleteModalProps {
  itemId: string;
  textoExclusao: string;
  deleteFunction: (itemId: string) => void;
  openCloseModal: () => void;
}

export function ModalDelete({
  itemId,
  textoExclusao,
  deleteFunction,
  openCloseModal,
}: ConfirmDeleteModalProps) {
  function executarDeleteFunction() {
    deleteFunction(itemId);
    openCloseModal();
  }

  return (
    <Dialog.Portal>
      <DialogOverlay />
      <DialogLocalContent>
        <h2>Confirmar Exclusão</h2>
        <p>Você tem certeza de que deseja excluir {textoExclusao} ?</p>

        <DialogCloseButton>
          <X size={24} />
        </DialogCloseButton>

        <ButtonContainer>
          <LocalButton type="button" onClick={openCloseModal}>
            Cancelar
          </LocalButton>
          <LocalButton type="button" onClick={executarDeleteFunction}>
            Confirmar
          </LocalButton>
        </ButtonContainer>
      </DialogLocalContent>
    </Dialog.Portal>
  );
}
