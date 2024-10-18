import {
  HeaderContainer,
  HeaderContent,
  NovoRestauranteButton,
  StyledLink,
} from './styles';
import logo from '../../assets/logo-restaurante-thin.png';

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
        </HeaderContent>
      </HeaderContainer>
    </header>
  );
}
