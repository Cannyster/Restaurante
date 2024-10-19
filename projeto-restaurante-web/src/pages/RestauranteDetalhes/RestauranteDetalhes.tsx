import {
  AvaliacaoContainer,
  ButtonContainer,
  ContentFooter,
  LocalButton,
  MainContainer,
  RestauranteContainer,
} from './styles';
import {
  RestauranteProps,
  AvaliacaoProps,
  RestauranteContext,
} from '../../contexts/RestauranteContext';
import { ModalNovaAvaliacao } from '../../components/ModalNovaAvaliacao/ModalNovaAvaliacao';
import { AvaliacaoEstrelas } from '../../components/AvaliacaoEstrelas/AvaliacaoEstrelas';
import { ModalRestaurante } from '../../components/ModalRestaurante/ModalRestaurante';
import { ModalDelete } from '../../components/ModalDelete/ModalDelete';
import { Avaliacao } from '../../components/Avaliacao/Avaliacao';
import { obterRestaurante } from '../../api/obter-restaurante';
import { obterAvaliacoes } from '../../api/obter-avaliacoes';
import { useContextSelector } from 'use-context-selector';
import { Vazio } from '../../components/Vazio/Vazio';
import { queryClient } from '../../lib/react-query';
import { GlobalButton } from '../../styles/global';
import * as Dialog from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMemo, useState } from 'react';

export function RestauranteDetalhes() {
  const navigate = useNavigate();
  const [openModalRestaurante, setopenModalRestaurante] = useState(false);
  const [openModalAvaliacao, setModalAvaliacao] = useState(false);
  const [openModalExclusao, setModalExclusao] = useState(false);

  const { restauranteId } = useParams();

  const { data: restaurante, refetch: refetchRestaurante } =
    useQuery<RestauranteProps>({
      queryKey: ['restaurante', restauranteId],
      queryFn: () => {
        if (!restauranteId)
          throw new Error('ID do restaurante não encontrado.');
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

  const deletarRestaurante = useContextSelector(
    RestauranteContext,
    (context) => {
      return context.deletarRestauranteFn;
    }
  );

  async function handleDeletarRestaurante(restauranteId: string) {
    await deletarRestaurante({ restauranteId });
    navigate('/');
  }

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

  function openCloseModalRestaurante() {
    setopenModalRestaurante((state) => !state);
  }

  function openCloseModalAvaliacao() {
    setModalAvaliacao((state) => !state);
  }

  function openCloseModalExclusao() {
    setModalExclusao((state) => !state);
  }

  return (
    <>
      <Helmet title="Detalhes" />
      <MainContainer>
        {restaurante ? (
          <>
            <RestauranteContainer>
              <h2>{`${restaurante.nome}`}</h2>
              <p>{`Endereço: ${restaurante.localizacao}`}</p>
              <p>{`Tipo Cozinha: ${restaurante.cozinha}`}</p>
              <AvaliacaoEstrelas media={mediaAvaliacoes} />
              <ButtonContainer>
                <Dialog.Root
                  open={openModalExclusao}
                  onOpenChange={openCloseModalExclusao}
                >
                  <Dialog.DialogTrigger asChild>
                    <LocalButton type="button">Excluir</LocalButton>
                  </Dialog.DialogTrigger>
                  <ModalDelete
                    itemId={restaurante.restauranteId}
                    textoExclusao={'este Restaurante'}
                    deleteFunction={handleDeletarRestaurante}
                    openCloseModal={openCloseModalExclusao}
                  />
                </Dialog.Root>

                <Dialog.Root
                  open={openModalRestaurante}
                  onOpenChange={openCloseModalRestaurante}
                >
                  <Dialog.DialogTrigger asChild>
                    <LocalButton>Editar</LocalButton>
                  </Dialog.DialogTrigger>
                  <ModalRestaurante
                    key={restaurante.restauranteId}
                    restaurante={restaurante}
                    refetchRestaurantes={refetchRestaurante}
                    openCloseModal={openCloseModalRestaurante}
                  />
                </Dialog.Root>
              </ButtonContainer>
            </RestauranteContainer>
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
              <Dialog.Root
                open={openModalAvaliacao}
                onOpenChange={openCloseModalAvaliacao}
              >
                <Dialog.DialogTrigger asChild>
                  <GlobalButton>Avaliar</GlobalButton>
                </Dialog.DialogTrigger>
                <ModalNovaAvaliacao
                  key={restaurante.restauranteId}
                  restauranteId={restaurante.restauranteId}
                  refetchAvaliacoes={refetchAvaliacoes}
                  openCloseModal={openCloseModalAvaliacao}
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
