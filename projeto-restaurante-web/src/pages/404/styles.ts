// NotFound.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  color: ${(props) => props.theme['gray-300']};
`;

export const StyledLink = styled(Link)`
  color: #0284c7; /* sky-600 */

  &:hover {
    color: #38bdf8; /* sky-400 (dark mode equivalent) */
  }
`;
