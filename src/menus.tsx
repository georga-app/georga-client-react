/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import Menus from '@/types/Menus'

const menus: Menus = {
  frontend: {
    main: [
      { path: '/register',
          type: 'link', name: 'Register' },
      { path: '/login',
          type: 'link', name: 'Login' },
    ],
    user: [],
    admin: [],
    footer: [
      { path: '/imprint',
          type: 'link', name: 'Imprint' },
      { path: '/feedback',
          type: 'link', name: 'Feedback' },
    ],
  },
  backend: {
    main: [
      { path: '/schedule',
          type: 'link', name: 'Schedule' },
      { path: '/mission',
          type: 'link', name: 'Mission' },
      { path: '/messages',
          type: 'link', name: 'Messages' },
    ],
    user: [
      { path: '/account',
          type: 'link', name: 'Account' },
      { path: '/help',
          type: 'link', name: 'Help' },
      { path: '/logout',
          type: 'link', name: 'Logout' },
    ],
    admin: [
      { path: '/admin/organizations',
          type: 'link', name: 'Organizations', adminLevel: 'ORGANIZATION' },
      { path: '/admin/projects',
          type: 'link', name: 'Projects', adminLevel: 'PROJECT' },
      { path: '/admin/operations',
          type: 'link', name: 'Operations', adminLevel: 'OPERATION' },
      { path: '/admin/tasks',
          type: 'link', name: 'Tasks', adminLevel: 'OPERATION' },
      { path: '/admin/shifts',
          type: 'link', name: 'Shifts', adminLevel: 'OPERATION' },
      { path: '/admin/participants',
          type: 'link', name: 'Participants', adminLevel: 'OPERATION' },

      { type: 'divider', adminLevel: 'ORGANIZATION' },
      { path: '/admin/fields',
          type: 'link', name: 'Fields', adminLevel: 'ORGANIZATION' },
      { path: '/admin/qualifications',
          type: 'link', name: 'Qualifications', adminLevel: 'ORGANIZATION' },
      { path: '/admin/restrictions',
          type: 'link', name: 'Restrictions', adminLevel: 'ORGANIZATION' },
      { path: '/admin/resources',
          type: 'link', name: 'Resources', adminLevel: 'ORGANIZATION' },

      { type: 'divider', adminLevel: 'ORGANIZATION' },
      { path: '/admin/persons',
          type: 'link', name: 'Persons', adminLevel: 'ORGANIZATION' },
      { path: '/admin/messages',
          type: 'link', name: 'Messages', adminLevel: 'ORGANIZATION' },
    ],
    footer: [
      { path: '/imprint',
          type: 'link', name: 'Imprint' },
      { path: '/feedback',
          type: 'link', name: 'Feedback' },
    ],
  },
};

export default menus;
