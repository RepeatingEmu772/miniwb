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
    'I create meaningful digital experiences through thoughtful design and clean code. Currently focused on learning how to make systems smarter. '
  );

  const updatesSection = createElement('div', 'hero-updates');
  const updatesTitle = createElement('p', 'hero-updates-title', 'Recent Updates');
  const updatesList = createElement('div', 'hero-updates-list');

  const updates = [
    { text: 'Just Accepted an offer from the University of Waterloo!', date: 'May 2026' },
    { text: 'Recieved Admission offers from 8 out of 9 grad schools I applied to.', date: 'May 2026' },
    { text: 'Visiting Goa with da homies.', date: 'Apr 2026' },
    { text: 'Visiting Vietnam for the first time.', date: 'Mar 2026' },
    { text: 'Recieved my first Graduate School offer :)', date: 'Feb 2026' },
    { text: 'Visiting Thailand to celebrate New Years.', date: 'Dec 2025' },
    { text: 'Stepping away from Target to go home and apply for graduate school and travel!!', date: 'Jul 2025' }
  ];

  updates.forEach((update) => {
    const updateItem = createElement('div', 'hero-update-item');
    const updateText = createElement('p', 'hero-update-text', update.text);
    const updateDate = createElement('span', 'hero-update-date', update.date);

    appendChildren(updateItem, updateDate, updateText);
    updatesList.appendChild(updateItem);
  });

  appendChildren(updatesSection, updatesTitle, updatesList);
  
  appendChildren(heroContent, prefix, title, subtitle, bio, updatesSection);
  
  // Hero image
  const imageWrapper = createElement('div', 'hero-image-wrapper');
  const image = createElement('img', 'hero-image') as HTMLImageElement;
  image.src = '/image/profile.jpg'; 
  image.alt = 'Manan Mrig';
  imageWrapper.appendChild(image);
  
  appendChildren(hero, heroContent, imageWrapper);
  
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
  resumeLink.innerHTML = 'view my <a href="/cv.pdf" target="_blank">cv</a> for all experiences and in depth descriptions';
  
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
  
  // Education & Continuous Learning section (combined)
  const educationSection = createElement('section', 'home-section');
  const educationTitle = createElement('h2', 'section-title', 'Education & Continuous Learning');
  const educationContent = createElement('div', 'section-content');
  
  const gradeducation = createElement('div', 'education-item');
  const gradschoolName = createElement('h3', 'item-title', 'University of Waterloo');
  const graddegree = createElement('p', 'item-subtitle', 'Masters in Data Science');
  const gradeduYear = createElement('span', 'item-year', 'September 2026 - Present');
  const gradeduDesc = createElement('p', 'item-description', 
    'Focused the mathematical foundations of higher level machine learning models.'
  );
  appendChildren(gradeducation, gradschoolName, graddegree, gradeduYear, gradeduDesc);

  const education = createElement('div', 'education-item');
  const schoolName = createElement('h3', 'item-title', 'University of Minnesota, Twin Cities');
  const degree = createElement('p', 'item-subtitle', 'B.S. in Computer Science');
  const eduYear = createElement('span', 'item-year', 'September 2020 - May 2024');
  const eduDesc = createElement('p', 'item-description', 
    'Focused on Artificial Intelligence, Machine Learning, Software Engineering and Systems Design. Dean\'s List honoree.'
  );
  appendChildren(education, schoolName, degree, eduYear, eduDesc);
  
  const learn1 = createElement('div', 'learning-item');
  const course1 = createElement('h3', 'item-title', 'Interaction Design Specialization');
  const platform1 = createElement('p', 'item-subtitle', 'Coursera - UC San Diego');
  const learnYear1 = createElement('span', 'item-year', '2025');
  const learnDesc1 = createElement('p', 'item-description', 
    'Comprehensive program covering user-centered design, prototyping, and evaluation methods. Built practical projects to enhance human-AI collaboration.'
  );
  appendChildren(learn1, course1, platform1, learnYear1, learnDesc1);
  
  
  appendChildren(educationContent, gradeducation, education, learn1);
  appendChildren(educationSection, educationTitle, educationContent);
  
  appendChildren(page, hero, featuredSection, educationSection, experienceSection, resumeLink);
  
  return page;
}
