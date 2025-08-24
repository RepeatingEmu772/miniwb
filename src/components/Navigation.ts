import { NavigationItem } from '../types';
import { createElement } from '../utils/dom';

export class Navigation {
  private element: HTMLElement;
  private onNavigate?: (path: string) => void;
  
  constructor(private items: NavigationItem[], onNavigate?: (path: string) => void) {
    this.onNavigate = onNavigate;
    this.element = this.createNavigation();
  }

  private createNavigation(): HTMLElement {
    const nav = createElement('nav', 'navigation');
    
    const list = createElement('ul', 'nav-list');
    
    this.items.forEach(item => {
      const listItem = createElement('li', 'nav-item');
      
      if (item.href) {
        const link = createElement('a', 'nav-link', item.label);
        link.href = item.href;
        link.addEventListener('click', (e) => this.handleNavClick(e, item.href!));
        listItem.appendChild(link);
      } else {
        // Home link (name)
        const link = createElement('a', 'nav-link nav-home', item.label);
        link.href = '/home';
        link.addEventListener('click', (e) => this.handleNavClick(e, '/home'));
        listItem.appendChild(link);
      }
      
      list.appendChild(listItem);
    });
    
    nav.appendChild(list);
    return nav;
  }

  private handleNavClick(event: Event, path: string): void {
    event.preventDefault();
    if (this.onNavigate) {
      // Remove # from path if present
      const cleanPath = path.startsWith('#') ? path.substring(1) : path;
      // Ensure path starts with /
      const routePath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
      this.onNavigate(routePath);
    }
  }

  public updateActiveLink(currentPath: string): void {
    console.log('Updating active link for path:', currentPath);
    
    // Remove active class from all links
    const links = this.element.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('active'));
    
    // Add active class to current link
    const activeLink = Array.from(links).find(link => {
      const href = (link as HTMLAnchorElement).href;
      const linkPath = href.split('/').pop() || 'home';
      const cleanCurrentPath = currentPath.replace('/', '') || 'home';
      
      console.log('Comparing linkPath:', linkPath, 'with cleanCurrentPath:', cleanCurrentPath);
      
      return linkPath === cleanCurrentPath || (cleanCurrentPath === 'home' && !href.includes('#'));
    });
    
    if (activeLink) {
      activeLink.classList.add('active');
      console.log('Active link set:', activeLink);
    } else {
      console.log('No matching link found for path:', currentPath);
    }
  }

  public render(): HTMLElement {
    return this.element;
  }
}
