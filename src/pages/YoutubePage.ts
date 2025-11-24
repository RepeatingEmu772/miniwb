import { createElement, appendChildren } from '../utils/dom';

export function createYoutubePage(): HTMLElement {
  const page = createElement('div', 'page youtube-page work-in-progress');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'YouTube');
  const subtitle = createElement('p', 'page-subtitle', 'Bridging the gap between academia and enthusiasts');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content wip-content');
  
  // Under construction image
  const wipImage = createElement('img', 'wip-image') as HTMLImageElement;
  wipImage.src = '/image/under-construction.gif';
  wipImage.alt = 'Under Construction';
  
  // Message
  const wipMessage = createElement('p', 'wip-message', 'This page is a work in progress. Come back later!');
  
  appendChildren(content, wipImage, wipMessage);
  appendChildren(page, header, content);
  
  return page;
}
