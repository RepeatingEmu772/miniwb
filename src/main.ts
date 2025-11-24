import './style.css';
import { createNavigation } from './components/Navigation';
import { createFooter } from './components/Footer';
import { createThemeSwitcher } from './components/ThemeSwitcher';
import { Router } from './utils/router';
import { createElement, appendChildren } from './utils/dom';
import type { NavigationItem } from './types';
import { 
  createHomePage, 
  createProjectsPage, 
  createSkillsPage, 
  createYoutubePage, 
  createPlacesPage
} from './pages';

console.log('DOM loaded, starting app...');

const navigationItems: NavigationItem[] = [
  { label: 'Manan Mrig', path: '/' },
  { label: 'projects', path: '/projects' },
  { label: 'skills', path: '/skills' },
  { label: 'youtube', path: '/youtube' },
  { label: 'places', path: '/places' },
  { label: 'academic cv', path: '/cv.pdf' },
  { label: 'professional resume', path: '/resume.pdf' }
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

  const themeSwitcher = createThemeSwitcher();
  const main = createElement('main', 'main-content');
  const footer = createFooter();

  router.addRoute('/', () => {
    console.log('Rendering home page');
    return createHomePage();
  });

  router.addRoute('/projects', () => {
    console.log('Rendering projects page');
    return createProjectsPage();
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

  console.log('Routes added');

  appendChildren(app, themeSwitcher, navigation, main, footer);
  console.log('App elements appended');

  router.start();
  console.log('Router started');
}

document.addEventListener('DOMContentLoaded', initApp);
