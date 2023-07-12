'use client';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
  split,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';

function makeClient() {
  const cache = new NextSSRInMemoryCache();
  const httpLink: ApolloLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_ENDPOINT,
  });

  // RSC
  if (typeof window === "undefined")
    return new NextSSRApolloClient({
      cache: cache,
      link: httpLink,
    });

  // RCC
  const wsLink = new WebSocketLink(
    new SubscriptionClient(String(process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT))
  );
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('userToken');
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
    authLink.concat(ApolloLink.from([
      new SSRMultipartLink({ stripDefer: true, }),
      httpLink,
    ])),
  );

  return new NextSSRApolloClient({
    cache: cache,
    link: splitLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

function GraphQLClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  )
};

export default GraphQLClientProvider;
