import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;

    &:hover {
      color: #f39c12;
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <h1>Vijith's Portfolio</h1>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/contact">Contact</Link> {/* Contact link added */}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
