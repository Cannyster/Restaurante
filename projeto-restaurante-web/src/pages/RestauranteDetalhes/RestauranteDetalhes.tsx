import { useParams } from "react-router-dom";
import { Vazio } from "../../components/Vazio/Vazio";
import { NovaAvaliacaoModal } from "../../components/NovaAvaliacaoModal/NovaAvaliacaoModal";
import {
  AvaliacaoContainer,
  Content,
  ContentFooter,
  LocalButton,
  MainContainer,
} from "./styles";
import { obterRestaurante } from "../../api/obter-restaurante";
import { queryClient } from "../../lib/react-query";
import { useQuery } from "@tanstack/react-query";
import { obterAvaliacoes } from "../../api/obter-avaliacoes";
import { Helmet } from "react-helmet-async";
import {
  RestauranteProps,
  AvaliacaoProps,
} from "../../contexts/restauranteContext";
import { Avaliacao } from "../../components/Avaliacao/Avaliacao";
import * as Dialog from "@radix-ui/react-dialog";

export function RestauranteDetalhes() {
  const { restauranteId } = useParams();

  const { data: restaurante } = useQuery<RestauranteProps>({
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

  const { data: avaliacoes } = useQuery<AvaliacaoProps[]>({
    queryKey: ["avaliacoes", restauranteId],
    queryFn: () => {
      if (!restauranteId) throw new Error("ID do restaurante não encontrado.");
      console.log(
        `chamada da useQuery - id extraído da url: ${restauranteId}`,
        typeof restauranteId
      );
      return obterAvaliacoes({ restauranteId });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !queryClient.getQueryData(["avaliacoes", restauranteId]),
  });

  return (
    <>
      <Helmet title="Detalhes" />
      <MainContainer>
        {restaurante ? (
          <Content>
            <h1>{`Restaurante: ${restaurante.nome}`}</h1>
            <p>{`Id: ${restaurante.restauranteId}`}</p>
            <p>{`Endereço: ${restaurante.localizacao}`}</p>
            <p>{`Tipo Cozinha: ${restaurante.cozinha}`}</p>

            <h1>Avaliações</h1>
            <AvaliacaoContainer>
              {avaliacoes && avaliacoes.length > 0 ? (
                avaliacoes.map((avaliacao) => (
                  <Avaliacao
                    key={avaliacao.id}
                    id={avaliacao.id}
                    restauranteId={avaliacao.restauranteId}
                    usuario={avaliacao.usuario}
                    comentario={avaliacao.comentario}
                    avaliacao={avaliacao.avaliacao}
                    datahora={avaliacao.datahora}
                  />
                ))
              ) : (
                <Vazio />
              )}
            </AvaliacaoContainer>

            <ContentFooter>
              <Dialog.Root>
                <Dialog.DialogTrigger asChild>
                  <LocalButton>Avaliar</LocalButton>
                </Dialog.DialogTrigger>
                <NovaAvaliacaoModal
                  key={restaurante.restauranteId}
                  restauranteId={restaurante.restauranteId}
                />
              </Dialog.Root>
            </ContentFooter>
          </Content>
        ) : (
          <h1>Restaurante não encontrado </h1>
        )}
      </MainContainer>
    </>
  );
}
