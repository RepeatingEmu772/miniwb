import { createElement, appendChildren } from '../utils/dom';

export function createPlacesPage(): HTMLElement {
  const page = createElement('div', 'page places-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Places');
  const subtitle = createElement('p', 'page-subtitle', 'Photography and stories from travels around the world');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content');

  // Add number list below the content (1-5)
  const numberList = createElement('div', 'number-list');
  const numbers = [1,2,3,4,5];
  numbers.forEach(num => {
    const numberItem = createElement('span', 'number-item', num.toString());
    numberList.appendChild(numberItem);
  });

  // Places content
  const places = [
    {
      location: 'Tokyo, Japan',
      description: 'A city where tradition meets cutting-edge technology. Inspiring architecture and design everywhere.',
      year: '2023'
    },
    {
      location: 'Reykjavik, Iceland',
      description: 'Minimalist design philosophy reflected in the landscape and culture. Clean lines and natural beauty.',
      year: '2022'
    },
    {
      location: 'Copenhagen, Denmark',
      description: 'Scandinavian design at its finest. Functional beauty and sustainable living practices.',
      year: '2023'
    },
    {
      location: 'Lisbon, Portugal',
      description: 'Sunlit streets and ceramic tiles. A calm, aesthetic city with great food.',
      year: '2021'
    },
    {
      location: 'Vancouver, Canada',
      description: 'Coastal, green, and designed around nature. Strong architecture and outdoor life.',
      year: '2020'
    }
  ];

  places.forEach((place, idx) => {
    const placeCard = createElement('div', 'place-card');
    placeCard.setAttribute('data-index', String(idx + 1));

    const location = createElement('h3', 'place-location', place.location);
    const year = createElement('span', 'place-year', place.year);
    const description = createElement('p', 'place-description', place.description);

    appendChildren(placeCard, location, year, description);
    content.appendChild(placeCard);
  });

  // controls wrapper
  const controls = createElement('div', 'number-controls');
  const prevBtn = createElement('div', 'number-button prev');
  // arrow with dash after the arrow
  prevBtn.innerHTML = `<span class="icon">◀</span><span>prev</span>`;
  const nextBtn = createElement('div', 'number-button next');
  // dash before the arrow
  nextBtn.innerHTML = `<span>next</span><span class="icon">▶</span>`;
  appendChildren(controls, prevBtn, numberList, nextBtn);

  appendChildren(page, header, content, controls);

  // Hook up number filtering
  const numberItems = page.querySelectorAll('.number-item');
  const cards = content.querySelectorAll<HTMLElement>('.place-card');

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
