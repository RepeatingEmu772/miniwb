import { createElement } from '../utils/dom';

export function createFooter(): HTMLElement {
  const footer = createElement('footer', 'site-footer');
  
  const currentYear = new Date().getFullYear();
  const footerText = createElement('p', 'footer-text', 
    `© ${currentYear} Manan Mrig. All rights reserved.`
  );
  
  footer.appendChild(footerText);
  
  return footer;
}
