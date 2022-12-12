const menus = {
  frontend: {
    main: [
      { path: '/register',              name: 'Register'                                      },
      { path: '/login',                 name: 'Login'                                         },
    ],
    footer: [
      { path: '/imprint',               name: 'Imprint'                                       },
      { path: '/feedback',              name: 'Feedback'                                      },
    ],
  },
  backend: {
    main: [
      { path: '/schedule',              name: 'Schedule'                                      },
      { path: '/mission',               name: 'Mission'                                       },
      { path: '/messages',              name: 'Messages'                                      },
    ],
    user: [
      { path: '/account',               name: 'Account'                                       },
      { path: '/help',                  name: 'Help'                                          },
      { path: '/logout',                name: 'Logout'                                        },
    ],
    admin: [
      { path: '/admin/organizations',   name: 'Organizations',    adminLevel: 'ORGANIZATION'  },
      { path: '/admin/projects',        name: 'Projects',         adminLevel: 'PROJECT'       },
      { path: '/admin/operations',      name: 'Operations',       adminLevel: 'OPERATION'     },
      { path: '/admin/tasks',           name: 'Tasks',            adminLevel: 'OPERATION'     },
      { path: '/admin/shifts',          name: 'Shifts',           adminLevel: 'OPERATION'     },
      { path: '/admin/participants',    name: 'Participants',     adminLevel: 'OPERATION'     },

      { divider: true,                                            adminLevel: 'ORGANIZATION'  },
      { path: '/admin/fields',          name: 'Fields',           adminLevel: 'ORGANIZATION'  },
      { path: '/admin/qualifications',  name: 'Qualifications',   adminLevel: 'ORGANIZATION'  },
      { path: '/admin/restrictions',    name: 'Restrictions',     adminLevel: 'ORGANIZATION'  },
      { path: '/admin/resources',       name: 'Resources',        adminLevel: 'ORGANIZATION'  },

      { divider: true,                                            adminLevel: 'ORGANIZATION'  },
      { path: '/admin/persons',         name: 'Persons',          adminLevel: 'ORGANIZATION'  },
      { path: '/admin/messages',        name: 'Messages',         adminLevel: 'ORGANIZATION'  },
    ],
    footer: [
      { path: '/imprint',               name: 'Imprint'                                       },
      { path: '/feedback',              name: 'Feedback'                                      },
    ],
  },
};

export default menus;
