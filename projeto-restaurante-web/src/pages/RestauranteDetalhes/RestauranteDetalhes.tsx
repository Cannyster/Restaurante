import { useParams } from 'react-router-dom';
import { Vazio } from '../../components/Vazio/Vazio';
import { ModalNovaAvaliacao } from '../../components/ModalNovaAvaliacao/ModalNovaAvaliacao';
import {
  AvaliacaoContainer,
  ContentFooter,
  LocalButton,
  MainContainer,
} from './styles';
import { obterRestaurante } from '../../api/obter-restaurante';
import { queryClient } from '../../lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { obterAvaliacoes } from '../../api/obter-avaliacoes';
import { Helmet } from 'react-helmet-async';
import {
  RestauranteProps,
  AvaliacaoProps,
} from '../../contexts/restauranteContext';
import { Avaliacao } from '../../components/Avaliacao/Avaliacao';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { AvaliacaoEstrelas } from '../../components/Estrela/Estrela';

export function RestauranteDetalhes() {
  const [open, setOpen] = useState(false);
  const { restauranteId } = useParams();

  const { data: restaurante } = useQuery<RestauranteProps>({
    queryKey: ['restaurante', restauranteId],
    queryFn: () => {
      if (!restauranteId) throw new Error('ID do restaurante não encontrado.');
      return obterRestaurante({ restauranteId });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !queryClient.getQueryData(['restaurante', restauranteId]),
  });

  const { data: avaliacoes, refetch: refetchAvaliacoes } = useQuery<
    AvaliacaoProps[]
  >({
    queryKey: ['avaliacoes', restauranteId],
    queryFn: () => {
      if (!restauranteId) throw new Error('ID do restaurante não encontrado.');
      console.log(
        `chamada da useQuery - id extraído da url: ${restauranteId}`,
        typeof restauranteId
      );
      return obterAvaliacoes({ restauranteId });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !queryClient.getQueryData(['avaliacoes', restauranteId]),
  });

  function openCloseModal() {
    setOpen((state) => !state);
  }

  return (
    <>
      <Helmet title="Detalhes" />
      <MainContainer>
        {restaurante ? (
          <>
            <h2>{`${restaurante.nome}`}</h2>
            <p>{`Endereço: ${restaurante.localizacao}`}</p>
            <p>{`Tipo Cozinha: ${restaurante.cozinha}`}</p>
            <AvaliacaoEstrelas media={5} />

            <AvaliacaoContainer>
              <h1>Avaliações</h1>

              {avaliacoes && avaliacoes.length > 0 ? (
                avaliacoes.map((avaliacao) => (
                  <Avaliacao
                    key={avaliacao.id}
                    avaliacao={avaliacao}
                    refetchAvaliacoes={refetchAvaliacoes}
                  />
                ))
              ) : (
                <Vazio />
              )}
            </AvaliacaoContainer>

            <ContentFooter>
              <Dialog.Root open={open} onOpenChange={openCloseModal}>
                <Dialog.DialogTrigger asChild>
                  <LocalButton>Avaliar</LocalButton>
                </Dialog.DialogTrigger>
                <ModalNovaAvaliacao
                  key={restaurante.restauranteId}
                  restauranteId={restaurante.restauranteId}
                  refetchAvaliacoes={refetchAvaliacoes}
                  openCloseModal={openCloseModal}
                />
              </Dialog.Root>
            </ContentFooter>
          </>
        ) : (
          <h1>Restaurante não encontrado </h1>
        )}
      </MainContainer>
    </>
  );
}
