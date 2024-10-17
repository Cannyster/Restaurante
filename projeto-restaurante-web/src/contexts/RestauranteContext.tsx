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
interface RestauranteContextType {
  restaurantesCache: Restaurante[] | undefined;
  isFetching: boolean;
  filtrarRestaurantes: (query: string) => Promise<void>;
  criarRestauranteFn: (dados: CriarRestauranteInput) => Promise<Restaurante>;
  editarRestauranteFn: (dados: EditarRestauranteInput) => Promise<Restaurante>;
  deletarRestauranteFn: (dados: DeletarRestauranteInput) => Promise<void>;
  selectedrestauranteId: string | null;
  setSelectedrestauranteId: (id: string | null) => void;
}
interface RestauranteProviderProps {
  children: ReactNode;
}

export const RestauranteContext = createContext({} as RestauranteContextType);

export function RestaurantesProvider({ children }: RestauranteProviderProps) {
  //Estado Para Controlar Abertura e fechamento do modal de edição de restaurante
  const [selectedrestauranteId, setSelectedrestauranteId] = useState<
    string | null
  >(null);

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
    <RestauranteContext.Provider
      value={{
        restaurantesCache,
        isFetching,
        editarRestauranteFn,
        criarRestauranteFn,
        deletarRestauranteFn,
        filtrarRestaurantes,
        selectedrestauranteId,
        setSelectedrestauranteId,
      }}
    >
      {children}
    </RestauranteContext.Provider>
  );
}
