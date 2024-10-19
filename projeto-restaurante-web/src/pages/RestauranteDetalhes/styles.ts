import { GlobalButton } from '../../styles/global';
import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 9rem auto 1rem auto;
  min-height: 80vh;
  justify-content: space-evenly;

  h1 {
    font-size: 1.75rem;
    color: ${(props) => props.theme['gray-100']};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: ${(props) => props.theme['gray-300']};
    margin-bottom: 0.5rem;
  }

  a {
    display: inline-block;
    /* margin-top: 1.5rem; */
    color: ${(props) => props.theme['green-500']};
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme['green-300']};
    }
  }
`;

export const ContentFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AvaliacaoContainer = styled.div`
  border: 1px solid ${(props) => props.theme['gray-400']};
  border-radius: 6px;
  margin-top: 1rem;
  height: 400px;
  overflow-y: auto;
  padding: 1rem 0.5rem 1rem 0;
  width: 37.5rem;

  h1 {
    text-align: center;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme['gray-800']};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['gray-600']};
    border-radius: 10px;
  }
`;

export const RestauranteContainer = styled.div`
  /* border: 1px solid ${(props) => props.theme['gray-400']}; */
  border-radius: 6px;
  margin-top: 1rem;
  height: 200px;

  padding: 1rem 0.5rem 1rem 0;
  width: 37.5rem;

  /* h1 {
    text-align: center;
  } */

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme['gray-800']};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['gray-600']};
    border-radius: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LocalButton = styled(GlobalButton)`
  margin-top: 2rem;
`;
