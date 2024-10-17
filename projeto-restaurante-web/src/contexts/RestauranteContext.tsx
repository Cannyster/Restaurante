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

export interface Restaurante {
  restauranteId: string;
  nome: string;
  localizacao: string;
  cozinha: string;
}

export interface Avaliacao {
  restauranteId: string;
  usuario: string;
  comentario: string;
  avaliacao: string;
  id: number;
  datahora: string;
}

interface restauranteContextType {
  restaurantesCache: Restaurante[] | undefined;
  isFetching: boolean;
  filtrarRestaurantes: (query: string) => Promise<void>;
  criarRestauranteFn: (dados: CriarRestauranteInput) => Promise<Restaurante>;
  editarRestauranteFn: (dados: EditarRestauranteInput) => Promise<Restaurante>;
  deletarRestauranteFn: (dados: DeletarRestauranteInput) => Promise<void>;
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

  const { data: restaurantesCache, isFetching } = useQuery<Restaurante[]>({
    queryKey: ["restaurantes", buscaQuery],
    queryFn: () => obterRestaurantes(buscaQuery),
    enabled: true,
  });

  const { mutateAsync: criarRestauranteFn } = useMutation<
    Restaurante,
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
    Restaurante,
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

  return (
    <restauranteContext.Provider
      value={{
        restaurantesCache,
        isFetching,
        editarRestauranteFn,
        criarRestauranteFn,
        deletarRestauranteFn,
        filtrarRestaurantes,
      }}
    >
      {children}
    </restauranteContext.Provider>
  );
}
