import { novoRestauranteFormSchema } from '../../validation/validationSchemas';
import { RestauranteContext } from '../../contexts/RestauranteContext';
import { Content, LocalButton, MainContainer } from './styles';
import { useContextSelector } from 'use-context-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { GlobalForm } from '../../styles/global';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

type NovoRestauranteFormInputs = z.infer<typeof novoRestauranteFormSchema>;

export function RestauranteNovo() {
  const navigate = useNavigate();

  const criarRestaurante = useContextSelector(RestauranteContext, (context) => {
    return context.criarRestauranteFn;
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NovoRestauranteFormInputs>({
    resolver: zodResolver(novoRestauranteFormSchema),
  });

  async function handleCriarNovoRestaurante(dados: NovoRestauranteFormInputs) {
    criarRestaurante(dados);
    navigate('/');
  }

  return (
    <>
      <Helmet title="Novo" />
      <MainContainer>
        <Content>
          <GlobalForm onSubmit={handleSubmit(handleCriarNovoRestaurante)}>
            <h2>Cadastrar Novo Restaurante</h2>
            <input
              type="Text"
              placeholder="Nome do Restaurante"
              required
              {...register('nome')}
              onBlur={() => errors.nome && toast.error(errors.nome.message)}
            />

            <input
              type="Text"
              placeholder="Localização Do Restaurante"
              required
              {...register('localizacao')}
              onBlur={() =>
                errors.localizacao && toast.error(errors.localizacao.message)
              }
            />

            <select {...register('cozinha')} required>
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

            <LocalButton type="submit" disabled={isSubmitting}>
              Cadastrar
            </LocalButton>
          </GlobalForm>
        </Content>
      </MainContainer>
    </>
  );
}
