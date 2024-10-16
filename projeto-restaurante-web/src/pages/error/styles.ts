// ErrorPage.jsx
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 2.25rem; /* text-4xl */
  font-weight: bold;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.colors.accentForeground || "#333"};
`;

export const ErrorDetails = styled.pre`
  background-color: #f8f9fa;
  color: #d6336c; /* Exemplo de cor para erro */
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 600px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const StyledLink = styled(Link)`
  color: #0284c7; /* sky-600 */

  &:hover {
    color: #38bdf8; /* sky-400 (dark mode equivalent) */
  }
`;


