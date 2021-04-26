import React, { FC } from 'react';

import { ApolloProvider } from './ApolloProvider';
import { ThemeProvider } from './ThemeProvider';

const RootProvider: FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
};

export { RootProvider };
