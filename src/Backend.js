import { Routes, Route } from "react-router-dom";

import Dashboard from './Pages/Dashboard'
import Actions from './Pages/Actions'
import Instructions from './Pages/Instructions'
import Tools from './Pages/Tools'
import Notes from './Pages/Notes'

import Account from './Pages/Account'
import Help from './Pages/Help'
import Logout from './Components/Auth/Logout'

import Imprint from './Pages/Imprint'
import Feedback from './Pages/Feedback'

const menus = {
  main: [
    { path: '/actions', name: 'Actions' },
    { path: '/instructions', name: 'Instructions' },
    { path: '/tools', name: 'Tools' },
    { path: '/notes', name: 'Notes' },
  ],
  user: [
    { path: '/account', name: 'Account' },
    { path: '/help', name: 'Help' },
    { path: '/logout', name: 'Logout' },
  ],
  footer: [
    { path: '/imprint', name: 'Imprint' },
    { path: '/feedback', name: 'Feedback' },
  ],
};

function Backend() {
  return (
    <Routes>
      <Route exact path="/" element={ <Dashboard menus={menus} /> } />
      <Route path="/logout" element={ <Logout menus={menus} /> } />
      <Route path="/actions" element={ <Actions menus={menus} /> } />
      <Route path="/instructions" element={ <Instructions menus={menus} /> } />
      <Route path="/tools" element={ <Tools menus={menus} /> } />
      <Route path="/account" element={ <Account menus={menus} /> } />
      <Route path="/help" element={ <Help menus={menus} /> } />
      <Route path="/notes" element={ <Notes menus={menus} /> } />
      <Route path="/imprint" element={ <Imprint menus={menus} /> } />
      <Route path="/feedback" element={ <Feedback menus={menus} /> } />
    </Routes>
  );
}

export default Backend;
