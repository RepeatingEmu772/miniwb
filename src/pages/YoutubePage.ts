import { createElement, appendChildren } from '../utils/dom';

export function createYoutubePage(): HTMLElement {
  const page = createElement('div', 'page youtube-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'YouTube');
  const subtitle = createElement('p', 'page-subtitle', 'Videos and tutorials about development and technology');
  
  appendChildren(header, title, subtitle);
  
  // Add number list under header (moved from home page)
  const numberList = createElement('div', 'number-list');
  const numbers = [1,2,3,4,5];
  numbers.forEach(num => {
    const numberItem = createElement('span', 'number-item', num.toString());
    numberList.appendChild(numberItem);
  });
  // append number list after the content (we'll append later)
  
  const content = createElement('section', 'page-content');
  
  // YouTube content - you can replace with actual video data
  const videos = [
    {
      title: 'Building Modern Web Applications',
      description: 'A comprehensive guide to creating web apps with TypeScript and modern frameworks.',
      views: '12.5K views',
      duration: '25:30'
    },
    {
      title: 'Clean Code Principles',
      description: 'How to write maintainable and readable code that scales.',
      views: '8.2K views',
      duration: '18:45'
    },
    {
      title: 'Design Systems in Practice',
      description: 'Creating consistent and scalable design systems for web applications.',
      views: '15.1K views',
      duration: '32:10'
    },
    {
      title: 'Performance Optimization Tips',
      description: 'Practical tips for improving web performance.',
      views: '5.9K views',
      duration: '12:05'
    },
    {
      title: 'TypeScript Patterns',
      description: 'Helpful patterns and practices when using TypeScript at scale.',
      views: '9.4K views',
      duration: '22:40'
    }
  ];

  videos.forEach((video, i) => {
    const videoCard = createElement('div', 'video-card');
    // assign a data-index for filtering using the loop index
    const idx = i + 1;
    videoCard.setAttribute('data-index', String(idx));

    const videoTitle = createElement('h3', 'video-title', video.title);
    const videoDesc = createElement('p', 'video-description', video.description);

    const videoMeta = createElement('div', 'video-meta');
    const views = createElement('span', 'video-views', video.views);
    const duration = createElement('span', 'video-duration', video.duration);

    appendChildren(videoMeta, views, duration);
    appendChildren(videoCard, videoTitle, videoDesc, videoMeta);
    content.appendChild(videoCard);
  });
  
  appendChildren(page, header, content, numberList);

  // Hook up number filtering (same behavior as projects)
  const numberItems = page.querySelectorAll('.number-item');
  const cards = content.querySelectorAll<HTMLElement>('.video-card');

  const applyFilter = (selected: number | null) => {
    numberItems.forEach(n => {
      const val = parseInt(n.textContent || '0', 10);
      if (selected !== null && val === selected) n.classList.add('active');
      else n.classList.remove('active');
    });

    cards.forEach(card => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      if (selected === null) card.style.display = '';
      else card.style.display = idx === selected ? '' : 'none';
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
