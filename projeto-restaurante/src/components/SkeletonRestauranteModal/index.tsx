import { CloseButton } from "./skeletonStyles";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

export function SkeletonRestauranteModal() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title>Detalhes Da Atividade</Dialog.Title>
        <Dialog.DialogDescription>Atividade Id:</Dialog.DialogDescription>

        {/* <CloseButton>
          <X size={24} />
        </CloseButton> */}

        <form>
          <button type="submit" disabled>
            Salvar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
