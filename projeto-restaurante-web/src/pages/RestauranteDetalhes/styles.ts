import styled from "styled-components";
import { GlobalButton } from "../../styles/global";

export const MainContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto;
  padding: 0  0 1.5rem 0;
  min-height: 60vh;
`;

export const Content = styled.div`
  padding: 2rem;
  background-color: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
  margin: 2rem;
  max-width: 800px;
  align-content: space-between;

  h1 {
    font-size: 1.75rem;
    color: ${(props) => props.theme["gray-100"]};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme["gray-300"]};
    margin-bottom: 0.5rem;
  }

  a {
    display: inline-block;
    /* margin-top: 1.5rem; */
    color: ${(props) => props.theme["green-500"]};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme["green-300"]};
    }
  }
`;

export const ContentFooter = styled.div`
  display: flex;
justify-content: flex-end;

`

export const LocalButton = styled(GlobalButton)`
  margin-top: 2rem;
`;

export const AvaliacaoContainer = styled.div`
  border: 1px solid ${(props) => props.theme["gray-400"]};
  border-radius: 6px;
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
  

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme["gray-800"]};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme["gray-600"]};
    border-radius: 10px;
  }
`;