import { GlobalButton } from '../../styles/global';
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const LocalButton = styled(GlobalButton)`
  margin-top: 2rem;
  width: 13rem;
`;
