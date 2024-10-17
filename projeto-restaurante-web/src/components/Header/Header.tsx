import {
  HeaderContainer,
  HeaderContent,
  NovoEventoButton,
  StyledLink,
} from "./styles";
import { NovoRestauranteModal } from "../NovoRestauranteModal";
import * as Dialog from "@radix-ui/react-dialog";
import logo from "../../assets/logo-restaurante-thin.png";

export function Header() {
  return (
    <header>
      <HeaderContainer>
        <HeaderContent>
          <StyledLink to={`/`}>
            <img src={logo} alt=""></img>
          </StyledLink>

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
