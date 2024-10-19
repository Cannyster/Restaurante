import { GlobalButton } from '../../styles/global';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 0.5rem 0 0.5rem 0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme['gray-300']};
  text-decoration: none;
`;

export const LocalButton = styled(GlobalButton)`
  height: 50px;
  width: 13rem;
`;

export const ContainerVoid = styled.div`
  color: ${(props) => props.theme['gray-900']};
  height: 50px;
  width: 13rem;
`;
