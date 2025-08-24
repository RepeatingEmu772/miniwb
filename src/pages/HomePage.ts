import { createElement, appendChildren } from '../utils/dom';

export function createHomePage(): HTMLElement {
  console.log('Creating home page...');
  
  const page = createElement('div', 'page home-page');
  
  const hero = createElement('section', 'hero');
  
  const title = createElement('h1', 'hero-title', 'Manan Mrig');
  const subtitle = createElement('p', 'hero-subtitle', 'Student and Engineer');
  const bio = createElement('p', 'hero-bio', 'I create meaningful digital experiences through thoughtful design and clean code. Currently focused on building tools that help me work better.');
  appendChildren(hero, title, subtitle, bio);
  page.appendChild(hero);
  
  console.log('Home page created successfully');
  return page;
}
