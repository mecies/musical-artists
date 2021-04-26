import React, { FC } from 'react';
import { ApolloClient, ApolloProvider as Provider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com/',
  cache: new InMemoryCache(),
});

const ApolloProvider: FC = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};

export { ApolloProvider };
