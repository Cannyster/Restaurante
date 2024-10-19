import styled, { createGlobalStyle } from 'styled-components';

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
