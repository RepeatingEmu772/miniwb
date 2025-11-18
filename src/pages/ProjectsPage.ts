import { createElement, appendChildren } from '../utils/dom';

export function createProjectsPage(): HTMLElement {
  const page = createElement('div', 'page projects-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Projects');
  const subtitle = createElement('p', 'page-subtitle', 'A selection of work spanning web development, mobile apps, and creative coding');
  
  appendChildren(header, title);
  
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
      title: 'Reimagined LLM Applications for mobile',
      description: 'Problem Statement: Most current mobile AI chat apps like ChatGPT or Gemini feel reactive and opaque, often hiding the context stored about the user.\nProposed solution: Design a user-centric AI assistant that proactively helps with day-to-day tasks while being transparent about data usage and memory. The app feels “alive” through agenda panels, conversational summaries, and customizable widgets. It also lets users inspect or delete stored context at any time promoting transparency.',
      tech: ['Interactive Design', 'HAI', 'SwiftUI' , 'LangChain', 'PGVector']
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
    const techList = createElement('div', 'tech-list');
    project.tech.forEach(tech => {
      const techTag = createElement('span', 'tech-tag', tech);
      techList.appendChild(techTag);
    });

    const projectDesc = createElement('p', 'project-description');

    if (project.description.includes('\n')) {
      (projectDesc as HTMLElement).innerHTML = project.description
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('<br><br>');
    } else {
      projectDesc.textContent = project.description;
    }

    appendChildren(projectCard, techList, projectTitle, projectDesc);

    if (idx === 0) {
      const annotationBlock = createElement('div', 'annotation-block');

      const annotationTitle = createElement(
        'h4',
        'annotation-title',
        'Visual Walkthrough'
      );
      const annotationSubtitle = createElement(
        'p',
        'annotation-subtitle',
        'For full code of all three submodules, see the GitHub repositories. Scroll down for the architecture diagram.'
      );

      const annotationContainer = createElement('div', 'annotation-container');

      // First annotated image
      const firstItem = createElement('div', 'annotation-item');
      const baseImage = createElement('img', 'annotation-image') as HTMLImageElement;
      baseImage.src = '/image/assistant-home.png';
      baseImage.alt = 'Project screenshot with annotations';
      baseImage.width = 360;
      baseImage.height = 760;

      const firstLabelGroup = createElement('div', 'annotation-label-group');

      const firstLabelPrimary = createElement(
        'div',
        'annotation-label',
        'Customizable widgets for frequently asked questions'
      );
      const firstLabelSecondary = createElement(
        'div',
        'annotation-label',
        'Easily accessible suggestions to get started quickly'
      );

      appendChildren(firstLabelGroup, firstLabelPrimary, firstLabelSecondary);
      appendChildren(firstItem, baseImage, firstLabelGroup);

      // Second annotated image to the right
      const secondItem = createElement('div', 'annotation-item');
      const secondImage = createElement('img', 'annotation-image') as HTMLImageElement;
      // TODO: update this path to your second screenshot
      secondImage.src = '/image/assistant-context.png';
      secondImage.alt = 'Context view screenshot';
      secondImage.width = 360;
      secondImage.height = 760;

      const secondLabel = createElement(
        'div',
        'annotation-label',
        'Allow users to view the context of past conversations and delete any if need be'
      );

      appendChildren(secondItem, secondImage, secondLabel);

      const thirdItem = createElement('div', 'annotation-item');
      const thirdImage = createElement('img', 'annotation-image') as HTMLImageElement;
      thirdImage.src = '/image/assistant-agenda.png';
      thirdImage.alt = 'Agenda view screenshot';
      thirdImage.width = 360;
      thirdImage.height = 760;

      const thirdLabel = createElement(
        'div',
        'annotation-label',
        'Panels created at runtime to help users focus on specific tasks'
      );

      appendChildren(thirdItem, thirdImage, thirdLabel);

      const fourthItem = createElement('div', 'annotation-item');
      const fourthImage = createElement('img', 'annotation-image') as HTMLImageElement;
      fourthImage.src = '/image/assistant-news.png';
      fourthImage.alt = 'Settings view screenshot';
      fourthImage.width = 360;
      fourthImage.height = 760;

      const fourthLabel = createElement(
        'div',
        'annotation-label',
        'Multiple types of content cards to suit different information needs'
      );

      appendChildren(fourthItem, fourthImage, fourthLabel);

      // Fifth annotated image (below the first & third column)
      const fifthItem = createElement('div', 'annotation-item');
      const fifthImage = createElement('img', 'annotation-image') as HTMLImageElement;
      // TODO: update this path to your fifth screenshot
      fifthImage.src = '/image/assistant-share.png';
      fifthImage.alt = 'Additional view screenshot';
      fifthImage.width = 360;
      fifthImage.height = 760;

      const fifthLabel = createElement(
        'div',
        'annotation-label',
        'Allow users to share content seamlessly across platforms'
      );

      appendChildren(fifthItem, fifthImage, fifthLabel);

      // Fifth annotated image (below the first & third column)
      const sixthItem = createElement('div', 'annotation-item');
      const sixthImage = createElement('img', 'annotation-image') as HTMLImageElement;
      // TODO: update this path to your sixth screenshot
      sixthImage.src = '/image/assistant-summary.png';
      sixthImage.alt = 'Additional view screenshot';
      sixthImage.width = 360;
      sixthImage.height = 760;

      const sixthLabel = createElement(
        'div',
        'annotation-label',
        'Summarize key points from the conversation for easy reference'
      );

      appendChildren(sixthItem, sixthImage, sixthLabel);

      appendChildren(
        annotationContainer,
        firstItem,
        secondItem,
        thirdItem,
        sixthItem,
        fifthItem,
        fourthItem
      );
      appendChildren(
        annotationBlock,
        annotationTitle,
        annotationSubtitle,
        annotationContainer
      );
      projectCard.appendChild(annotationBlock);

      const architectureBlock = createElement('div', 'architecture-block');

      const architectureTitle = createElement(
        'h4',
        'architecture-title',
        'System architecture'
      );
      const architectureSubtitle = createElement(
        'p',
        'architecture-subtitle',
        'High-level diagram showing how the iOS app, smart router, PGVector, and model providers work together.'
      );

      const architectureImageWrapper = createElement(
        'div',
        'architecture-image-wrapper'
      );
      const architectureImage = createElement(
        'img',
        'architecture-image'
      ) as HTMLImageElement;
      architectureImage.src = '/image/assistant-architecture-3.png';
      architectureImage.alt =
        'System architecture diagram for the personal AI assistant';
      architectureImageWrapper.appendChild(architectureImage);

      appendChildren(
        architectureBlock,
        architectureTitle,
        architectureSubtitle,
        architectureImageWrapper
      );
      projectCard.appendChild(architectureBlock);

      const annotationBlock2 = createElement('div', 'annotation-block');


      const annotationSubtitle2 = createElement(
        'p',
        'annotation-subtitle',
        '**Note: The external app functionality shown in the 5th screenshot is simulated for demonstration purposes only and is not part of the actual app implementation.**'
      );

      appendChildren(
        annotationBlock2,
        annotationSubtitle2
      );
      projectCard.appendChild(annotationBlock2);
    }

    content.appendChild(projectCard);
  });
  
  // wrap number list with controls
  const controls = createElement('div', 'number-controls');
  const prevBtn = createElement('div', 'number-button prev');
  // arrow with dash after the arrow
  prevBtn.innerHTML = `<span class="icon">◀</span><span>prev</span>`;
  const nextBtn = createElement('div', 'number-button next');
  // dash before the arrow
  nextBtn.innerHTML = `<span>next</span><span class="icon">▶</span>`;
  appendChildren(controls, prevBtn, numberList, nextBtn);

  appendChildren(page, header, content, controls);
  
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

    // arrow navigation logic
    const clamp = (v: number) => Math.max(1, Math.min(numbers.length, v));
    prevBtn.addEventListener('click', () => {
      const active = page.querySelector('.number-item.active');
      const cur = active ? parseInt(active.textContent || '1', 10) : 1;
      applyFilter(clamp(cur - 1));
    });
    nextBtn.addEventListener('click', () => {
      const active = page.querySelector('.number-item.active');
      const cur = active ? parseInt(active.textContent || '1', 10) : 1;
      applyFilter(clamp(cur + 1));
    });
  }

  return page;
}
