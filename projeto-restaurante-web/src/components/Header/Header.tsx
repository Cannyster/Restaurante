import {
  HeaderContainer,
  HeaderContent,
  LocalButton,
  StyledLink,
  ContainerVoid,
} from './styles';
import logo from '../../assets/logo-restaurante-thin.png';
import { useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  return (
    <header>
      <HeaderContainer>
        <HeaderContent>
          <StyledLink to={`/`}>
            <img src={logo} alt=""></img>
          </StyledLink>

          <h1>Recomendação de Restaurantes</h1>

          {location.pathname === '/' ? (
            <StyledLink to={`/restaurante/novo`}>
              <LocalButton>Novo Restaurante</LocalButton>
            </StyledLink>
          ) : (
            <ContainerVoid>Novo Restaurante</ContainerVoid>
          )}
        </HeaderContent>
      </HeaderContainer>
    </header>
  );
}
