import { createElement, appendChildren } from '../utils/dom';

export function createBlogPage(): HTMLElement {
  const page = createElement('div', 'page blog-page');

  const header = createElement('section', 'page-header');
  const title = createElement('h1', 'page-title', 'Blog');
  const subtitle = createElement('p', 'page-subtitle', 'Thoughts, notes, and short posts');
  appendChildren(header, title, subtitle);

  const content = createElement('section', 'page-content');

  // Placeholder while we load the blog text
  const loading = createElement('p', 'section-content', 'Loading blog post...');
  content.appendChild(loading);

  appendChildren(page, header, content);

  // Load blog content from the public/blog directory (post1.txt)
  // We keep this async so the handler can return immediately and populate later
  (async () => {
    try {
      const res = await fetch('/blog/post1.txt');
      if (!res.ok) throw new Error('Failed to load blog post');
      const text = await res.text();

      // Replace loading text with formatted blog content
      content.innerHTML = '';

      const article = createElement('article', 'blog-article');
      // preserve whitespace/newlines using a <pre> for now
      const pre = createElement('pre', 'blog-pre', text);
      appendChildren(article, pre);
      content.appendChild(article);
    } catch (err) {
      content.innerHTML = '';
      const errMsg = createElement('p', 'section-content', 'Unable to load blog post.');
      content.appendChild(errMsg);
      console.error('Error loading blog post:', err);
    }
  })();

  return page;
}
