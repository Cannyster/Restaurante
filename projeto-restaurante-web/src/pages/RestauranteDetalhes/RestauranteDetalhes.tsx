import {
  AvaliacaoContainer,
  ContentFooter,
  LocalButton,
  MainContainer,
} from './styles';
import { ModalNovaAvaliacao } from '../../components/ModalNovaAvaliacao/ModalNovaAvaliacao';
import {
  RestauranteProps,
  AvaliacaoProps,
} from '../../contexts/RestauranteContext';
import { AvaliacaoEstrelas } from '../../components/Estrela/Estrela';
import { Avaliacao } from '../../components/Avaliacao/Avaliacao';
import { obterRestaurante } from '../../api/obter-restaurante';
import { obterAvaliacoes } from '../../api/obter-avaliacoes';
import { Vazio } from '../../components/Vazio/Vazio';
import { queryClient } from '../../lib/react-query';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMemo, useState } from 'react';

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
      return obterAvaliacoes({ restauranteId });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    enabled: !queryClient.getQueryData(['avaliacoes', restauranteId]),
  });

  // Função para calcular a média de avaliações
  const calcularMedia = (avaliacoes: AvaliacaoProps[]): number => {
    if (!avaliacoes || avaliacoes.length === 0) return 0;
    const total = avaliacoes.reduce((acc, { avaliacao }) => acc + avaliacao, 0);
    return total / avaliacoes.length;
  };

  // Usando useMemo para evitar recálculo desnecessário
  const mediaAvaliacoes = useMemo(
    () => calcularMedia(avaliacoes || []),
    [avaliacoes]
  );

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
            <AvaliacaoEstrelas media={mediaAvaliacoes} />

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
