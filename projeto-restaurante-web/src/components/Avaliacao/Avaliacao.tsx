import { formatarData } from '../../utils/formatter';
import * as Dialog from '@radix-ui/react-dialog';
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
  restauranteContext,
} from '../../contexts/restauranteContext';
import { Trash } from 'phosphor-react';
import { Search } from 'lucide-react';
import { useContextSelector } from 'use-context-selector';
import { ModalAvaliacao } from '../ModalAvaliacao/ModalAvaliacao';

interface AvaliacaoComponentProps {
  avaliacao: AvaliacaoProps;
  refetchAvaliacoes: () => void;
}

export function Avaliacao({
  avaliacao,
  refetchAvaliacoes,
}: AvaliacaoComponentProps) {
  const deletarAvaliacao = useContextSelector(restauranteContext, (context) => {
    return context.deletarAvaliacaoFn;
  });

  async function handleDeletarAvaliacao() {
    const { id } = avaliacao;
    await deletarAvaliacao({ id });
    refetchAvaliacoes();
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
            <p>{avaliacao.avaliacao}</p>
            <ButtonBox>
              <Dialog.Root>
                <Dialog.DialogTrigger asChild>
                  <button>
                    <Search size={25} />
                  </button>
                </Dialog.DialogTrigger>
                <ModalAvaliacao
                  avaliacao={avaliacao}
                  refetchAvaliacoes={refetchAvaliacoes}
                />
              </Dialog.Root>
              <button onClick={handleDeletarAvaliacao}>
                <Trash size={30}></Trash>
              </button>
            </ButtonBox>
          </CommentFooter>
        </CommentContent>
      </CommentBox>
    </Comment>
  );
}
