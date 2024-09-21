import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const SkillsTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  max-width: 800px;
`;

const SkillBar = styled(motion.div)`
  background-color: #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 25px;
  position: relative;
  overflow: hidden;
`;

const SkillFill = styled(motion.div)`
  height: 100%;
  background-color: #3498db;
  border-radius: 8px 0 0 8px;
`;

const SkillLabel = styled.span`
  position: absolute;
  top: -25px;
  left: 0;
  font-weight: bold;
  color: #555;
`;

const skills = [
  { name: "Python", percentage: 90 },
  { name: "C++", percentage: 85 },
  { name: "React.js", percentage: 80 },
  { name: "Node.js", percentage: 75 },
  { name: "Machine Learning", percentage: 70 },
  { name: "Docker & Kubernetes", percentage: 65 },
];

const Skills = () => {
  try {
    return (
      <SkillsContainer>
        <SkillsTitle>Skills</SkillsTitle>
        <SkillsWrapper>
          {skills.map((skill, index) => (
            <div key={index} style={{ position: "relative" }}>
              <SkillLabel>{skill.name}</SkillLabel>
              <SkillBar>
                <SkillFill
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1.2 }}
                />
              </SkillBar>
            </div>
          ))}
        </SkillsWrapper>
      </SkillsContainer>
    );
  } catch (error) {
    console.error("Error in Skills section:", error);
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error Loading Skills Section</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default Skills;
