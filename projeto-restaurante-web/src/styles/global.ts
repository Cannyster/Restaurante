import styled, { createGlobalStyle } from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const GlobalStyle = createGlobalStyle`
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body{
      background-color: ${(props) => props.theme['gray-800']};
      color: ${(props) => props.theme['gray-100']};
      -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{
      font: 400 1rem Robot, sans-serif;
    }
`;

export const GlobalButton = styled.button`
  font-size: 1.2rem;
  height: 3.5rem;
  width: 15rem;
  border: 0;
  background: ${(props) => props.theme['yellow-800']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-300']};
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['yellow-700']};
    transition: background-color 0.2s;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const DialogContent = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  //Hackzinho para centralizar itens na tela
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); //-50% no eixo X, -50% no eixo Y
`;

export const DialogCloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`;

export const GlobalForm = styled.form`
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
`;
