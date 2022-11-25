import { Routes, Route, Navigate } from "react-router-dom";

// import Dashboard from './Pages/Dashboard'
import Schedule from './Pages/Schedule'
import Mission from './Pages/Mission'
import Messages from './Pages/Messages'
import Demos from './Pages/Demos'

import Account from './Pages/Account'
import Help from './Pages/Help'
import PersonLogoutFlow from './Components/Models/PersonLogoutFlow'

import Imprint from './Pages/Imprint'
import Feedback from './Pages/Feedback'

const menus = {
  main: [
    { path: '/schedule', name: 'Schedule' },
    { path: '/mission', name: 'Mission' },
    { path: '/messages', name: 'Messages' },
  ],
  user: [
    { path: '/account', name: 'Account' },
    { path: '/help', name: 'Help' },
    { path: '/logout', name: 'Logout' },
  ],
  admin: [
    { path: '/organization', name: 'Organization', adminLevel: 'ORGANIZATION' },
    { path: '/project', name: 'Project', adminLevel: 'PROJECT' },
  ],
  footer: [
    { path: '/imprint', name: 'Imprint' },
    { path: '/feedback', name: 'Feedback' },
  ],
};

function Backend() {
  return (
    <Routes>
      {/* root */}
      <Route exact path="/" element={ <Navigate to="/schedule" replace /> } />

      {/* user */}
      <Route path="/account" element={ <Account menus={menus} /> } />
      <Route path="/help" element={ <Help menus={menus} /> } />
      <Route path="/logout" element={ <PersonLogoutFlow menus={menus} /> } />

      {/* helper */}
      <Route path="/schedule" element={ <Schedule menus={menus} /> } />
      <Route path="/mission" element={ <Mission menus={menus} /> } />
      <Route path="/messages" element={ <Messages menus={menus} /> } />

      {/* footer */}
      <Route path="/imprint" element={ <Imprint menus={menus} /> } />
      <Route path="/feedback" element={ <Feedback menus={menus} /> } />

      {/* debug */}
      <Route path="/demos" element={ <Demos menus={menus} /> } />

      {/* fallback */}
      <Route path="*" element={ <Navigate to="/" replace /> } />
    </Routes>
  );
}

export default Backend;
