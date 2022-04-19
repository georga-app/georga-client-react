import { createRoot } from 'react-dom/client';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import "@fontsource/roboto";

import App from './App';

// apollo client
const cache = new InMemoryCache();
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

// local states
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

// root
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
