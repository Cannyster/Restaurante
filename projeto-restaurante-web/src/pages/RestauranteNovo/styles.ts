import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 9rem auto 1rem auto;
  min-height: 80vh;
  justify-content: space-evenly;

  position: fixed;
  //Hackzinho para centralizar itens na tela
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); //-50% no eixo X, -50% no eixo Y

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    select {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1.5rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        background: ${(props) => props.theme['gray-700']};
      }

      option {
        color: ${(props) => props.theme['gray-300']};
      }
    }
  }
`;
