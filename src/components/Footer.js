import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 Vijith BG - All Rights Reserved</p>
    </FooterContainer>
  );
};

export default Footer;
