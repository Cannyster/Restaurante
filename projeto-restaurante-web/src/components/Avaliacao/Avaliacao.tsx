import { formatarData } from "../../utils/formatter";
import {
  Comment,
  CommentBox,
  CommentContent,
  AuthorAndTime,
  Header,
  CommentFooter,
} from "./styles";
import { AvaliacaoProps } from "../../contexts/restauranteContext";

export function Avaliacao(dados: AvaliacaoProps) {
  return (
    <Comment>
      <CommentBox>
        <CommentContent>
          <Header>
            <AuthorAndTime>
              <strong>{dados.usuario}</strong>
              <time title="11 de maio as 08:13" dateTime="2022-05-11 08:13:30">
                {formatarData.format(new Date(dados.datahora))}
              </time>
            </AuthorAndTime>
          </Header>
          <p>{dados.comentario}</p>
          <CommentFooter>
            <p>{dados.avaliacao}</p>
          </CommentFooter>
        </CommentContent>
      </CommentBox>
    </Comment>
  );
}
