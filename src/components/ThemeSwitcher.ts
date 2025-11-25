import { createElement, appendChildren } from '../utils/dom';

export function createThemeSwitcher(): HTMLElement {
  const themeSwitcher = createElement('div', 'theme-switcher');
  
  const themeLabel = createElement('span', 'theme-label', 'Theme:');
  
  const lightBtn = createElement('button', 'theme-btn');
  lightBtn.setAttribute('data-theme', 'light');
  lightBtn.textContent = 'Light';
  
  const darkBtn = createElement('button', 'theme-btn');
  darkBtn.setAttribute('data-theme', 'dark');
  darkBtn.textContent = 'Dark';
  
  const gradientBtn = createElement('button', 'theme-btn active');
  gradientBtn.setAttribute('data-theme', 'gradient');
  gradientBtn.textContent = 'Gradient';
  
  appendChildren(themeSwitcher, themeLabel, lightBtn, darkBtn, gradientBtn);
  
  // Theme switching logic
  const applyTheme = (theme: string) => {
    const body = document.body;
    const html = document.documentElement;
    
    // Remove all theme classes from both html and body
    body.classList.remove('theme-light', 'theme-dark', 'theme-gradient');
    html.classList.remove('theme-light', 'theme-dark', 'theme-gradient');
    
    // Add the selected theme class to both html and body
    body.classList.add(`theme-${theme}`);
    html.classList.add(`theme-${theme}`);
    
    // Update active button
    themeSwitcher.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    themeSwitcher.querySelector(`[data-theme="${theme}"]`)?.classList.add('active');
    
    // Save to localStorage
    localStorage.setItem('preferred-theme', theme);
  };
  
  // Event listeners
  [lightBtn, darkBtn, gradientBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      if (theme) applyTheme(theme);
    });
  });
  
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('preferred-theme') || 'dark';
  applyTheme(savedTheme);
  
  return themeSwitcher;
}
