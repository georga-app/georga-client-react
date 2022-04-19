import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { gql } from '@apollo/client';
import "@fontsource/roboto";

import App from './App';

// apollo
const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;
const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: endpoint,
  cache: cache,
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("authToken") || "";
    if (token)
      operation.setContext({
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
  },
});

// flags
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem("authToken"),
  },
});

// render
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
