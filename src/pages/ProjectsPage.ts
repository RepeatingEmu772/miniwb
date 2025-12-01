import { createElement, appendChildren } from '../utils/dom';

export function createProjectsPage(): HTMLElement {
  const page = createElement('div', 'page projects-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Projects');
  
  appendChildren(header, title);
  
  // Add number list under header (moved from home page)
  const numberList = createElement('div', 'number-list');
  const numbers = [1,2]; // Only 2 projects now
  numbers.forEach(num => {
    const numberItem = createElement('span', 'number-item', num.toString());
    numberList.appendChild(numberItem);
  });
  
  const content = createElement('section', 'page-content');
  
  const projects = [
    {
      title: 'Mook PAI: Reimagined LLM Application for mobile',
      description: 'Problem Statement: Most current LLM chat apps like ChatGPT or Gemini feel reactive and opaque, completely needing the user to actively engage by chat before being of any value and often hiding the context stored about the user.\nProposed solution: Design a user-centric AI assistant that proactively helps with day-to-day tasks while being transparent about data usage and memory. The app feels “alive” through agenda panels, conversational summaries, and customizable widgets. It also lets users inspect or delete stored context at any time promoting transparency.',
      tech: ['Interactive Design', 'HAI', 'SwiftUI' , 'LangChain', 'PGVector']
    },
    {
      title: 'ProPosterous: Human-AI co-creation canvas for creating posters',
      description: 'Problem Statement: Diffusion models today often mess up on text when asked for an infographic. In addition, their is no way to edit the text without prompting for a new image which in itself is a gamble because the new image can make the text even worse. This makes current diffusion models unsuitable to create infographics such as Posters .\nProposed Solution: Create a collaborative canvas where users and diffusion models work together in real-time. The system eases the heavy lifting from users by making backgrounds and animations while preserving user autonomy, allowing seamless iteration between human creativity and AI capabilities. The canvas allows users to request specific edits to text elements by chat or gives them tools to just do it themselves, including moving the text around canvas',
      tech: ['Interactive Design', 'Next.js', 'React', 'Typescript', 'Python', 'Seedream', 'Qwen-Visual Language Model']
    }
    // ,
    // {
    //   title: 'Creative Coding Experiments',
    //   description: 'Interactive visualizations and generative art pieces.',
    //   tech: ['p5.js', 'WebGL', 'Canvas API']
    // }
    // ,
    // {
    //   title: 'Design System Kit',
    //   description: 'A reusable design system for consistent UI across products.',
    //   tech: ['Figma', 'Tokens', 'CSS']
    // },
    // {
    //   title: 'Mobile Habit App',
    //   description: 'A simple habit tracking app focused on minimal UX.',
    //   tech: ['React Native', 'TypeScript']
    // }
  ];
  
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
        'Key screens showcasing the app\'s proactive assistance, transparency, and customizable interface.'
      );

      const annotationContainer = createElement('div', 'annotation-container');

      // First annotated image
      const firstItem = createElement('div', 'annotation-item');
      const baseImage = createElement('img', 'annotation-image') as HTMLImageElement;
      baseImage.src = '/image/p1/assistant-home.png';
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

      secondImage.src = '/image/p1/assistant-context.png';
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
      thirdImage.src = '/image/p1/assistant-agenda.png';
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
      fourthImage.src = '/image/p1/assistant-news.png';
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
      fifthImage.src = '/image/p1/assistant-share.png';
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
      sixthImage.src = '/image/p1/assistant-summary.png';
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
        'annotation-title',
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
      architectureImage.src = '/image/p1/assistant-architecture-3.png';
      architectureImage.alt =
        'System architecture diagram for the personal AI assistant';
      architectureImageWrapper.appendChild(architectureImage);

      const architectureNote = createElement('p', 'architecture-note');
      architectureNote.innerHTML = 'For full code of all three submodules, see the GitHub repositories: <a href="https://github.com/RepeatingEmu772/mook-pai" target="_blank" rel="noopener noreferrer">frontend</a>, <a href="https://github.com/RepeatingEmu772/pai-service" target="_blank" rel="noopener noreferrer">backend</a>, <a href="https://github.com/RepeatingEmu772/runpod" target="_blank" rel="noopener noreferrer">inference</a>';

      appendChildren(
        architectureBlock,
        architectureTitle,
        architectureSubtitle,
        architectureImageWrapper,
        architectureNote
      );
      projectCard.appendChild(architectureBlock);

      const annotationBlock2 = createElement('div', 'annotation-block');

      const annotationSubtitle2 = createElement(
        'p',
        'annotation-subtitle',
        '**Note: The external app functionality shown in the 5th screenshot is simulated for demonstration purposes only and is not part of the actual app implementation.**'
      );

      const futureWorkTitle = createElement(
        'h4',
        'annotation-title',
        'Future Work'
      );
      
      const futureWorkIntro = createElement('p', 'future-work-intro',
        'Future improvements that can make this project better:'
      );
      
      const futureWorkList = createElement('ol', 'future-work-list');
      
      const futureItem1 = createElement('li', 'future-work-item', 
        'Deeper integration with other external apps (calendar, reminders, email, notes) for a seemless user experience.'
      );
      const futureItem2 = createElement('li', 'future-work-item',
        'Improving Vector DB retrieval to provide more relevant context faster.'
      );
      const futureItem3 = createElement('li', 'future-work-item',
        'Wider variety of runtime widget cards that can be tailored to unique user needs.'
      );
      
      appendChildren(futureWorkList, futureItem1, futureItem2, futureItem3);

      appendChildren(
        annotationBlock2,
        annotationSubtitle2,
        futureWorkTitle,
        futureWorkIntro,
        futureWorkList
      );
      projectCard.appendChild(annotationBlock2);
    }

    // Project 2 - ProPosterous with wide-format images
    if (idx === 1) {
      const annotationBlock = createElement('div', 'annotation-block');

      const annotationTitle = createElement(
        'h4',
        'annotation-title',
        'Visual Walkthrough'
      );
      const annotationSubtitle = createElement(
        'p',
        'annotation-subtitle',
        'See how users and AI collaborate on the canvas to create stunning poster designs.'
      );

      const wideImageContainer = createElement('div', 'wide-image-container');

      // First wide image
      const wideImage1 = createElement('div', 'wide-image-item');
      const image1 = createElement('img', 'wide-image') as HTMLImageElement;
      image1.src = '/image/p2/arcade-1.png';
      image1.alt = 'Canvas interface overview';
      const caption1 = createElement('p', 'image-caption', 'Interactive canvas with Diffusion model powered design and real-time collaboration. Freely edit and move around text generated by LLM.');
      appendChildren(wideImage1, image1, caption1);

      // Second wide image
      const wideImage2 = createElement('div', 'wide-image-item');
      const image2 = createElement('img', 'wide-image') as HTMLImageElement;
      image2.src = '/image/p2/cake-complete.png';
      image2.alt = 'AI suggestion panel';
      const caption2 = createElement('p', 'image-caption', 'Iteratively refine designs by prompting the AI for specific edits while maintaining full control over layout and text placement');
      appendChildren(wideImage2, image2, caption2);

      // Third wide image
      const wideImage3 = createElement('div', 'wide-image-item');
      const image3 = createElement('img', 'wide-image') as HTMLImageElement;
      image3.src = '/image/p2/wine-1.png';
      image3.alt = 'Final poster design';
      const caption3 = createElement('p', 'image-caption', 'Wanna do it yourself? Freely add text. Seamless iteration between human creativity and AI assistance produces polished results');
      appendChildren(wideImage3, image3, caption3);

      appendChildren(wideImageContainer, wideImage1, wideImage2, wideImage3);
      appendChildren(annotationBlock, annotationTitle, annotationSubtitle, wideImageContainer);
      projectCard.appendChild(annotationBlock);

      // System Architecture for Project 2
      const architectureBlock = createElement('div', 'architecture-block');

      const architectureTitle = createElement(
        'h4',
        'architecture-title',
        'System Architecture'
      );
      const architectureSubtitle = createElement(
        'p',
        'architecture-subtitle',
        'High-level diagram showing how the TLDraw (Canvas) interacts with Zustand, API router and Runpod Inference.'
      );

      const architectureImageWrapper = createElement(
        'div',
        'architecture-image-wrapper'
      );
      const architectureImage = createElement(
        'img',
        'architecture-image'
      ) as HTMLImageElement;
      architectureImage.src = '/image/p2/poster-arch.png';
      architectureImage.alt = 'System architecture diagram for ProPosterous collaborative canvas';
      architectureImageWrapper.appendChild(architectureImage);

      const architectureNote = createElement('p', 'architecture-note');
      architectureNote.innerHTML = 'For full code, see the GitHub repositories: <a href="https://github.com/RepeatingEmu772/poster-ui" target="_blank" rel="noopener noreferrer">web app</a>, <a href="https://github.com/RepeatingEmu772/poster-runpod" target="_blank" rel="noopener noreferrer">inference</a>';

      appendChildren(
        architectureBlock,
        architectureTitle,
        architectureSubtitle,
        architectureImageWrapper,
        architectureNote
      );
      projectCard.appendChild(architectureBlock);

      // Future Work for Project 2
      const annotationBlock2 = createElement('div', 'annotation-block');

      const futureWorkTitle = createElement(
        'h4',
        'annotation-title',
        'Future Work'
      );
      
      const futureWorkIntro = createElement('p', 'future-work-intro',
        'Future improvements that can make this project better:'
      );
      
      const futureWorkList = createElement('ol', 'future-work-list');
      
      const futureItem1 = createElement('li', 'future-work-item', 
        'Autonomy to switch between using different diffusion models for varied artistic styles or even use custom models by uploading safetensors or huggingface links.'
      );
      const futureItem2 = createElement('li', 'future-work-item',
        'Ability to generate and edit numerous poster designs and styles together in through a single prompt'
      );
      const futureItem3 = createElement('li', 'future-work-item',
        'Multi-user collaboration where multiple users can work on the same canvas in real-time.'
      );
      
      appendChildren(futureWorkList, futureItem1, futureItem2, futureItem3);
      appendChildren(annotationBlock2, futureWorkTitle, futureWorkIntro, futureWorkList);
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
    numberList.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList.contains('number-item')) return;
      const selected = target.textContent ? parseInt(target.textContent, 10) : NaN;
      if (isNaN(selected)) return;

      applyFilter(selected);
      
      // Scroll to the top of the selected project card
      setTimeout(() => {
        const activeCard = page.querySelector(`[data-index="${selected}"]`);
        if (activeCard) {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });

    // Check for hash in URL to show specific project
    const hash = window.location.hash;
    const projectNumber = hash ? parseInt(hash.substring(1), 10) : 1;
    const initialProject = (!isNaN(projectNumber) && projectNumber >= 1 && projectNumber <= numbers.length) ? projectNumber : 1;
    
    applyFilter(initialProject);
    
    // Scroll to the selected project card
    setTimeout(() => {
      const activeCard = page.querySelector(`[data-index="${initialProject}"]`);
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

    // arrow navigation logic
    const clamp = (v: number) => Math.max(1, Math.min(numbers.length, v));
    prevBtn.addEventListener('click', () => {
      const active = page.querySelector('.number-item.active');
      const cur = active ? parseInt(active.textContent || '1', 10) : 1;
      const newIndex = clamp(cur - 1);
      applyFilter(newIndex);
      
      // Scroll to the top of the new project
      setTimeout(() => {
        const activeCard = page.querySelector(`[data-index="${newIndex}"]`);
        if (activeCard) {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
    nextBtn.addEventListener('click', () => {
      const active = page.querySelector('.number-item.active');
      const cur = active ? parseInt(active.textContent || '1', 10) : 1;
      const newIndex = clamp(cur + 1);
      applyFilter(newIndex);
      
      // Scroll to the top of the new project
      setTimeout(() => {
        const activeCard = page.querySelector(`[data-index="${newIndex}"]`);
        if (activeCard) {
          activeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    });
  }

  return page;
}
