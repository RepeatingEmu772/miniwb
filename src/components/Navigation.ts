import { createElement, appendChildren } from '../utils/dom';
import type { NavigationItem } from '../types';

export function createNavigation(
  items: NavigationItem[],
  currentPath: string,
  onNavigate: (path: string) => void
): HTMLElement {
  const nav = createElement('nav', 'navigation');
  const navList = createElement('ul', 'nav-list');

  items.forEach((item) => {
    const listItem = createElement('li', 'nav-item');
    const link = createElement('a', 'nav-link');
    
    if (item.path === '/') {
      link.classList.add('nav-home');
    }
    
    if (currentPath === item.path) {
      link.classList.add('active');
    }

    link.textContent = item.label;
    link.href = item.path;

    // Check if it's a PDF link (external file)
    const isPDF = item.path.endsWith('.pdf');
    
    if (isPDF) {
      // For PDF links, open in new tab
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    } else {
      // For regular pages, use the router
      link.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate(item.path);
        
        // Close mobile menu when clicking a link
        const navigation = document.querySelector('.navigation');
        const hamburger = document.querySelector('.hamburger');
        if (navigation && hamburger) {
          navigation.classList.remove('active');
          hamburger.classList.remove('active');
        }
      });
    }

    listItem.appendChild(link);
    navList.appendChild(listItem);
  });

  appendChildren(nav, navList);

  // hamburger menu 
  const existingHamburger = document.querySelector('.hamburger');
  if (!existingHamburger) {
    const hamburger = createElement('button', 'hamburger');
    hamburger.setAttribute('aria-label', 'Toggle menu');
    
    const hamburgerIcon = createElement('div', 'hamburger-icon');
    hamburgerIcon.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    hamburger.appendChild(hamburgerIcon);

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const navigation = document.querySelector('.navigation');
      if (navigation) {
        navigation.classList.toggle('active');
        hamburger.classList.toggle('active');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const navigation = document.querySelector('.navigation');
      const currentHamburger = document.querySelector('.hamburger');
      
      if (navigation && currentHamburger && 
          !navigation.contains(target) && 
          !currentHamburger.contains(target)) {
        navigation.classList.remove('active');
        currentHamburger.classList.remove('active');
      }
    });

    // Wait for DOM to be ready before appending
    if (document.body) {
      document.body.appendChild(hamburger);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(hamburger);
      });
    }
  }

  return nav;
}

export function updateNavigation(currentPath: string): void {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
