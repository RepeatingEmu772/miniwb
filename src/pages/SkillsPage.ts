import { createElement, appendChildren } from '../utils/dom';

export function createSkillsPage(): HTMLElement {
  const page = createElement('div', 'page skills-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Skills');
  const subtitle = createElement('p', 'page-subtitle', 'Technologies and tools I work with');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content');
  
  // Skill categories with proficiency levels (0-100)
  const skillCategories = [
    {
      category: 'Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'C++', level: 85 },
        { name: 'C', level: 80 },
        { name: 'Java', level: 80 },
        { name: 'Kotlin', level: 75 },
        { name: 'JavaScript', level: 75 },
        { name: 'TypeScript', level: 75 },
        { name: 'SQL', level: 70 },
        { name: 'BASH', level: 60 },
        { name: 'Assembly x86-64', level: 40 },
        { name: 'Verilog', level: 30 }
      ]
    },
    {
      category: 'Frameworks',
      skills: [
        { name: 'TensorFlow', level: 60 },
        { name: 'NumPy', level: 60 },
        { name: 'Matplotlib', level: 70 },
        { name: 'Django', level: 80 },
        { name: 'Flask', level: 85 },
        { name: 'Spring Boot', level: 85 },
        { name: 'Micronaut', level: 80 },
        { name: 'TCP/IP', level: 65 },
        { name: 'Java RMI', level: 55 }
      ]
    },
    {
      category: 'Developer Tools',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'LaTeX', level: 75 },
        { name: 'Jira', level: 80 },
        { name: 'Hadoop/HDFS', level: 60 },
        { name: 'Hive', level: 70 },
        { name: 'Kafka', level: 60 }
      ]
    },
    {
      category: 'Platforms',
      skills: [
        { name: 'Linux', level: 90 },
        { name: 'MacOS', level: 90 },
        { name: 'Windows', level: 90 },
        { name: 'Arduino', level: 70 },
        { name: 'FPGA', level: 40 }
      ]
    }
  ];
  
  skillCategories.forEach(category => {
    const categoryCard = createElement('div', 'skill-category');
    
    const categoryTitle = createElement('h3', 'category-title', category.category);
    const skillsList = createElement('div', 'skills-grid');
    
    category.skills.forEach(skill => {
      const skillItem = createElement('div', 'skill-item');
      
      const skillName = createElement('div', 'skill-name', skill.name);
      
      const progressBar = createElement('div', 'progress-bar');
      const progressFill = createElement('div', 'progress-fill');
      progressFill.setAttribute('data-level', skill.level.toString());
      progressBar.appendChild(progressFill);
      
      appendChildren(skillItem, skillName, progressBar);
      skillsList.appendChild(skillItem);
    });
    
    appendChildren(categoryCard, categoryTitle, skillsList);
    content.appendChild(categoryCard);
  });
  
  appendChildren(page, header, content);
  
  // Trigger animations after a short delay to ensure page is rendered
  setTimeout(() => {
    const progressFills = page.querySelectorAll('.progress-fill');
    progressFills.forEach((fill) => {
      const level = fill.getAttribute('data-level');
      if (level) {
        (fill as HTMLElement).style.width = `${level}%`;
      }
    });
  }, 100);
  
  return page;
}
