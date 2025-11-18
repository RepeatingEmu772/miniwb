import { createElement, appendChildren } from '../utils/dom';

export function createEducationPage(): HTMLElement {
  const page = createElement('div', 'page education-page');
  
  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Education');
  const subtitle = createElement('p', 'page-subtitle', 'Academic journey and professional experiences');
  
  appendChildren(header, title, subtitle);
  
  const content = createElement('section', 'page-content');
  
  // Education items
  const education = [
    {
      institution: 'University of Minnesota, Twin Cities',
      degree: 'Bachelor of Engineering',
      field: 'Computer Science',
      period: '2020 - 2024',
      description: 'Focused on software engineering, algorithms, and system design.'
    },
    {
      institution: 'Coursera',
      degree: 'Interaction Design Specialization - UC San Diego',
      field: 'HCI',
      period: '2025',
      description: 'Human-centered design training focused on prototyping, usability, and intuitive digital experiences.'
    }
  ];
  
  education.forEach(edu => {
    const eduCard = createElement('div', 'education-card');
    
    const institution = createElement('h3', 'education-institution', edu.institution);
    const degree = createElement('h4', 'education-degree', `${edu.degree} - ${edu.field}`);
    const period = createElement('p', 'education-period', edu.period);
    const description = createElement('p', 'education-description', edu.description);
    
    appendChildren(eduCard, institution, degree, period, description);
    content.appendChild(eduCard);
  });
  
  appendChildren(page, header, content);
  
  return page;
}
