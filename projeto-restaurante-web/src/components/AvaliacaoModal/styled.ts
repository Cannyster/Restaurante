import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  background-color: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 100%;
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${(props) => props.theme["gray-400"]};
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    padding: 1rem;
    border: 1px solid ${(props) => props.theme["gray-600"]};
    border-radius: 4px;
    background-color: ${(props) => props.theme["gray-700"]};
    color: ${(props) => props.theme["gray-300"]};
  }

  button {
    padding: 1rem;
    background-color: ${(props) => props.theme["green-500"]};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme["green-700"]};
    }
  }
`;