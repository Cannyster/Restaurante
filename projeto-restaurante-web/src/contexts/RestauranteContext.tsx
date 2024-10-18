import { toast } from "sonner";
import { ReactNode, useState } from "react";
import { queryClient } from "../lib/react-query";
import { createContext } from "use-context-selector";
import { useMutation, useQuery } from "@tanstack/react-query";
import { obterRestaurantes } from "../api/obter-restaurantes";
import {
  deletarRestaurante,
  DeletarRestauranteInput,
} from "../api/deletar-restaurante";
import {
  criarRestaurante,
  CriarRestauranteInput,
} from "../api/criar-restaurante";
import {
  editarRestaurante,
  EditarRestauranteInput,
} from "../api/editar-restaurante";
import { criarAvaliacao, CriarAvaliacaoInput } from "../api/criar-avaliacao";
import {
  deletarAvaliacao,
  DeletarAvaliacaoInput,
} from "../api/deletar-avaliacao";
import { editarAvaliacao, EditarAvaliacaoInput } from "../api/editar-avaliacao";

export interface RestauranteProps {
  restauranteId: string;
  nome: string;
  localizacao: string;
  cozinha: string;
}

export interface AvaliacaoProps {
  restauranteId: string;
  usuario: string;
  comentario: string;
  avaliacao: number;
  id: string;
  datahora: string;
}

interface restauranteContextType {
  restaurantesCache: RestauranteProps[] | undefined;
  isFetching: boolean;
  filtrarRestaurantes: (query: string) => Promise<void>;
  criarRestauranteFn: (
    dados: CriarRestauranteInput
  ) => Promise<RestauranteProps>;
  editarRestauranteFn: (
    dados: EditarRestauranteInput
  ) => Promise<RestauranteProps>;
  deletarRestauranteFn: (dados: DeletarRestauranteInput) => Promise<void>;
  criarAvaliacaoFn: (dados: CriarAvaliacaoInput) => Promise<AvaliacaoProps>;
  editarAvaliacaoFn: (dados: EditarAvaliacaoInput) => Promise<AvaliacaoProps>;
  deletarAvaliacaoFn: (dados: DeletarAvaliacaoInput) => Promise<void>;
}
interface RestauranteProviderProps {
  children: ReactNode;
}

export const restauranteContext = createContext({} as restauranteContextType);

export function RestaurantesProvider({ children }: RestauranteProviderProps) {
  const [buscaQuery, setBuscaQuery] = useState<string | undefined>(undefined);

  const filtrarRestaurantes = async (query: string) => {
    setBuscaQuery(query);
  };

  const { data: restaurantesCache, isFetching } = useQuery<RestauranteProps[]>({
    queryKey: ["restaurantes", buscaQuery],
    queryFn: () => obterRestaurantes(buscaQuery),
    enabled: true,
  });

  const { mutateAsync: criarRestauranteFn } = useMutation<
    RestauranteProps,
    Error,
    CriarRestauranteInput
  >({
    mutationFn: criarRestaurante,
    onSuccess: () => {
      toast.success("Restaurante Criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["restaurantes"] });
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na Criação do Restaurante");
    },
  });

  const { mutateAsync: editarRestauranteFn } = useMutation<
    RestauranteProps,
    Error,
    EditarRestauranteInput
  >({
    mutationFn: editarRestaurante,
    onSuccess: () => {
      toast.success("Restaurante alterado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["restaurantes"] });
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na alteração do Restaurante");
    },
  });

  const { mutateAsync: deletarRestauranteFn } = useMutation<
    void,
    Error,
    DeletarRestauranteInput
  >({
    mutationFn: deletarRestaurante,
    onSuccess: () => {
      toast.success("Restaurante Excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["restaurantes"] });
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na exclusão do Restaurante");
    },
  });

  const { mutateAsync: criarAvaliacaoFn } = useMutation<
    AvaliacaoProps,
    Error,
    CriarAvaliacaoInput
  >({
    mutationFn: criarAvaliacao,
    onSuccess: () => {
      toast.success("Avaliacação Criada com sucesso");
      // queryClient.invalidateQueries({ queryKey: ["avaliacoes"] });
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na Criação da Avaliacação");
    },
  });

  const { mutateAsync: editarAvaliacaoFn } = useMutation<
    AvaliacaoProps,
    Error,
    EditarAvaliacaoInput
  >({
    mutationFn: editarAvaliacao,
    onSuccess: () => {
      toast.success("Avaliação alterada com sucesso");
      // queryClient.invalidateQueries({ queryKey: ["restaurantes"] });
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na alteração da Avaliação");
    },
  });

  const { mutateAsync: deletarAvaliacaoFn } = useMutation<
    void,
    Error,
    DeletarAvaliacaoInput
  >({
    mutationFn: deletarAvaliacao,
    onSuccess: () => {
      toast.success("Avaliação Excluída com sucesso");
      // queryClient.invalidateQueries({ queryKey: ["restaurantes"] });
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na exclusão do Restaurante");
    },
  });

  return (
    <restauranteContext.Provider
      value={{
        restaurantesCache,
        isFetching,
        editarRestauranteFn,
        criarRestauranteFn,
        deletarRestauranteFn,
        filtrarRestaurantes,
        criarAvaliacaoFn,
        editarAvaliacaoFn,
        deletarAvaliacaoFn,
      }}
    >
      {children}
    </restauranteContext.Provider>
  );
}
