import { createElement, appendChildren } from '../utils/dom';

export function createSkillsPage(): HTMLElement {
  const page = createElement('div', 'page skills-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Skills');
  const subtitle = createElement('p', 'page-subtitle', 'Technologies and tools I work with');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content');
  
  // Skill categories
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['TypeScript', 'React', 'Vue.js', 'HTML5', 'CSS3', 'Sass']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Python', 'Express', 'PostgreSQL', 'MongoDB']
    },
    {
      category: 'Tools',
      skills: ['Git', 'Vite', 'Webpack', 'Docker', 'VS Code', 'Figma']
    },
    {
      category: 'Design',
      skills: ['UI/UX Design', 'Responsive Design', 'Typography', 'Color Theory']
    }
  ];
  
  skillCategories.forEach(category => {
    const categoryCard = createElement('div', 'skill-category');
    
    const categoryTitle = createElement('h3', 'category-title', category.category);
    const skillsList = createElement('div', 'skills-list');
    
    category.skills.forEach(skill => {
      const skillTag = createElement('span', 'skill-tag', skill);
      skillsList.appendChild(skillTag);
    });
    
    appendChildren(categoryCard, categoryTitle, skillsList);
    content.appendChild(categoryCard);
  });
  
  appendChildren(page, header, content);
  
  return page;
}
