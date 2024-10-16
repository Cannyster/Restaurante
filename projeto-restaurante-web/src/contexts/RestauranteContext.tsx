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
  id: string;
  nome: string;
  localizacao: string;
  cozinha: string;
}
interface RestauranteContextType {
  restaurantesCache: Restaurante[] | undefined;
  isFetching: boolean;
  // restaurante: Restaurante;
  criarRestauranteFn: (dados: CriarRestauranteInput) => Promise<void>;
  editarRestauranteFn: (dados: EditarRestauranteInput) => Promise<void>;
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

  const { data: restaurantesCache, isFetching } = useQuery({
    queryKey: ["restaurantes"],
    queryFn: () => obterRestaurantes(),
  });

  const { mutateAsync: criarRestauranteFn } = useMutation({
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

  const { mutateAsync: editarRestauranteFn } = useMutation({
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

  const { mutateAsync: deletarRestauranteFn } = useMutation({
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
        selectedrestauranteId,
        setSelectedrestauranteId,
      }}
    >
      {children}
    </RestauranteContext.Provider>
  );
}
