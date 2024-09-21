import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f7f7f7;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  text-align: center;
  margin-top: 1rem;
`;

const About = () => {
  try {
    return (
      <AboutContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <AboutTitle>About Me</AboutTitle>
          <AboutText>
            Hi, I'm Vijith, a passionate software developer with a strong
            background in AI, machine learning, and data science. I'm
            experienced in developing innovative solutions and optimizing
            processes. My work at GSK and Tvastr Cloud reflects my commitment to
            delivering high-quality software using cutting-edge technologies.
          </AboutText>
        </motion.div>
      </AboutContainer>
    );
  } catch (error) {
    console.error("Error in About section:", error);
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error Loading About Section</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default About;
