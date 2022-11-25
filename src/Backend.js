import { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import UserContext from './User';

import Schedule from './Pages/Schedule';
import Mission from './Pages/Mission';
import Messages from './Pages/Messages';

import Account from './Pages/Account';
import Help from './Pages/Help';
import PersonLogoutFlow from './Components/Models/PersonLogoutFlow';

import AdminFields from './Pages/Admin/Fields';
import AdminMessages from './Pages/Admin/Messages';
import AdminOperations from './Pages/Admin/Operations';
import AdminOrganizations from './Pages/Admin/Organizations';
import AdminParticipants from './Pages/Admin/Participants';
import AdminPersons from './Pages/Admin/Persons';
import AdminProjects from './Pages/Admin/Projects';
import AdminQualifications from './Pages/Admin/Qualifications';
import AdminResources from './Pages/Admin/Resources';
import AdminRestrictions from './Pages/Admin/Restrictions';
import AdminShifts from './Pages/Admin/Shifts';
import AdminTasks from './Pages/Admin/Tasks';

import Demos from './Pages/Demos';

import Imprint from './Pages/Imprint';
import Feedback from './Pages/Feedback';

const menus = {
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
};

function Backend() {
  const user = useContext(UserContext)
  return (
    <Routes>
      {/* root */}
      <Route exact path="/"                 element={ <Navigate to="/schedule" replace />     } />

      {/* user */}
      <Route path="/account"                element={ <Account              menus={menus} />  } />
      <Route path="/help"                   element={ <Help                 menus={menus} />  } />
      <Route path="/logout"                 element={ <PersonLogoutFlow     menus={menus} />  } />

      {/* helper */}
      <Route path="/schedule"               element={ <Schedule             menus={menus} />  } />
      <Route path="/mission"                element={ <Mission              menus={menus} />  } />
      <Route path="/messages"               element={ <Messages             menus={menus} />  } />

      {/* organization admin */}
      { user.hasAdminLevel("ORGANIZATION") && <>
        <Route path="/admin/organizations"  element={ <AdminOrganizations  menus={menus} />   } />
        <Route path="/admin/fields"         element={ <AdminFields         menus={menus} />   } />
        <Route path="/admin/qualifications" element={ <AdminQualifications menus={menus} />   } />
        <Route path="/admin/restrictions"   element={ <AdminRestrictions   menus={menus} />   } />
        <Route path="/admin/resources"      element={ <AdminResources      menus={menus} />   } />
        <Route path="/admin/persons"        element={ <AdminPersons        menus={menus} />   } />
        <Route path="/admin/messages"       element={ <AdminMessages       menus={menus} />   } />
      </>}

      {/* project admin */}
      { user.hasAdminLevel("PROJECT") && <>
        <Route path="/admin/projects"       element={ <AdminProjects       menus={menus} />   } />
      </>}

      {/* operations admin */}
      { user.hasAdminLevel("OPERATION") && <>
        <Route path="/admin/operations"     element={ <AdminOperations     menus={menus} />   } />
        <Route path="/admin/tasks"          element={ <AdminTasks          menus={menus} />   } />
        <Route path="/admin/shifts"         element={ <AdminShifts         menus={menus} />   } />
        <Route path="/admin/participants"   element={ <AdminParticipants   menus={menus} />   } />
      </>}

      {/* footer */}
      <Route path="/imprint"                element={ <Imprint            menus={menus} />    } />
      <Route path="/feedback"               element={ <Feedback           menus={menus} />    } />

      {/* debug */}
      <Route path="/demos"                  element={ <Demos              menus={menus} />    } />

      {/* fallback */}
      <Route path="*"                       element={ <Navigate to="/" replace />             } />
    </Routes>
  );
}

export default Backend;
