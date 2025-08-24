export type RouteHandler = () => HTMLElement;

export interface Route {
  path: string;
  handler: RouteHandler;
  title?: string;
}

export class Router {
  private routes: Map<string, Route> = new Map();
  private currentRoute: string = '';
  private contentContainer: HTMLElement;

  constructor(contentContainer: HTMLElement) {
    this.contentContainer = contentContainer;
    this.init();
  }

  private init(): void {
    // Listen for navigation events
    window.addEventListener('popstate', () => this.handleRoute());
    
  }

  // Start handling routes after routes have been registered
  public start(): void {
    this.handleRoute();
  }

  public addRoute(route: Route): void {
    this.routes.set(route.path, route);
  }

  public navigate(path: string): void {
    if (path === this.currentRoute) return;
    
    console.log('Navigating to:', path);
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  private handleRoute(): void {
    let path = window.location.pathname;
    
    // Handle root path
    if (path === '/') {
      path = '/home';
    }
    
    console.log('Handling route:', path);
    const route = this.routes.get(path);

    if (route) {
      this.currentRoute = path;
      this.renderRoute(route);
    } else {
      console.log('Route not found for', path);
      // If the requested path isn't found, try redirecting to /home only
      // if we're not already trying to load /home. This avoids a redirect
      // loop when routes haven't been registered or /home is missing.
      if (path !== '/home') {
        console.log('Redirecting to /home');
        this.navigate('/home');
      } else {
        console.error('Home route is missing - cannot render content.');
      }
    }
  }

  private renderRoute(route: Route): void {
    console.log('Rendering route:', route);
    // Clear current content
    this.contentContainer.innerHTML = '';
    
    // Update document title
    if (route.title) {
      document.title = route.title;
    }
    
    // Render new content
    try {
      const content = route.handler();
      this.contentContainer.appendChild(content);
      console.log('Route rendered successfully');
    } catch (error) {
      console.error('Error rendering route:', error);
    }
  }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }
}
