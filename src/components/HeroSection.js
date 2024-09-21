import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProfileImage from "../components/assets/profilepic.jpg"; // Import profile image

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  text-align: center;
  padding: 2rem;
`;

const ProfileCircle = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 5px solid #3498db;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WelcomeText = styled(motion.h1)`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const HeroText = styled(motion.p)`
  font-size: 1.5rem;
  color: #555;
  margin-top: 0;
`;

const AboutMeContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin-top: 3rem;
  width: 80%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AboutMeTitle = styled.h2`
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
`;

const AboutMeText = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      {/* Profile Circle */}
      <ProfileCircle>
        <img src={ProfileImage} alt="Profile" />
      </ProfileCircle>

      {/* Welcome Text */}
      <WelcomeText
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to My Portfolio
      </WelcomeText>
      <HeroText
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        I’m Vijith, a passionate Data Scientist and AI Developer.
      </HeroText>

      {/* About Me Section */}
      <AboutMeContainer>
        <AboutMeTitle>About Me</AboutMeTitle>
        <AboutMeText>
          I am currently pursuing my Bachelor's in Computer Science Engineering
          at PES University, Bengaluru. With a strong foundation in various
          programming languages and data science, I have worked on multiple
          projects involving AI and machine learning.
        </AboutMeText>
        <AboutMeText>
          My internship experiences at GSK and Tvastr Cloud Pvt Ltd allowed me
          to work on machine learning models, optimize data pipelines, and even
          explore the implementation of generative AI.
        </AboutMeText>
        <AboutMeText>
          I have a deep interest in AI development and data science, with a goal
          to drive innovative solutions in the technology space. I also enjoy
          mentoring and contributing to tech communities.
        </AboutMeText>
      </AboutMeContainer>
    </HeroContainer>
  );
};

export default HeroSection;