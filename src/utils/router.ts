import type { Route } from '../types';

export class Router {
  private routes: Map<string, Route> = new Map();
  private mainContent: HTMLElement | null = null;

  constructor() {
    console.log('Router constructor called');
    window.addEventListener('popstate', () => {
      console.log('Popstate event triggered');
      this.handleRoute();
    });
  }

  addRoute(path: string, handler: Route): void {
    console.log(`Adding route: ${path}`);
    this.routes.set(path, handler);
  }

  start(): void {
    console.log('Router start() called');
    this.mainContent = document.querySelector('.main-content');
    if (!this.mainContent) {
      console.error('Main content element not found!');
      return;
    }
    this.handleRoute();
  }

  navigate(path: string): void {
    console.log(`Navigating to: ${path}`);
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  private handleRoute(): void {
    const path = window.location.pathname;
    console.log(`Handling route: ${path}`);
    
    const route = this.routes.get(path);
    
    if (route) {
      this.renderRoute(route);
    } else {
      console.log(`Route not found for ${path}`);
      // Redirect to home (/) instead of /home
      if (path !== '/') {
        console.log('Redirecting to /');
        this.navigate('/');
      } else {
        console.error('Home route (/) is missing - cannot render content.');
      }
    }
  }

  private renderRoute(route: Route): void {
    if (!this.mainContent) {
      console.error('Main content not available');
      return;
    }

    console.log('Rendering route:', route);
    
    try {
      const content = route();
      this.mainContent.innerHTML = '';
      this.mainContent.appendChild(content);
      
      // Update navigation active state
      const links = document.querySelectorAll('.nav-link');
      links.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === window.location.pathname) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
      
      console.log('Route rendered successfully');
    } catch (error) {
      console.error('Error rendering route:', error);
      this.mainContent.innerHTML = '<div class="error">Failed to load page</div>';
    }
  }
}
