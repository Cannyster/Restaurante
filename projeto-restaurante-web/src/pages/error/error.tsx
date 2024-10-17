import { useRouteError } from "react-router-dom";
import { Container, ErrorDetails, StyledLink, Text, Title } from "./styles";

export function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <Container>
      <Title>Whooops, algo aconteceu...</Title>
      <Text>
        Um erro aconteceu na aplicação, abaixo você encontra mais detalhes
      </Text>
      <ErrorDetails>{error?.message || JSON.stringify(error)}</ErrorDetails>
      <Text>
        Voltar para o <StyledLink to="/">Página Principal</StyledLink>
      </Text>
    </Container>
  );
}
