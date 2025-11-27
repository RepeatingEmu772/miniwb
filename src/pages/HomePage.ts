import { createElement, appendChildren } from '../utils/dom';

export function createHomePage(): HTMLElement {
  const page = createElement('div', 'page home-page');
  
  const hero = createElement('section', 'hero');
  
  // Hero content wrapper
  const heroContent = createElement('div', 'hero-content');
  
  const prefix = createElement('p', 'hero-prefix', 'Hello there, I\'m');
  const title = createElement('h1', 'hero-title', 'Manan Mrig');
  const subtitle = createElement('p', 'hero-subtitle', 'Student and Software Engineer');
  const bio = createElement('p', 'hero-bio', 
    'I create meaningful digital experiences through thoughtful design and clean code. Currently focused on learning how humans interact with intelligent systems and creating spaces for Human-AI co-creation. '
  );
  
  appendChildren(heroContent, prefix, title, subtitle, bio);
  
  // Hero image
  const imageWrapper = createElement('div', 'hero-image-wrapper');
  const image = createElement('img', 'hero-image') as HTMLImageElement;
  image.src = '/image/profile.jpg'; 
  image.alt = 'Manan Mrig';
  imageWrapper.appendChild(image);
  
  appendChildren(hero, heroContent, imageWrapper);
  
  // Education section
  const educationSection = createElement('section', 'home-section');
  const educationTitle = createElement('h2', 'section-title', 'Education');
  const educationContent = createElement('div', 'section-content');
  
  const education = createElement('div', 'education-item');
  const schoolName = createElement('h3', 'item-title', 'University of Minnesota, Twin Cities');
  const degree = createElement('p', 'item-subtitle', 'B.S. in Computer Science');
  const eduYear = createElement('span', 'item-year', 'September 2020 - May 2024');
  const eduDesc = createElement('p', 'item-description', 
    'Focused on Artificial Intelligence, Machine Learning, Software Engineering and Systems Design. Dean\'s List honoree.'
  );
  
  appendChildren(education, schoolName, degree, eduYear, eduDesc);
  appendChildren(educationContent, education);
  appendChildren(educationSection, educationTitle, educationContent);
  
  // Experience section
  const experienceSection = createElement('section', 'home-section');
  const experienceTitle = createElement('h2', 'section-title', 'Experience');
  const experienceContent = createElement('div', 'section-content');
  
  // Experience item 1
  const exp1 = createElement('div', 'experience-item');
  const company1 = createElement('h3', 'item-title', 'Software Engineer');
  const companyName1 = createElement('p', 'item-subtitle', 'Target');
  const expYear1 = createElement('span', 'item-year', 'June 2024 - July 2025');
  const expDesc1 = createElement('p', 'item-description', 
    'At Target, I worked as an ML/Software Engineer on the Demand Forecasting and Inventory Insights team, building large-scale data pipelines, improving inventory accuracy, and developing end-to-end tools that integrated human feedback. My work improved supply-chain accuracy and helped recover over $140M in lost profits annually.'
  );
  appendChildren(exp1, company1, companyName1, expYear1, expDesc1);
  
  // Experience item 2
  const exp2 = createElement('div', 'experience-item');
  const company2 = createElement('h3', 'item-title', 'Teaching Assistant');
  const companyName2 = createElement('p', 'item-subtitle', 'University of Minnesota, Twin Cities');
  const expYear2 = createElement('span', 'item-year', 'January 2022 - May 2024');
  const expDesc2 = createElement('p', 'item-description', 
    'I served as a Teaching Assistant across multiple CS courses, including Machine Architecture (CSCI 2021), Software Design (CSCI 2081), and Discrete Mathematics (CSCI 2011). I led labs, reinforced concepts from virtual memory and compilers to C programming and system calls, and supported students by revising and grading assignments in C, Python, Java, and Assembly.'
  );
  appendChildren(exp2, company2, companyName2, expYear2, expDesc2);
  
  appendChildren(experienceContent, exp1, exp2);
  appendChildren(experienceSection, experienceTitle, experienceContent);
  
  // Resume link
  const resumeLink = createElement('p', 'resume-link');
  resumeLink.innerHTML = 'view my <a href="/resume.pdf" target="_blank">resume</a> for all experiences and in depth descriptions';
  
  // Continuous Learning section
  const learningSection = createElement('section', 'home-section');
  const learningTitle = createElement('h2', 'section-title', 'Continuous Learning');
  const learningContent = createElement('div', 'section-content');
  
  // Learning item 1
  const learn1 = createElement('div', 'learning-item');
  const course1 = createElement('h3', 'item-title', 'Interaction Design Specialization');
  const platform1 = createElement('p', 'item-subtitle', 'Coursera - UC San Diego');
  const learnYear1 = createElement('span', 'item-year', '2025');
  const learnDesc1 = createElement('p', 'item-description', 
    'Comprehensive program covering user-centered design, prototyping, and evaluation methods. Built practical projects to enhance human-AI collaboration.'
  );
  appendChildren(learn1, course1, platform1, learnYear1, learnDesc1);
  
  // Learning item 2
  const learn2 = createElement('div', 'learning-item');
  const course2 = createElement('h3', 'item-title', 'Human-Centered AI');
  const platform2 = createElement('p', 'item-subtitle', 'Coursera - Clemson University');
  const learnYear2 = createElement('span', 'item-year', '2025');
  const learnDesc2 = createElement('p', 'item-description', 
    ' Explored principles of Human-Centered AI, focusing on creating AI systems aligned with human values, behavior, and responsible design.'
  );
  appendChildren(learn2, course2, platform2, learnYear2, learnDesc2);
  
  appendChildren(learningContent, learn1, learn2);
  appendChildren(learningSection, learningTitle, learningContent);
  
  // Featured Projects section
  const featuredSection = createElement('section', 'home-section');
  const featuredTitle = createElement('h2', 'section-title', 'Projects');
  const featuredGrid = createElement('div', 'featured-grid');
  
  // Project box 1
  const projectBox1 = createElement('a', 'project-box') as HTMLAnchorElement;
  projectBox1.href = '/projects#1';
  const projectImage1 = createElement('img', 'project-box-image') as HTMLImageElement;
  projectImage1.src = '/image/assistant-overview.png';
  projectImage1.alt = 'AI Assistant Project';
  
  const projectBoxTitle1 = createElement('h3', 'project-box-title', 'Mook PAI: Reimagined LLM Application for mobile');
  
  const techList1 = createElement('div', 'tech-list');
  const tech1Tags = ['Interactive Design', 'HAI', 'SwiftUI', 'LangChain', 'PGVector'];
  tech1Tags.forEach(tech => {
    const techTag = createElement('span', 'tech-tag', tech);
    techList1.appendChild(techTag);
  });
  
  appendChildren(projectBox1, projectImage1, projectBoxTitle1, techList1);
  
  // Project box 2
  const projectBox2 = createElement('a', 'project-box') as HTMLAnchorElement;
  projectBox2.href = '/projects#2';
  const projectImage2 = createElement('img', 'project-box-image') as HTMLImageElement;
  projectImage2.src = '/image/canvas-overview.png';
  projectImage2.alt = 'Data Visualization Project';
  
  const projectBoxTitle2 = createElement('h3', 'project-box-title', 'ProPosterous: Human-AI co-creation canvas for creating posters');
  
  const techList2 = createElement('div', 'tech-list');
  const tech2Tags = ['Interactive Design', 'Next.js', 'React', 'Typescript', 'Python', 'seedream', 'Qwen-Visual Language Model'];
  tech2Tags.forEach(tech => {
    const techTag = createElement('span', 'tech-tag', tech);
    techList2.appendChild(techTag);
  });
  
  appendChildren(projectBox2, projectImage2, projectBoxTitle2, techList2);
  
  appendChildren(featuredGrid, projectBox1, projectBox2);
  
  // View all projects link
  const viewAllLink = createElement('p', 'view-all-link');
  viewAllLink.innerHTML = 'view the <a href="/projects">projects</a> page for all the projects and in depth  descriptions';
  
  appendChildren(featuredSection, featuredTitle, featuredGrid, viewAllLink);
  
  appendChildren(page, hero, featuredSection, educationSection, experienceSection, resumeLink, learningSection);
  
  return page;
}
