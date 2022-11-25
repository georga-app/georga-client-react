import { useLayoutEffect, useContext } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

import Frontend from './Frontend';
import Backend from './Backend';
import UserContext from './User';

function ScrollToTop({children}) {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function App() {
  const user = useContext(UserContext);

  return (
    <Router>
      <ScrollToTop />
      {user.isLoggedIn ? <Backend /> : <Frontend />}
    </Router>
  )
}

export default App;
