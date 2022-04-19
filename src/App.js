import { useLayoutEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import "@fontsource/roboto";

import Frontend from './Frontend';
import Backend from './Backend';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function App() {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <Router>
      {data.isLoggedIn ? <Backend /> : <Frontend />}
    </Router>
  )
}

export default App;
