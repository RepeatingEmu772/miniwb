import { Section as SectionType } from '../types';
import { createElement, createSection, appendChildren } from '../utils/dom';

export class Section {
  private element: HTMLElement;

  constructor(private data: SectionType) {
    this.element = this.createSection();
  }

  private createSection(): HTMLElement {
    const section = createSection(this.data.id, 'content-section');
    
    const title = createElement('h2', 'section-title', this.data.title);
    const content = createElement('div', 'section-content');
    content.innerHTML = this.data.content;
    
    appendChildren(section, title, content);
    
    return section;
  }

  public render(): HTMLElement {
    return this.element;
  }
}
