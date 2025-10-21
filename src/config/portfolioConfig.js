/**
 * Portfolio Configuration File
 * 
 * This is your single source of truth for all portfolio content.
 * Edit this file to update your portfolio information across the entire website.
 */

// ============================================
// PERSONAL INFORMATION
// ============================================
export const personalInfo = {
  name: 'Vijith B G',
  title: 'AI Engineer & Data Scientist',
  subtitle: 'Building intelligent systems with Generative AI and Enterprise Analytics',
  bio: 'AI Engineer with expertise in developing and deploying Generative AI and Data Science solutions across enterprise environments. Proven track record in LLM-based systems, multi-agent architectures, and Responsible AI frameworks. Skilled at leveraging Azure, Databricks, and open-source technologies to deliver scalable, secure, and efficient AI-driven analytics systems.',
  location: 'Bengaluru, India',
  email: 'vijithkrish24@gmail.com',
  phone: '+91-9449374015',
  profileImage: '/images/Vijith_web_pic.jpg',
  
  // Achievement stats displayed in About section
  achievements: [
    {
      icon: '🏆',
      value: '1st',
      label: 'GSK Hackathon Winner'
    },
    {
      icon: '🎓',
      value: '8.46',
      label: 'CGPA'
    },
    {
      icon: '🤖',
      value: '83+',
      label: 'AI Use Cases Reviewed'
    },
    {
      icon: '⚡',
      value: '70%',
      label: 'Time Reduction'
    }
  ]
};

// ============================================
// SOCIAL LINKS
// ============================================
export const socialLinks = [
  {
    platform: 'GitHub',
    url: 'https://github.com/crypto-vbg',
    icon: 'github',
    ariaLabel: 'Visit my GitHub profile'
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vijith-bg-92a3bb21a/',
    icon: 'linkedin',
    ariaLabel: 'Connect with me on LinkedIn'
  }
];

// ============================================
// SKILLS
// ============================================
export const skills = [
  // Inner orbit (250px radius, 10s duration) - 6 skills
  {
    name: 'Generative AI',
    icon: '🤖',
    proficiency: 95,
    category: 'AI/ML',
    orbitRadius: 250,
    orbitDuration: 10
  },
  {
    name: 'Python',
    icon: '🐍',
    proficiency: 95,
    category: 'Programming',
    orbitRadius: 250,
    orbitDuration: 10
  },
  {
    name: 'LangChain',
    icon: '🔗',
    proficiency: 92,
    category: 'AI/ML',
    orbitRadius: 250,
    orbitDuration: 10
  },
  {
    name: 'SQL',
    icon: '🗄️',
    proficiency: 90,
    category: 'Programming',
    orbitRadius: 250,
    orbitDuration: 10
  },
  {
    name: 'Azure',
    icon: '☁️',
    proficiency: 93,
    category: 'Cloud',
    orbitRadius: 250,
    orbitDuration: 10
  },
  {
    name: 'Databricks',
    icon: '🔥',
    proficiency: 92,
    category: 'Cloud',
    orbitRadius: 250,
    orbitDuration: 10
  },
  // Middle orbit (300px radius, 15s duration) - 6 skills
  {
    name: 'Azure OpenAI',
    icon: '🧠',
    proficiency: 90,
    category: 'AI/ML',
    orbitRadius: 300,
    orbitDuration: 15
  },
  {
    name: 'Scikit-learn',
    icon: '📊',
    proficiency: 88,
    category: 'AI/ML',
    orbitRadius: 300,
    orbitDuration: 15
  },
  {
    name: 'PySpark',
    icon: '⚡',
    proficiency: 85,
    category: 'Programming',
    orbitRadius: 300,
    orbitDuration: 15
  },
  {
    name: 'ReactJS',
    icon: '⚛️',
    proficiency: 82,
    category: 'Programming',
    orbitRadius: 300,
    orbitDuration: 15
  },
  {
    name: 'NumPy',
    icon: '🔢',
    proficiency: 88,
    category: 'AI/ML',
    orbitRadius: 300,
    orbitDuration: 15
  },
  {
    name: 'Pandas',
    icon: '🐼',
    proficiency: 90,
    category: 'AI/ML',
    orbitRadius: 300,
    orbitDuration: 15
  },
  // Outer orbit (350px radius, 20s duration) - 6 skills
  {
    name: 'Docker',
    icon: '🐳',
    proficiency: 80,
    category: 'DevOps',
    orbitRadius: 350,
    orbitDuration: 20
  },
  {
    name: 'Kubernetes',
    icon: '☸️',
    proficiency: 78,
    category: 'DevOps',
    orbitRadius: 350,
    orbitDuration: 20
  },
  {
    name: 'MongoDB',
    icon: '🍃',
    proficiency: 75,
    category: 'Database',
    orbitRadius: 350,
    orbitDuration: 20
  },
  {
    name: 'MySQL',
    icon: '🐬',
    proficiency: 80,
    category: 'Database',
    orbitRadius: 350,
    orbitDuration: 20
  },
  {
    name: 'Git',
    icon: '📦',
    proficiency: 90,
    category: 'Tools',
    orbitRadius: 350,
    orbitDuration: 20
  },
  {
    name: 'Streamlit',
    icon: '🎯',
    proficiency: 85,
    category: 'Tools',
    orbitRadius: 350,
    orbitDuration: 20
  }
];

// ============================================
// PROJECTS
// ============================================
export const projects = [
  {
    id: 'project-1',
    title: 'Finance AI Analytics Agentic System',
    description: 'NL-to-SQL query agent that converts natural language to SQL and generates executive summaries, reducing manual query-building time by 70%.',
    image: '/images/quantum-navigator.svg',
    liveUrl: null,
    githubUrl: null,
    tags: ['Azure', 'Databricks', 'Python', 'Agentic AI', 'NL-to-SQL']
  },
  {
    id: 'project-2',
    title: 'GenAI Document Comparison Tool',
    description: 'Generative AI-powered application for legal teams to compare documents, cutting form verification time by 6 hours per instance.',
    image: '/images/stellar-database.svg',
    liveUrl: null,
    githubUrl: null,
    tags: ['Generative AI', 'Azure', 'Python', 'Document Processing']
  },
  {
    id: 'project-3',
    title: 'Multilingual Clinical Chatbot',
    description: 'GenAI chatbot with vector search and persona-based access controls for clinical document repositories.',
    image: '/images/cosmic-chat.svg',
    liveUrl: null,
    githubUrl: null,
    tags: ['LangChain', 'Vector DB', 'Azure OpenAI', 'RAG']
  },
  {
    id: 'project-4',
    title: 'Responsible AI Audit Dashboard',
    description: 'Comprehensive dashboard for AI governance, managing AI registry and reviewing 83+ AI use cases across GSK.',
    image: '/images/astro-dashboard.svg',
    liveUrl: null,
    githubUrl: null,
    tags: ['Databricks', 'Python', 'AI Governance', 'Analytics']
  },
  {
    id: 'project-5',
    title: 'ML Classification Model',
    description: 'Machine learning model using cosine similarity achieving 70% faster processing and 95% accuracy during business validation.',
    image: '/images/nebula-engine.svg',
    liveUrl: null,
    githubUrl: null,
    tags: ['Python', 'Scikit-learn', 'PySpark', 'Azure']
  },
  {
    id: 'project-6',
    title: 'Kubernetes AI Troubleshooting Bot',
    description: 'AI-driven bot using ChatGPT and Azure OpenAI for automated Kubernetes diagnostics, reducing manual effort by 50%.',
    image: '/images/orbit-tracker.svg',
    liveUrl: null,
    githubUrl: null,
    tags: ['OpenAI', 'Kubernetes', 'Docker', 'Python']
  }
];

// ============================================
// EXPERIENCE
// ============================================
export const experience = [
  {
    id: 'exp-1',
    company: 'GSK (GlaxoSmithKline)',
    role: 'Technical Associate – AI & Analytics',
    period: 'Dec 2024 – Present',
    location: 'Bengaluru, India',
    highlights: [
      'Designed Finance AI Analytics Agentic System converting natural language to SQL, reducing query-building time by 70%',
      'Developed GenAI document comparison application for legal teams, cutting verification time by 6 hours per instance',
      'Contributed to Responsible AI Audit team, reviewed 83 AI use cases and standardized governance',
      'Built multilingual GenAI chatbot with vector search and persona-based access controls'
    ],
    technologies: ['Azure', 'Databricks', 'Python', 'PySpark', 'Generative AI', 'Agentic AI']
  },
  {
    id: 'exp-2',
    company: 'GSK (GlaxoSmithKline)',
    role: 'Graduate Intern – AI/ML Engineering',
    period: 'Jan 2024 – Nov 2024',
    location: 'Bengaluru, India',
    highlights: [
      'Engineered ML classification model using cosine similarity achieving 70% faster processing and 95% accuracy',
      'Automated model feature selection and optimization for global deployment',
      'Developed Generative AI POCs for document summarization'
    ],
    technologies: ['Azure', 'Databricks', 'Python', 'PySpark', 'Generative AI']
  },
  {
    id: 'exp-3',
    company: 'Tvastr Cloud Pvt Ltd',
    role: 'Artificial Intelligence Development Intern',
    period: 'Jun 2023 – Dec 2023',
    location: 'Remote',
    highlights: [
      'Integrated AI-driven Kubernetes troubleshooting bot using ChatGPT and Azure OpenAI, reducing manual effort by 50%',
      'Automated log analysis and system monitoring workflows, improving uptime by 20%',
      'Built conversational prompt systems for bioinformatics workflows'
    ],
    technologies: ['Python', 'OpenAI', 'Kubernetes', 'Docker', 'NextFlow']
  }
];

// ============================================
// EDUCATION
// ============================================
export const education = [
  {
    id: 'edu-1',
    institution: 'PES University',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: '2020 – 2024',
    location: 'Bangalore',
    grade: 'CGPA: 8.46/10.0',
    achievements: ['7x Distinction Award for achieving >7.75 SGPA']
  },
  {
    id: 'edu-2',
    institution: 'Expert Pre-University College',
    degree: 'Senior Secondary (PCMB, KSSEEB)',
    period: '2020',
    location: 'Mangalore',
    grade: 'Percentage: 94.17%'
  }
];

// ============================================
// CERTIFICATIONS
// ============================================
export const certifications = [
  {
    id: 'cert-1',
    title: 'Databricks Certified Generative AI Engineer – Associate',
    issuer: 'Databricks',
    date: 'May 2025',
    validity: 'May 2025 – May 2027',
    credentialId: '145101786'
  }
];

// ============================================
// ACHIEVEMENTS
// ============================================
export const achievements = [
  {
    id: 'ach-1',
    title: '1st Place – GSK GP&T Hackathon',
    date: 'Nov 2024',
    description: 'Team of Five'
  },
  {
    id: 'ach-2',
    title: 'Runner-up – GSK GP&T Hackathon',
    date: 'Jul 2024'
  },
  {
    id: 'ach-3',
    title: 'Global Recognition Award',
    date: 'May 2024',
    description: 'Excellence in AI governance at GSK'
  },
  {
    id: 'ach-4',
    title: '7x Distinction Award',
    date: '2020–2023',
    description: 'Achieving >7.75 SGPA across academic terms'
  }
];

// ============================================
// PUBLICATIONS
// ============================================
export const publications = [
  {
    id: 'pub-1',
    title: 'Leveraging Knowledge Graphs for Analyzing Open-Source Software Ecosystems: A GitHub Case Study',
    conference: 'I2CT 2024 Conference – IEEE International Conference on Innovative Computing Technologies',
    doi: '10.1109/I2CT61223.2024.10544334',
    url: 'https://doi.org/10.1109/I2CT61223.2024.10544334'
  }
];

// ============================================
// EXPORT ALL
// ============================================
export default {
  personalInfo,
  socialLinks,
  skills,
  projects,
  experience,
  education,
  certifications,
  achievements,
  publications
};
