import {
  Comment,
  CommentBox,
  CommentContent,
  AuthorAndTime,
  Header,
  CommentFooter,
  ButtonBox,
} from './styles';
import {
  AvaliacaoProps,
  RestauranteContext,
} from '../../contexts/RestauranteContext';
import { ModalAvaliacao } from '../ModalAvaliacao/ModalAvaliacao';
import { useContextSelector } from 'use-context-selector';
import { ModalDelete } from '../ModalDelete/ModalDelete';
import { AvaliacaoEstrelas } from '../Estrela/Estrela';
import { formatarData } from '../../utils/formatter';
import * as Dialog from '@radix-ui/react-dialog';
import { Trash } from 'phosphor-react';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface AvaliacaoComponentProps {
  avaliacao: AvaliacaoProps;
  refetchAvaliacoes: () => void;
}

export function Avaliacao({
  avaliacao,
  refetchAvaliacoes,
}: AvaliacaoComponentProps) {
  const [open, setOpen] = useState(false);
  const [openModalExclusao, setModalExclusao] = useState(false);

  const deletarAvaliacao = useContextSelector(RestauranteContext, (context) => {
    return context.deletarAvaliacaoFn;
  });

  async function handleDeletarAvaliacao(id: string) {
    // const { id } = avaliacao;
    await deletarAvaliacao({ id });
    refetchAvaliacoes();
  }

  function openCloseModal() {
    setOpen((state) => !state);
  }
  function openCloseModalExclusao() {
    setModalExclusao((state) => !state);
  }

  return (
    <Comment>
      <CommentBox>
        <CommentContent>
          <Header>
            <AuthorAndTime>
              <strong>{avaliacao.usuario}</strong>
              <time>{formatarData.format(new Date(avaliacao.datahora))}</time>
            </AuthorAndTime>
          </Header>
          <p>{avaliacao.comentario}</p>
          <CommentFooter>
            <AvaliacaoEstrelas media={avaliacao.avaliacao} />
            <ButtonBox>
              <Dialog.Root open={open} onOpenChange={openCloseModal}>
                <Dialog.DialogTrigger asChild>
                  <button>
                    <Search size={25} />
                  </button>
                </Dialog.DialogTrigger>
                <ModalAvaliacao
                  avaliacao={avaliacao}
                  refetchAvaliacoes={refetchAvaliacoes}
                  openCloseModal={openCloseModal}
                />
              </Dialog.Root>

              <Dialog.Root
                open={openModalExclusao}
                onOpenChange={openCloseModalExclusao}
              >
                <Dialog.DialogTrigger asChild>
                  <button>
                    <Trash size={30}></Trash>
                  </button>
                </Dialog.DialogTrigger>
                <ModalDelete
                  itemId={avaliacao.id}
                  textoExclusao={'esta Avaliação'}
                  deleteFunction={handleDeletarAvaliacao}
                  openCloseModal={openCloseModalExclusao}
                />
              </Dialog.Root>
            </ButtonBox>
          </CommentFooter>
        </CommentContent>
      </CommentBox>
    </Comment>
  );
}
