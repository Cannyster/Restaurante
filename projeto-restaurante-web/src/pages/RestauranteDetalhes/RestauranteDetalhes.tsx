import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Vazio } from "../../components/Vazio/Vazio";
import {
  Content,
  MainContainer,
  ReviewButton,
  ReviewsContainer,
  // ReviewButton,
  // ReviewsContainer,
} from "./styles";
import { obterRestaurante } from "../../api/obter-restaurante";
import { queryClient } from "../../lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { obterAvaliacoes } from "../../api/obter-avaliacoes";

export function RestauranteDetalhes() {
  const { restauranteId } = useParams();

  const { data: restaurante } = useQuery({
    queryKey: ["restaurante", restauranteId],
    queryFn: () => {
      if (!restauranteId) throw new Error("ID do restaurante não encontrado.");
      return obterRestaurante({ restauranteId });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !queryClient.getQueryData(["restaurante", restauranteId]),
  });

  const { data: avaliacoes } = useQuery({
    queryKey: ["avaliacoes", restauranteId],
    queryFn: () => {
      if (!restauranteId) throw new Error("ID do restaurante não encontrado.");
      return obterAvaliacoes({ restauranteId });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !queryClient.getQueryData(["avaliacoes", restauranteId]),
  });

  return (
    <MainContainer>
      {restaurante ? (
        <Content>
          <h1>{`Restaurante: ${restaurante.nome}`}</h1>
          <p>{`Id: ${restaurante.restauranteId}`}</p>
          <p>{`Endereço: ${restaurante.localizacao}`}</p>
          <p>{`Tipo Cozinha: ${restaurante.cozinha}`}</p>

          <ReviewButton>Adicionar Avaliação</ReviewButton>

          <ReviewsContainer>
            {avaliacoes != undefined ? (
              avaliacoes.map((avaliacao) => {
                return (
                  <div key={avaliacao.id}>
                    <p>{avaliacao.id}</p>
                    <p>{avaliacao.comentario}</p>
                    <p>{avaliacao.datahora}</p>
                    <p>{avaliacao.usuario}</p>
                    <p>{avaliacao.restauranteId}</p>
                    <button>Editar Avaliação</button>
                  </div>
                );
              })
            ) : (
              <Vazio />
            )}
          </ReviewsContainer>

          <Link to="/">Voltar para Restaurantes</Link>
        </Content>
      ) : (
        "Restaurante não encontrado "
      )}
    </MainContainer>
  );
}
