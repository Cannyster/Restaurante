import { Title, Text, Container, StyledLink } from './styles';

export function NotFound() {
  return (
    <Container>
      <Title>Página não encontrada</Title>
      <Text>
        Voltar para <StyledLink to="/">Restaurantes</StyledLink>
      </Text>
    </Container>
  );
}
