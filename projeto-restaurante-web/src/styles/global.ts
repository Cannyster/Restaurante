import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:focus{
    outline: 0;
    box-shadow:  0 0 0 2px ${(props) => props.theme["green-500"]};
}


body{
    background-color: ${(props) => props.theme["gray-800"]};
    color: ${(props) => props.theme["gray-100"]};
    -webkit-font-smoothing: antialiased;
}

body, input, textarea, button{
    font: 400 1rem Robot, sans-serif;
}
`;

export const GlobalButton = styled.button`
  height: 3rem;
  width: 10rem;
  border: 0;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme["green-700"]};
    transition: background-color 0.2s;
  }
`