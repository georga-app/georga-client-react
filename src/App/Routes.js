import { useContext, Fragment } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import UserContext from '../Context/User';

// Admin
import AdminFields from '../Pages/Admin/Fields';
import AdminMessages from '../Pages/Admin/Messages';
import AdminOperations from '../Pages/Admin/Operations';
import AdminOrganizations from '../Pages/Admin/Organizations';
import AdminParticipants from '../Pages/Admin/Participants';
import AdminPersons from '../Pages/Admin/Persons';
import AdminProjects from '../Pages/Admin/Projects';
import AdminQualifications from '../Pages/Admin/Qualifications';
import AdminResources from '../Pages/Admin/Resources';
import AdminRestrictions from '../Pages/Admin/Restrictions';
import AdminShifts from '../Pages/Admin/Shifts';
import AdminTasks from '../Pages/Admin/Tasks';

// Anonymous
import Activate from '../Pages/Anonymous/Activate';
import Feedback from '../Pages/Anonymous/Feedback';
import Home from '../Pages/Anonymous/Home';
import Imprint from '../Pages/Anonymous/Imprint';
import Login from '../Pages/Anonymous/Login';
import Register from '../Pages/Anonymous/Register';

// Helper
import Messages from '../Pages/Helper/Messages';
import Mission from '../Pages/Helper/Mission';
import Schedule from '../Pages/Helper/Schedule';

// Demos
import Demos from '../Pages/Demos';

// User
import Account from '../Pages/User/Account';
import Help from '../Pages/User/Help';
import Logout from '../Pages/User/Logout';


function AppRoutes() {
  const user = useContext(UserContext);
  return (
    <Routes>

      {/******************************* BACKEND *******************************************/}
      {user.isLoggedIn ? <>

        {/* root */}
        <Route exact path="/"                 element={ <Navigate to="/schedule" replace /> } />

        {/* user */}
        <Route path="/account"                element={ <Account />                         } />
        <Route path="/help"                   element={ <Help />                            } />
        <Route path="/logout"                 element={ <Logout />                          } />

        {/* helper */}
        <Route path="/schedule"               element={ <Schedule />                        } />
        <Route path="/mission"                element={ <Mission />                         } />
        <Route path="/messages"               element={ <Messages />                        } />

        {/* organization admin */}
        { user.hasAdminLevel("ORGANIZATION") && <>
          <Route path="/admin/organizations"  element={ <AdminOrganizations />              } />
          <Route path="/admin/fields"         element={ <AdminFields />                     } />
          <Route path="/admin/qualifications" element={ <AdminQualifications />             } />
          <Route path="/admin/restrictions"   element={ <AdminRestrictions />               } />
          <Route path="/admin/resources"      element={ <AdminResources />                  } />
          <Route path="/admin/persons"        element={ <AdminPersons />                    } />
          <Route path="/admin/messages"       element={ <AdminMessages />                   } />
        </>}

        {/* project admin */}
        { user.hasAdminLevel("PROJECT") && <>
          <Route path="/admin/projects"       element={ <AdminProjects />                   } />
        </>}

        {/* operations admin */}
        { user.hasAdminLevel("OPERATION") && <>
          <Route path="/admin/operations"     element={ <AdminOperations />                 } />
          <Route path="/admin/tasks"          element={ <AdminTasks />                      } />
          <Route path="/admin/shifts"         element={ <AdminShifts />                     } />
          <Route path="/admin/participants"   element={ <AdminParticipants />               } />
        </>}

        {/* footer */}
        <Route path="/imprint"                element={ <Imprint />                         } />
        <Route path="/feedback"               element={ <Feedback />                        } />

        {/* debug */}
        <Route path="/demos"                  element={ <Demos />                           } />

        {/* fallback */}
        <Route path="*"                       element={ <Navigate to="/" replace />         } />

      {/******************************* FRONTEND ******************************************/}
      </> : <>

        {/* root */}
        <Route exact path="/"           element={ <Home />                                  } />

        {/* user */}
        <Route path="/register"         element={ <Register />                              } />
        <Route path="/login"            element={ <Login />                                 } />
        <Route path="/activate/:token"  element={ <Activate />                              } />

        {/* footer */}
        <Route path="/imprint"          element={ <Imprint />                               } />
        <Route path="/feedback"         element={ <Feedback />                              } />

        {/* fallback */}
        <Route path="*"                 element={ <Navigate to="/" replace />               } />

      </>};
    </Routes>
  );
}

export default AppRoutes;
