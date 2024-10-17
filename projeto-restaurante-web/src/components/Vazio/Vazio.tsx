import clipboard from "../../assets/clipboard.png";
import { Container } from "./styles";

export function Vazio() {
  return (
    <Container>
      <img src={clipboard} alt="ícone de prancheta" />
      <p>
        <strong>Este Restaurante Não tem Avaliações Cadastradas</strong>
        Aproveite e realize uma avaliação agora mesmo
      </p>
    </Container>
  );
}
