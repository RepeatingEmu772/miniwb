import { createElement, appendChildren } from '../utils/dom';

export function createPlacesPage(): HTMLElement {
  const page = createElement('div', 'page places-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Places');
  const subtitle = createElement('p', 'page-subtitle', 'Photography and stories from travels around the world');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content');
  
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
    }
  ];
  
  places.forEach(place => {
    const placeCard = createElement('div', 'place-card');
    
    const location = createElement('h3', 'place-location', place.location);
    const year = createElement('span', 'place-year', place.year);
    const description = createElement('p', 'place-description', place.description);
    
    appendChildren(placeCard, location, year, description);
    content.appendChild(placeCard);
  });
  
  appendChildren(page, header, content);
  
  return page;
}
