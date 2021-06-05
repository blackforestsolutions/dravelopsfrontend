import { HttpLink } from 'apollo-angular/http';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

export const createGraphQlConnection = (httpLink: HttpLink, host: string, port: number): ApolloClientOptions<unknown> => {
  const http = httpLink.create({
    uri: `http://${host}:${port}/graphql`
  });

  const ws = new WebSocketLink({
    uri: `ws://${host}:${port}/subscriptions`,
    options: {
      reconnect: true
    }
  });

  const link = split(
    ({ query }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  };
};
