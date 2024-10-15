import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { createContext } from "use-context-selector";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  criarRestaurante,
  CriarRestauranteInput,
} from "../api/criar-restaurante";
import {
  editarRestaurante,
  EditarRestauranteInput,
} from "../api/editar-restaurante";
import { api } from "../lib/axios";
import { obterRestaurantes } from "../api/obter-restaurantes";

export interface Restaurante {
  id: string;
  nome: string;
  localizacao: string;
  cozinha: string;
}
interface RestauranteContextType {
  restaurantes: Restaurante[];
  // isFetching: boolean;
  // buscaRestaurantes: (query?: string) => Promise<void>;
  criarRestauranteFn: (dados: CriarRestauranteInput) => Promise<void>;
  editarRestauranteFn: (dados: EditarRestauranteInput) => Promise<void>;
}
interface RestauranteProviderProps {
  children: ReactNode;
}

export const RestauranteContext = createContext({} as RestauranteContextType);

export function RestaurantesProvider({ children }: RestauranteProviderProps) {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

  const buscaRestaurantes = useCallback(() => {
    const response = obterRestaurantes();
    setRestaurantes(response);
  }, []);

  // const { data: RestaurantesCache, isFetching } = useQuery({
  //   queryKey: ["restaurante"],
  //   queryFn: () => buscaRestaurantes(),
  // });

  const { mutateAsync: criarRestauranteFn } = useMutation({
    mutationFn: criarRestaurante,
    onSuccess: () => {
      toast.success("Restaurante Criado com sucesso");
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
    },
    onError: (error) => {
      console.log(`Erro: ${error}`);
      toast.error("Falha na alteração do Restaurante");
    },
  });

  // const deletarRestaurante = useCallback(async (dados: deletarRestauranteInput) => {
  //   const { id } = dados;
  //   const response = await api.delete(`/Restaurantes/${id}`);
  // }, []);

  //Busca inicial de Restaurantes
  useEffect(() => {
    buscaRestaurantes();
  }, []);

  return (
    <RestauranteContext.Provider
      value={{
        restaurantes,
        editarRestauranteFn,
        criarRestauranteFn,
      }}
    >
      {children}
    </RestauranteContext.Provider>
  );
}
