import { formatarData } from "../../utils/formatter";
import {
  Comment,
  CommentBox,
  CommentContent,
  AuthorAndTime,
  Footer,
  Header,
} from "./styles";

interface AvaliacoesProps {
  id: string;
  restauranteId: string;
  usuario: string;
  comentario: string;
  avaliacao: number;
  datahora: string;
}

export function Avaliacao(dados: AvaliacoesProps) {
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
        </CommentContent>
        <Footer></Footer>
      </CommentBox>
    </Comment>
  );
}
