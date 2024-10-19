import { GlobalButton } from '../../styles/global';
import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 9rem auto 1rem auto;
  min-height: 80vh;
  justify-content: flex-start;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem; /* Espaçamento abaixo do título */
    color: ${(props) => props.theme['gray-100']}; /* Cor do título */
  }
`;

export const Content = styled.div`
  box-shadow: 0 4px 20px ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;
  margin-top: 2rem;
`;

export const LocalButton = styled(GlobalButton)`
  margin-top: 2rem;
  width: 100%;
`;
