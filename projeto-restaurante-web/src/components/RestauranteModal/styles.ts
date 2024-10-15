import * as Dialog from "@radix-ui/react-dialog"; //https://www.radix-ui.com/primitives/docs/components/dialog
import styled from "styled-components";


export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};

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
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }

      &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
        background: ${(props) => props.theme["gray-700"]};
      }
    }

    button[type="submit"],button[type="button"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }

    select{
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1.5rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        background: ${(props) => props.theme["gray-700"]};
      }

      option{
        color: ${(props) => props.theme["gray-300"]};
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme["gray-500"]};
`;
