/**
 * Primary navigation, shared by the desktop bar and the mobile drawer.
 */
export const NAV_ITEMS = [
    { to: '/', label: 'Home', match: (path) => path === '/' },
    { to: '/about', label: 'About', match: (path) => path === '/about' },
    { to: '/service', label: 'Solutions', match: (path) => path.startsWith('/service') },
    { to: '/project', label: 'Work', match: (path) => path.startsWith('/project') },
    { to: '/team', label: 'Team', match: (path) => path.startsWith('/team') },
    { to: '/careers', label: 'Careers', match: (path) => path.startsWith('/careers') },
    { to: '/blog', label: 'Insights', match: (path) => path.startsWith('/blog') },
];

export default NAV_ITEMS;
