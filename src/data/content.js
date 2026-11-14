import { loadContent } from '../utils/contentLoader';

// Front matter only (see the md-frontmatter-only plugin in vite.config.js):
// listings need titles, dates and summaries, not the article bodies.
const projectModules = import.meta.glob('/src/content/projects/*.md', { query: '?frontmatter', import: 'default', eager: true });
const blogModules = import.meta.glob('/src/content/blogs/*.md', { query: '?frontmatter', import: 'default', eager: true });
const serviceModules = import.meta.glob('/src/content/services/*.md', { query: '?frontmatter', import: 'default', eager: true });

// Export the parsed data
export const projectData = loadContent(projectModules, 'projects');
export const blogsData = loadContent(blogModules, 'blogs');
export const servicesData = loadContent(serviceModules, 'services');

// Default export for backward compatibility if needed
export default {
    projects: projectData,
    blogs: blogsData,
    services: servicesData
};
