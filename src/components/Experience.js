import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ExperienceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const ExperienceTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const ExperienceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  max-width: 800px;
`;

const ExperienceCard = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ExperienceCardTitle = styled.h3`
  font-size: 1.5rem;
  color: #3498db;
`;

const ExperienceCardCompany = styled.h4`
  font-size: 1.2rem;
  color: #555;
`;

const ExperienceCardDetails = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  color: #555;
`;

const experiences = [
  {
    company: "GSK (GlaxoSmithKline)",
    role: "Graduate Intern",
    date: "January 2024 - Present",
    description: `
      - Led comprehensive data analysis and optimization of preprocessing pipelines for mixed marketing modeling.
      - Developed a machine learning classification model with cosine similarity, reducing processing time by 70%.
      - Worked on Responsible AI structure and created an AI registry dashboard for project management.
    `,
  },
  {
    company: "Tvastr Cloud Pvt Ltd",
    role: "AI Development Intern",
    date: "June 2023 - December 2023",
    description: `
      - Enhanced Kubernetes engineering by integrating AI-driven troubleshooting bot.
      - Reduced manual intervention by 50% and improved system uptime by 20% through automation.
      - Implemented conversational prompts for customized bioinformatics workflows.
    `,
  },
];

const Experience = () => {
  try {
    return (
      <ExperienceContainer>
        <ExperienceTitle>Experience</ExperienceTitle>
        <ExperienceWrapper>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <ExperienceCardTitle>{exp.role}</ExperienceCardTitle>
              <ExperienceCardCompany>{exp.company}</ExperienceCardCompany>
              <p>{exp.date}</p>
              <ExperienceCardDetails>{exp.description}</ExperienceCardDetails>
            </ExperienceCard>
          ))}
        </ExperienceWrapper>
      </ExperienceContainer>
    );
  } catch (error) {
    console.error("Error in Experience section:", error);
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error Loading Experience Section</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default Experience;
