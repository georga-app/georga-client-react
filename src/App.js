import { useLayoutEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

import Frontend from './Frontend';
import Backend from './Backend';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function ScrollToTop({children}) {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function App() {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <Router>
      <ScrollToTop />
      {data.isLoggedIn ? <Backend /> : <Frontend />}
    </Router>
  )
}

export default App;
