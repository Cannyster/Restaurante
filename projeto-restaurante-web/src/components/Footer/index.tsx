import { FooterContainer, FooterLinks, FooterText } from "./styles";

export function Footer() {
  return (
    <FooterContainer>
      <FooterText>© 2024 My Website</FooterText>
      <FooterLinks>
        <a href="#about">About</a>
        <a
          href="https://www.linkedin.com/in/jhonanthan-campos/"
          target="_blank"
        >
          Linked In
        </a>
        <a href="https://github.com/Cannyster/Restaurante" target="_blank">
          GitHub
        </a>
      </FooterLinks>
    </FooterContainer>
  );
}
