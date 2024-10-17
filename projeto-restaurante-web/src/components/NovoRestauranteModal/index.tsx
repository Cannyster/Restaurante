import * as z from "zod";
import { toast } from "sonner";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton, Content, Overlay } from "./styles";
import { novoRestauranteFormSchema } from "../../validation/validation";
import { useContextSelector } from "use-context-selector";
import { RestauranteContext } from "../../contexts/RestauranteContext";
// import { SelectMenu } from "../Select";

type NovoRestauranteFormInputs = z.infer<typeof novoRestauranteFormSchema>;

export function NovoRestauranteModal() {
  // Usando o use-context-selector, para selecionar unicamente uma informação que deve ser acompanhada
  // assim vai evitar a renderização completa que eo padrão do react
  const criarRestaurante = useContextSelector(RestauranteContext, (context) => {
    return context.criarRestauranteFn;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm<NovoRestauranteFormInputs>({
    resolver: zodResolver(novoRestauranteFormSchema),
  });

  //console.log(errors)

  function LimparFomulário() {
    reset();
    setValue("nome", "");
    setValue("localizacao", "");
    setValue("cozinha", "");
  }

  async function handleCriarNovoRestaurante(dados: NovoRestauranteFormInputs) {
    criarRestaurante(dados);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content onPointerDownOutside={LimparFomulário}>
        <Dialog.DialogTitle>Novo Restaurante</Dialog.DialogTitle>

        <CloseButton onClick={LimparFomulário}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCriarNovoRestaurante)}>
          <input
            type="Text"
            placeholder="Nome do Restaurante"
            required
            {...register("nome")}
            onBlur={() => errors.nome && toast.error(errors.nome.message)}
          />

          <input
            type="Text"
            placeholder="Localização Do Restaurante"
            required
            {...register("localizacao")}
            onBlur={() =>
              errors.localizacao && toast.error(errors.localizacao.message)
            }
          />

          {/* <SelectMenu {...register("cozinha")} required /> */}

          <select {...register("cozinha")} required>
            <option value="" hidden>
              Tipo de Cozinha
            </option>
            <option defaultValue="Baiana">Baiana</option>
            <option defaultValue="Mineira">Mineira</option>
            <option defaultValue="Goiana">Goiana</option>
            <option defaultValue="Paraense">Paraense</option>
            <option defaultValue="Cearense">Cearense</option>
            <option defaultValue="Catarinense">Catarinense</option>
            <option defaultValue="Pernanbucana">Pernanbucana</option>
            <option defaultValue="Amazonense">Amazonense</option>
          </select>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
