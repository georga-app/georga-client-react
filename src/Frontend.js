import { Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import PersonActivateFlow from './Components/Models/PersonActivateFlow';
import Imprint from './Pages/Imprint';
import Feedback from './Pages/Feedback';

const menus = {
  main: [
    { path: '/register', name: 'Register' },
    { path: '/login', name: 'Login' },
  ],
  footer: [
    { path: '/imprint', name: 'Imprint' },
    { path: '/feedback', name: 'Feedback' },
  ],
};

function Frontend() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home menus={menus} /> } />
      <Route path="/register" element={ <Register menus={menus} /> }/>
      <Route path="/login" element={ <Login menus={menus}/> } />
      <Route path="/activate/:token" element={ <PersonActivateFlow /> } />
      <Route path="/imprint" element={ <Imprint menus={menus} /> } />
      <Route path="/feedback" element={ <Feedback menus={menus} /> } />
    </Routes>
  );
}

export default Frontend;
