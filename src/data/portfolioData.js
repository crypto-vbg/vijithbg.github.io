/**
 * Portfolio Data
 * 
 * This file re-exports data from the central configuration file.
 * For editing portfolio content, please use: src/config/portfolioConfig.js
 */

import portfolioConfig from '../config/portfolioConfig';

export {
  personalInfo,
  socialLinks,
  skills,
  projects,
  experience,
  education,
  certifications,
  achievements,
  publications
} from '../config/portfolioConfig';

// Default export
export default portfolioConfig;
