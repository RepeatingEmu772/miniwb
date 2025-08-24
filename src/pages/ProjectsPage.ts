import { createElement, appendChildren } from '../utils/dom';

export function createProjectsPage(): HTMLElement {
  const page = createElement('div', 'page projects-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Projects');
  const subtitle = createElement('p', 'page-subtitle', 'A selection of work spanning web development, mobile apps, and creative coding');
  
  appendChildren(header, title, subtitle);
  
  // Add number list under header (moved from home page)
  const numberList = createElement('div', 'number-list');
  const numbers = [1,2,3,4,5];
  numbers.forEach(num => {
    const numberItem = createElement('span', 'number-item', num.toString());
    numberList.appendChild(numberItem);
  });
  // initially append number list after content (we'll append below)
  
  const content = createElement('section', 'page-content');
  
  // Project items - you can expand these
  const projects = [
    {
      title: 'Personal Website',
      description: 'A minimal TypeScript-based personal site with routing and clean design.',
      tech: ['TypeScript', 'Vite', 'CSS Grid']
    },
    {
      title: 'Task Management App',
      description: 'A productivity app built with modern web technologies.',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Creative Coding Experiments',
      description: 'Interactive visualizations and generative art pieces.',
      tech: ['p5.js', 'WebGL', 'Canvas API']
    }
    ,
    {
      title: 'Design System Kit',
      description: 'A reusable design system for consistent UI across products.',
      tech: ['Figma', 'Tokens', 'CSS']
    },
    {
      title: 'Mobile Habit App',
      description: 'A simple habit tracking app focused on minimal UX.',
      tech: ['React Native', 'TypeScript']
    }
  ];
  
  // Create project cards with a data-index so numbers can map to them
  projects.forEach((project, idx) => {
    const projectCard = createElement('div', 'project-card');
    projectCard.setAttribute('data-index', String(idx + 1));
    
    const projectTitle = createElement('h3', 'project-title', project.title);
    const projectDesc = createElement('p', 'project-description', project.description);
    
    const techList = createElement('div', 'tech-list');
    project.tech.forEach(tech => {
      const techTag = createElement('span', 'tech-tag', tech);
      techList.appendChild(techTag);
    });
    
    appendChildren(projectCard, projectTitle, projectDesc, techList);
    content.appendChild(projectCard);
  });
  
  appendChildren(page, header, content, numberList);
  
  // Hook up number filtering: clicking a number shows only the corresponding project
  const numberItems = page.querySelectorAll('.number-item');
  const cards = content.querySelectorAll<HTMLElement>('.project-card');

  const applyFilter = (selected: number | null) => {
    // update active number
    numberItems.forEach(n => {
      const val = parseInt(n.textContent || '0', 10);
      if (selected !== null && val === selected) n.classList.add('active');
      else n.classList.remove('active');
    });

    // update card visibility
    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      if (selected === null) {
        card.style.display = '';
      } else {
        card.style.display = idx === selected ? '' : 'none';
      }
    });
  };

  if (numberItems.length > 0) {
    // listen on the numberList (moved below content) so clicks are captured
    numberList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList.contains('number-item')) return;
      const selected = target.textContent ? parseInt(target.textContent, 10) : NaN;
      if (isNaN(selected)) return;

      applyFilter(selected);
    });

    // initialize with index 1 active
    applyFilter(1);
  }

  return page;
}
