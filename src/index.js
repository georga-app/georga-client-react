import { createRoot } from 'react-dom/client';
import { ApolloClient, split, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { gql } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import "@fontsource/roboto";

import App from './App';

// apollo client
const cache = new InMemoryCache();
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_ENDPOINT,
});
const wsLink = new WebSocketLink(
  new SubscriptionClient(process.env.REACT_APP_GRAPHQL_WS_ENDPOINT)
);
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink),
);
const client = new ApolloClient({
  link: splitLink,
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
