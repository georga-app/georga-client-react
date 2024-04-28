/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { AccountProfileIcon } from '@/theme/Icons';
import { AccountOrganizationsIcon } from '@/theme/Icons';
import { AccountQualificationsIcon } from '@/theme/Icons';
import { AccountNotificationsIcon } from '@/theme/Icons';
import { AccountSecurityIcon } from '@/theme/Icons';

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
    account: [],
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
      // { path: '/admin/resources',
      //     type: 'link', name: 'Resources', adminLevel: 'ORGANIZATION' },

      { type: 'divider', adminLevel: 'ORGANIZATION' },
      { path: '/admin/staff',
          type: 'link', name: 'Staff', adminLevel: 'ORGANIZATION' },
      { path: '/admin/messages',
          type: 'link', name: 'Messages', adminLevel: 'ORGANIZATION' },
    ],
    footer: [
      { path: '/imprint',
          type: 'link', name: 'Imprint' },
      { path: '/feedback',
          type: 'link', name: 'Feedback' },
    ],
    account: [
      { path: '/account/profile',
          type: 'link', name: 'Profile', icon: <AccountProfileIcon />,
          description: "Change your personal data" },
      { path: '/account/organizations',
          type: 'link', name: 'Organizations', icon: <AccountOrganizationsIcon />,
          description: "Subscribe to organizations" },
      { path: '/account/qualifications',
          type: 'link', name: 'Qualifications', icon: <AccountQualificationsIcon />,
          description: "Manage your qualifications and restrictions" },
      // { path: '/account/notifications',
      //     type: 'link', name: 'Notifications', icon: <AccountNotificationsIcon />,
      //     description: "Configure your notifications channels" },
      // { path: '/account/security',
      //     type: 'link', name: 'Security', icon: <AccountSecurityIcon />,
      //     description: "Add security to your login" },
    ],
  },
};

export default menus;
