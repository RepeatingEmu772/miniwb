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

  // Add social media icons section
  const socialSection = createElement('div', 'nav-social');
  
  const githubLink = createElement('a', 'social-icon') as HTMLAnchorElement;
  githubLink.href = 'https://github.com/RepeatingEmu772';
  githubLink.target = '_blank';
  githubLink.rel = 'noopener noreferrer';
  githubLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`;
  githubLink.setAttribute('aria-label', 'GitHub');
  
  const linkedinLink = createElement('a', 'social-icon') as HTMLAnchorElement;
  linkedinLink.href = 'https://www.linkedin.com/in/manan-mrig/';
  linkedinLink.target = '_blank';
  linkedinLink.rel = 'noopener noreferrer';
  linkedinLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
  linkedinLink.setAttribute('aria-label', 'LinkedIn');
  
  const emailLink = createElement('a', 'social-icon') as HTMLAnchorElement;
  emailLink.href = 'mailto:mmrig4@gmail.com';
  emailLink.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
  emailLink.setAttribute('aria-label', 'Email');
  
  appendChildren(socialSection, githubLink, linkedinLink, emailLink);
  appendChildren(nav, navList, socialSection);

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
