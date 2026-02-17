import { loadContent } from '../utils/contentLoader';

// Glob imports for markdown files
const projectModules = import.meta.glob('/src/content/projects/*.md', { as: 'raw', eager: true });
const blogModules = import.meta.glob('/src/content/blogs/*.md', { as: 'raw', eager: true });
const serviceModules = import.meta.glob('/src/content/services/*.md', { as: 'raw', eager: true });

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
