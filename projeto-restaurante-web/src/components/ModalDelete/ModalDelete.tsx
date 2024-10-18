import {
  ButtonContainer,
  CloseButton,
  Content,
  LocalButton,
  Overlay,
} from './styles';
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
      <Overlay />
      <Content>
        <h2>Confirmar Exclusão</h2>
        <p>Você tem certeza de que deseja excluir {textoExclusao}?</p>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <ButtonContainer>
          <LocalButton type="button" onClick={openCloseModal}>
            Cancelar
          </LocalButton>
          <LocalButton type="button" onClick={executarDeleteFunction}>
            Confirmar
          </LocalButton>
        </ButtonContainer>
      </Content>
    </Dialog.Portal>
  );
}
