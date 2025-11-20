import './style.css';
import { createNavigation } from './components/Navigation';
import { Router } from './utils/router';
import { createElement, appendChildren } from './utils/dom';
import type { NavigationItem } from './types';
import { 
  createHomePage, 
  createProjectsPage, 
  createEducationPage, 
  createSkillsPage, 
  createYoutubePage, 
  createPlacesPage,
  createBlogPage
} from './pages';

console.log('DOM loaded, starting app...');

const navigationItems: NavigationItem[] = [
  { label: 'Manan Mrig', path: '/' },
  { label: 'education & experience', path: '/education' },
  { label: 'projects', path: '/projects' },
  { label: 'skills', path: '/skills' },
  { label: 'youtube', path: '/youtube' },
  { label: 'places', path: '/places' },
  { label: 'blog', path: '/blog' }
];

function initApp() {
  console.log('Initializing app...');
  const app = document.querySelector<HTMLElement>('#app');
  if (!app) {
    console.error('App container not found!');
    return;
  }

  const router = new Router();
  console.log('Router initialized');

  const navigation = createNavigation(
    navigationItems,
    window.location.pathname,
    (path: string) => router.navigate(path)
  );
  console.log('Navigation created');

  const main = createElement('main', 'main-content');

  router.addRoute('/', () => {
    console.log('Rendering home page');
    return createHomePage();
  });

  router.addRoute('/projects', () => {
    console.log('Rendering projects page');
    return createProjectsPage();
  });

  router.addRoute('/education', () => {
    console.log('Rendering education page');
    return createEducationPage();
  });

  router.addRoute('/skills', () => {
    console.log('Rendering skills page');
    return createSkillsPage();
  });

  router.addRoute('/youtube', () => {
    console.log('Rendering youtube page');
    return createYoutubePage();
  });

  router.addRoute('/places', () => {
    console.log('Rendering places page');
    return createPlacesPage();
  });

  router.addRoute('/blog', () => {
    console.log('Rendering blog page');
    return createBlogPage();
  });

  console.log('Routes added');

  appendChildren(app, navigation, main);
  console.log('App elements appended');

  router.start();
  console.log('Router started');
}

document.addEventListener('DOMContentLoaded', initApp);
