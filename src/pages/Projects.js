import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f0f0;
`;

const ProjectTitle = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background-color: white;
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
`;

const CloseButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  float: right;
`;

const Projects = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Community Recommendation using Graph Neural Networks",
      description: "GitHub community recommendations using Louvain algorithm.",
      details:
        "Developed a GitHub capstone project recommending communities for learning and development using Graph Neural Networks. Utilized GitHub API for dataset retrieval and Neo4j for data storage and visualization.I2CT 2024 DOI:10.1109/I2CT61223.2024.10544334",
    },
    {
      title: "Fitness Assistant Chatbot",
      description: "A fitness assistant chatbot using OpenAI and Streamlit.",
      details:
        "Built a fitness chatbot using OpenAI and Streamlit libraries. The bot helps users with fitness-related queries using natural language processing.",
    },
    {
      title: "Career Guidance System",
      description: "A career recommendation platform with personality tests.",
      details:
        "Developed a platform with personality tests and career recommendations. It provides resources for interview preparation and career development using the MVC framework and MySQL.",
    },
  ];

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  try {
    return (
      <ProjectsContainer>
        <ProjectTitle>Projects</ProjectTitle>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} onClick={() => handleCardClick(project)}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </ProjectCard>
          ))}
        </motion.div>

        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <CloseButton onClick={closeModal}>X</CloseButton>
              <h3>{selectedProject?.title}</h3>
              <p>{selectedProject?.details}</p>
            </ModalContent>
          </ModalOverlay>
        )}
      </ProjectsContainer>
    );
  } catch (error) {
    console.error("Error in Projects section:", error);
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Error Loading Projects Section</h2>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
};

export default Projects;
