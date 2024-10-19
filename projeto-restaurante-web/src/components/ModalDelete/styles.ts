import { GlobalButton } from '../../styles/global';
import * as Dialog from '@radix-ui/react-dialog'; //https://www.radix-ui.com/primitives/docs/components/dialog
import styled from 'styled-components';

export const DialogLocalContent = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};
  text-align: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  P {
    padding-top: 0.5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const LocalButton = styled(GlobalButton)`
  margin-top: 2rem;
`;
