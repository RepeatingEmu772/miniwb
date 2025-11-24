import { createElement, appendChildren } from '../utils/dom';

export function createPlacesPage(): HTMLElement {
  const page = createElement('div', 'page places-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Scenes');
  const subtitle = createElement('p', 'page-subtitle', 'Scenes that live rent free in my heart');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content');

  // Places data - 31 locations with their years
  const places = [
    { location: 'Minneapolis', year: '2021' },
    { location: 'Chicago', year: '2022' },
    { location: 'Dubai', year: '2025' },
    { location: 'Kendrick Lamar & SZA', year: '2025' },
    { location: 'Dubai', year: '2025' },
    { location: 'Detroit', year: '2025' },
    { location: 'Minneapolis', year: '2024' },
    { location: 'Minneapolis', year: '2022' },
    { location: 'New Delhi', year: '2022' },
    { location: 'Minneapolis', year: '2024' },
    { location: 'Santa Cruz', year: '2022' },
    { location: 'Dubai', year: '2025' },
    { location: 'Delhi', year: '2025' },
    { location: 'Dubai', year: '2025' },
    { location: 'Detroit', year: '2025' },
    { location: 'Lake of the Isles', year: '2025' },
    { location: 'Detroit', year: '2025' },
    { location: 'My first solo apartment', year: '2025' },
    { location: 'Kendrick Lamar', year: '2023' },
    { location: 'Baby Keem', year: '2023' },
    { location: 'SZA', year: '2025' },
    { location: 'Playing Smash Bros at work', year: '2025' },
    { location: 'Ferrari World', year: '2025' },
    { location: 'St. Paul', year: '2022' },
    { location: 'Kendrick Lamar', year: '2023' },
    { location: 'Minneapolis', year: '2023' },
    { location: 'Minneapolis', year: '2025' },
    { location: 'Wisconsin', year: '2022' },
    { location: 'Minneapolis', year: '2023' },
    { location: 'Dubai', year: '2025' },
    { location: 'Minneapolis', year: '2021' }
  ];

  // Create place cards with images
  places.forEach((place, idx) => {
    const placeCard = createElement('div', 'place-card');
    placeCard.setAttribute('data-index', String(idx + 1));

    // Image container
    const imageWrapper = createElement('div', 'place-image-wrapper');
    
    // Add left and right click zones
    const leftZone = createElement('div', 'image-nav-zone left-zone');
    const rightZone = createElement('div', 'image-nav-zone right-zone');
    
    const image = createElement('img', 'place-image') as HTMLImageElement;
    image.src = `/image/scenes/${idx + 1}.jpeg`;
    image.alt = place.location;
    image.loading = 'lazy';
    
    appendChildren(imageWrapper, leftZone, image, rightZone);

    // Info overlay
    const placeInfo = createElement('div', 'place-info');
    const location = createElement('h3', 'place-location', place.location);
    const year = createElement('span', 'place-year', place.year);
    appendChildren(placeInfo, location, year);

    appendChildren(placeCard, imageWrapper, placeInfo);
    content.appendChild(placeCard);
  });

  // Number list for navigation (1-31)
  const numberList = createElement('div', 'number-list');
  const numbers = Array.from({ length: 31 }, (_, i) => i + 1);
  numbers.forEach(num => {
    const numberItem = createElement('span', 'number-item', num.toString());
    numberList.appendChild(numberItem);
  });

  // Controls wrapper
  const controls = createElement('div', 'number-controls');
  const prevBtn = createElement('div', 'number-button prev');
  prevBtn.innerHTML = `<span class="icon">◀</span><span>prev</span>`;
  const nextBtn = createElement('div', 'number-button next');
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

    // Initialize with index 1 active
    applyFilter(1);

    // Arrow navigation logic
    const clamp = (v: number) => Math.max(1, Math.min(numbers.length, v));
    
    const navigateToPrev = () => {
      const active = page.querySelector('.number-item.active');
      const cur = active ? parseInt(active.textContent || '1', 10) : 1;
      applyFilter(clamp(cur - 1));
    };
    
    const navigateToNext = () => {
      const active = page.querySelector('.number-item.active');
      const cur = active ? parseInt(active.textContent || '1', 10) : 1;
      applyFilter(clamp(cur + 1));
    };
    
    prevBtn.addEventListener('click', navigateToPrev);
    nextBtn.addEventListener('click', navigateToNext);
    
    // Add click handlers to image zones
    const leftZones = page.querySelectorAll('.left-zone');
    const rightZones = page.querySelectorAll('.right-zone');
    
    leftZones.forEach(zone => {
      zone.addEventListener('click', navigateToPrev);
    });
    
    rightZones.forEach(zone => {
      zone.addEventListener('click', navigateToNext);
    });
  }
  
  return page;
}
