import { formatarData } from "../../utils/formatter";
import {
  Comment,
  CommentBox,
  CommentContent,
  AuthorAndTime,
  Header,
  CommentFooter,
} from "./styles";
import {
  AvaliacaoProps,
  restauranteContext,
} from "../../contexts/restauranteContext";
import { Trash } from "phosphor-react";
import { useContextSelector } from "use-context-selector";

export function Avaliacao({
  id,
  usuario,
  comentario,
  avaliacao,
  datahora,
  restauranteId,
  refetchAvaliacoes,
}: AvaliacaoProps & { refetchAvaliacoes: () => void }) {
  const deletarAvaliacao = useContextSelector(restauranteContext, (context) => {
    return context.deletarAvaliacaoFn;
  });

  async function handleDeletarAvaliacao() {
    await deletarAvaliacao({ id });
    refetchAvaliacoes();
  }

  return (
    <Comment>
      <CommentBox>
        <CommentContent>
          <Header>
            <AuthorAndTime>
              <strong>{usuario}</strong>
              <time>{formatarData.format(new Date(datahora))}</time>
            </AuthorAndTime>
          </Header>
          <p>{comentario}</p>
          <CommentFooter>
            <p>{avaliacao}</p>
            <button onClick={handleDeletarAvaliacao}>
              <Trash size={30}></Trash>
            </button>
          </CommentFooter>
        </CommentContent>
      </CommentBox>
    </Comment>
  );
}
