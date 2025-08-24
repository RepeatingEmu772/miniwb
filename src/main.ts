import './style.css';
import { Navigation } from './components/Navigation';
import { NavigationItem } from './types';
import { createElement, appendChildren } from './utils/dom';
import { Router } from './utils/router';

// Page imports
import { createHomePage } from './pages/HomePage';
import { createProjectsPage } from './pages/ProjectsPage';
import { createEducationPage } from './pages/EducationPage';
import { createSkillsPage } from './pages/SkillsPage';
import { createYoutubePage } from './pages/YoutubePage';
import { createPlacesPage } from './pages/PlacesPage';
import { createBlogPage } from './pages/BlogPage';

// Personal information - update these with your details
const personalInfo = {
  name: 'Manan Mrig',
  role: 'Student and Engineer',
  bio: 'I create meaningful digital experiences through thoughtful design and clean code. Currently focused on building tools that help me work better.'
};

// Navigation items
const navigationItems: NavigationItem[] = [
  { id: 'home', label: personalInfo.name }, // This will be the home link
  { id: 'projects', label: 'projects', href: '#projects' },
  { id: 'education', label: 'education', href: '#education' },
  { id: 'skills', label: 'skills', href: '#skills' },
  { id: 'youtube', label: 'youtube', href: '#youtube' },
  { id: 'places', label: 'places', href: '#places' },
  { id: 'blog', label: 'blog', href: '#blog' },
];

let navigation: Navigation;
let router: Router;

// Initialize the application
function initApp(): void {
  console.log('Initializing app...');
  const app = document.getElementById('app');
  if (!app) {
    console.error('App element not found!');
    return;
  }

  // Create main content container
  const mainContent = createElement('div', 'main-content');
  console.log('Created main content container');
  
  // Initialize router with main content container
  router = new Router(mainContent);
  console.log('Router initialized');
  
  // Add routes
  router.addRoute({
    path: '/home',
    handler: createHomePage,
    title: `${personalInfo.name} - Home`
  });
  
  router.addRoute({
    path: '/projects',
    handler: createProjectsPage,
    title: `Projects - ${personalInfo.name}`
  });
  
  router.addRoute({
    path: '/education',
    handler: createEducationPage,
    title: `Education - ${personalInfo.name}`
  });
  
  router.addRoute({
    path: '/skills',
    handler: createSkillsPage,
    title: `Skills - ${personalInfo.name}`
  });
  
  router.addRoute({
    path: '/youtube',
    handler: createYoutubePage,
    title: `YouTube - ${personalInfo.name}`
  });
  
  router.addRoute({
    path: '/places',
    handler: createPlacesPage,
    title: `Places - ${personalInfo.name}`
  });

  router.addRoute({
    path: '/blog',
    handler: createBlogPage,
    title: `Blog - ${personalInfo.name}`
  });

  console.log('Routes added');

  // Create navigation with router callback
  navigation = new Navigation(navigationItems, (path: string) => {
    console.log('Navigation clicked:', path);
    router.navigate(path);
    navigation.updateActiveLink(path);
  });

  console.log('Navigation created');

  // Append navigation and main content to app
  appendChildren(app, navigation.render(), mainContent);
  console.log('App elements appended');
  
  // Start the router now that routes are registered and DOM is mounted
  router.start();

  // Set initial active link after router starts
  setTimeout(() => {
    const currentRoute = router.getCurrentRoute() || window.location.pathname || '/home';
    console.log('Setting initial active link for route:', currentRoute);
    navigation.updateActiveLink(currentRoute);
  }, 50);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting app...');
  try {
    initApp();
  } catch (error) {
    console.error('Error initializing app:', error);
    // Fallback: show a simple message
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '<div style="padding: 2rem; font-family: Inter, sans-serif;"><h1>Loading...</h1><p>If this message persists, check the console for errors.</p></div>';
    }
  }
});
