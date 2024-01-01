import React from "react";
import "./App.css";

const projectsData = [
  {
    title: "Employee Payroll Management System",
    description: "Automating Payroll for Seamless Employee Management",
    githubLink: "https://github.com/crypto-vbg/Employee_payroll",
  },
  {
    title: "Fitness Assistant Chatbot",
    description: "A streamlit based chat application for finess",
    githubLink: "https://github.com/crypto-vbg/Fitness-chatbot-openAI",
  },
  {
    title: " Career Guidance System",
    description:
      "Developed a platform with personality tests, career recommendations, and job search features",
    githubLink: "https://github.com/ArnavKumar7/career-guidance-system",
  },
];

const educationData = [
  {
    institution: "PES University, Bengaluru, India",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    graduationDate: "May 2024",
    gpa: "8.37/10.00",
    coursework:
      "Natural Language Processing, Machine Intelligence, Data Analytics, Big Data",
    awards: "Distinction Award Certificate",
  },
  {
    institution: "Expert Pre University College, Mangaluru, India",
    degree: "Higher Secondary Education",
    graduationDate: "May 2020",
    gpa: "94.167%",
    coursework: "Physics, Chemistry, Mathematics, Biology",
    awards: "First Class with Distinction",
  },
];

const EducationCard = ({
  institution,
  degree,
  graduationDate,
  gpa,
  coursework,
  awards,
}) => (
  <div className="education-card">
    <h3>{institution}</h3>
    <p>
      {degree} | {graduationDate}
      <br />
      GPA/%: {gpa}
      <br />
      Coursework: {coursework}
      <br />
      Awards: {awards}
    </p>
  </div>
);

const ProjectCard = ({ title, description, githubLink }) => (
  <div className="project-card">
    <h3>{title}</h3>
    <p>{description}</p>
    <a
      href={githubLink}
      target="_blank"
      rel="noopener noreferrer"
      className="github-link"
    >
      View on GitHub
    </a>
  </div>
);

const WorkExperienceCard = ({
  company,
  duration,
  position,
  responsibilities,
  technologies,
}) => (
  <div className="work-experience-card">
    <h3>{company}</h3>
    <p>{duration}</p>
    <h4>{position}</h4>
    <ul>
      {responsibilities.map((responsibility, index) => (
        <li key={index}>{responsibility}</li>
      ))}
    </ul>
    {technologies && (
      <div className="technologies-used">
        <strong>Technologies Used:</strong> {technologies}
      </div>
    )}
  </div>
);

const workExperienceData = [
  {
    company: "Tvastr Cloud Pvt Ltd",
    duration: "June 2023 - December 2023",
    position: "Artificial Intelligence Development Intern",
    responsibilities: [
      "Enhanced engineering with ChatGPT for swift and effective troubleshooting of Kubernetes issues.",
      "Leveraged ChatGPT to develop a cutting-edge troubleshooting bot using Azure OpenAI services, enabling users to autonomously resolve Kubernetes problems.",
      "Automated the troubleshooting process by generating and executing commands for issue resolution, with results seamlessly sent to the bot for precise and accurate diagnostics.",
      "Diligently conducted Kubernetes debugging by performing comprehensive log analysis and system monitoring, leading to the successful resolution of critical performance bottlenecks.",
    ],
    technologies:
      "Prompt Engineering, Python, Azure OpenAI services, Kubernetes",
  },
  // Add more entries if needed
];

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>VIJITH B G</h1>
        <p>Machine Learning | Artificial Intelligence | Software development</p>
      </header>

      <nav>
        <ul>
          <li>
            <a href="#profile">PROFILE</a>
          </li>
          <li>
            <a href="#education">EDUCATION</a>
          </li>
          <li>
            <a href="#experience">WORK EXPERIENCE</a>
          </li>
          <li>
            <a href="#projects">PROJECTS</a>
          </li>
          <li>
            <a
              href="https://drive.google.com/file/d/1Bjz0V5lcxPNVXW-Z4H3QyIMTM7a_82n5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              RESUME
            </a>
          </li>
        </ul>
      </nav>

      <section id="profile" className="profile-section">
        <div className="profile-content">
          <div className="profile-description">
            <h2>PROFILE</h2>
            <p>
              Greetings, and thank you for visiting my web page! I'm Vijith BG,
              an enthusiastic and forward-looking student currently pursuing a
              Bachelor of Technology in Computer Science Engineering at PES
              University in Bengaluru. My academic journey is not just a pursuit
              of a degree; it's a passionate exploration of the intricate realms
              of artificial intelligence, machine learning, and software
              development.
              <br />
              Explore my web page to learn more about my journey, projects, and
              the exciting world of technology that fuels my passion!
            </p>
          </div>
          <div className="profile-image">
            {/* Insert your profile image here */}
            <img
              src={process.env.PUBLIC_URL + "/images/profilepic.jpg"}
              alt="Profile"
              className="profile-img"
            />
          </div>
        </div>
      </section>

      <section id="education">
        <h2>EDUCATION</h2>
        <div className="education-section">
          {educationData.map((education, index) => (
            <EducationCard key={index} {...education} />
          ))}
        </div>
      </section>

      <section id="experience">
        <h2>WORK EXPERIENCE</h2>
        <div className="work-experience-section">
          {workExperienceData.map((experience, index) => (
            <WorkExperienceCard key={index} {...experience} />
          ))}
        </div>
      </section>

      <section id="projects">
        <h2>PROJECTS</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2023 VIJITH B G. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
