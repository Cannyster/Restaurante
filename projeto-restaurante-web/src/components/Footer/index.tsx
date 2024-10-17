import { FooterContainer, FooterLinks, FooterText } from "./styles";

export function Footer() {
  return (
    <FooterContainer>
      <FooterText>© 2024 My Website</FooterText>
      <FooterLinks>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy Policy</a>
      </FooterLinks>
    </FooterContainer>
  );
}
