/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
'use client';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
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

// see https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
let localStorage: Storage = (typeof window !== "undefined") ? window.localStorage : {
  length: 0,
  key: () => null,
  clear: () => undefined,
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};

function makeClient() {
  const cache = new NextSSRInMemoryCache();
  const httpUri = !!parseInt(localStorage.getItem("emulator") || "")
    ? "http://10.0.2.2/graphql"
    : process.env.NEXT_PUBLIC_GRAPHQL_HTTP_ENDPOINT;
  const httpLink: ApolloLink = new HttpLink({
    uri: httpUri,
  });

  // RSC
  if (typeof window === "undefined")
    return new NextSSRApolloClient({
      cache: cache,
      link: httpLink,
    });

  // RCC
  const wsUri = !!parseInt(localStorage.getItem("emulator") || "")
    ? "ws://10.0.2.2/graphql"
    : String(process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT);
  const wsLink = new WebSocketLink(
    new SubscriptionClient(wsUri)
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

function GraphQLClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} >
      {children}
    </ApolloNextAppProvider>
  )
};

export default GraphQLClientProvider;
