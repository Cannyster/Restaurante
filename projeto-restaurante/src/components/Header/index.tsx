import { HeaderContainer, HeaderContent, NovoEventoButton } from "./styles";
import { NovoRestauranteModal } from "../NovoRestauranteModal";
import * as Dialog from "@radix-ui/react-dialog"; //https://www.radix-ui.com/primitives/docs/components/dialog
import logoImg from "../../assets/logo.svg";

export function Header() {
  return (
    <header>
      <HeaderContainer>
        <HeaderContent>
          <img src={logoImg} alt=""></img>

          <Dialog.Root>
            <Dialog.DialogTrigger asChild>
              <NovoEventoButton>Novo Restaurante</NovoEventoButton>
            </Dialog.DialogTrigger>
            <NovoRestauranteModal />
          </Dialog.Root>
        </HeaderContent>
      </HeaderContainer>
    </header>
  );
}
// <Dialog.Portal> - ajuda a colocar o conteúdo fora de todas as estruturas em que ele esta, como se fosse um elemento externo ao local de origem
