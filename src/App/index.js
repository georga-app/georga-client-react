import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";

import "@fontsource/roboto";

import GraphQLClient from './GraphQLClient';
import { UserContextProvider as User } from '../Context/User';
import Theme from '../Theme';
import Routes from './Routes';

function App() {
  return (
    <StrictMode>
      <Router>
        <GraphQLClient>
          <User>
            <Theme>
              <Routes />
            </Theme>
          </User>
        </GraphQLClient>
      </Router>
    </StrictMode>
  )
}

export default App;
