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
        { name: 'SQL', level: 80 },
        { name: 'BASH', level: 70 },
        { name: 'Assembly x86-64', level: 40 },
        { name: 'Verilog', level: 30 }
      ]
    },
    {
      category: 'Frameworks',
      skills: [
        { name: 'TensorFlow', level: 85 },
        { name: 'NumPy', level: 90 },
        { name: 'Matplotlib', level: 85 },
        { name: 'Django', level: 80 },
        { name: 'Flask', level: 85 },
        { name: 'Spring Boot', level: 85 },
        { name: 'Micronaut', level: 80 },
        { name: 'TCP/IP', level: 75 },
        { name: 'Java RMI', level: 70 }
      ]
    },
    {
      category: 'Developer Tools',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'LaTeX', level: 75 },
        { name: 'Jira', level: 80 },
        { name: 'Hadoop/HDFS', level: 70 },
        { name: 'Hive', level: 70 },
        { name: 'Kafka', level: 75 }
      ]
    },
    {
      category: 'Platforms',
      skills: [
        { name: 'Linux', level: 90 },
        { name: 'MacOS', level: 85 },
        { name: 'Windows', level: 80 },
        { name: 'Arduino', level: 75 },
        { name: 'FPGA', level: 65 }
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
