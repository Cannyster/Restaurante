import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 9rem auto 0;
  padding: 1rem 1.5rem;
  min-height: 80vh;
  padding-bottom: 4rem;
`;

export const RestauranteTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`;

export const RestauranteItem = styled.main`
  width: 50%;
  align-items: center;

  div {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: ${(props) => props.theme['gray-700']};
    margin-top: 1rem;
    border: 1rem;
    border-color: red;
  }

  p {
    margin: 0.5rem 0 0.5rem 0;
  }
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme['gray-300']};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme['yellow-700']};
  }
`;
