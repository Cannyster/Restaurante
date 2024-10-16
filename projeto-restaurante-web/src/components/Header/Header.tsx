import {
  HeaderContainer,
  HeaderContent,
  NovoRestauranteButton,
  StyledLink,
} from './styles';
import { ModalNovoRestaurante } from '../ModalNovoRestaurante/ModalNovoRestaurante';
import logo from '../../assets/logo-restaurante-thin.png';
import * as Dialog from '@radix-ui/react-dialog';

export function Header() {
  return (
    <header>
      <HeaderContainer>
        <HeaderContent>
          <StyledLink to={`/`}>
            <img src={logo} alt=""></img>
          </StyledLink>

          <h1>Recomendação de Restaurantes</h1>

          <StyledLink to={`/restaurante/novo`}>
            <NovoRestauranteButton>Novo Restaurante</NovoRestauranteButton>
          </StyledLink>

          {/* <Dialog.Root>
            <Dialog.DialogTrigger asChild>
              <NovoRestauranteButton>Novo Restaurante</NovoRestauranteButton>
            </Dialog.DialogTrigger>
            <ModalNovoRestaurante />
          </Dialog.Root> */}
        </HeaderContent>
      </HeaderContainer>
    </header>
  );
}
// <Dialog.Portal> - ajuda a colocar o conteúdo fora de todas as estruturas em que ele esta, como se fosse um elemento externo ao local de origem
