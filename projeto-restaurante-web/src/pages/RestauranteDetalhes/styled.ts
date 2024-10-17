import styled from "styled-components";

export const Content = styled.div`
  padding: 2rem;
  background-color: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
  margin: 2rem;
  max-width: 800px;
`;

export const ReviewButton = styled.button`
  background-color: ${(props) => props.theme["green-500"]};
  color: white;
  padding: 1rem;
  margin-top: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`;

export const ReviewsContainer = styled.div`
  margin-top: 2rem;

  div {
    background-color: ${(props) => props.theme["gray-700"]};
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;

    button {
      background-color: ${(props) => props.theme["blue-500"]};
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: ${(props) => props.theme["blue-700"]};
      }
    }
  }
`;
