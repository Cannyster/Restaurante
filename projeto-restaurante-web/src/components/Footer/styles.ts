// Footer.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 1.5rem;
  text-align: center;
  color: white;
  bottom: 0;
  width: 100%;
  left: 0;
`;

export const FooterText = styled.p`
  color: ${(props) => props.theme['gray-300']};
`;

export const FooterLinks = styled.div`
  margin-top: 10px;

  a {
    color: ${(props) => props.theme['gray-300']};
    text-decoration: none;
    margin: 0 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
