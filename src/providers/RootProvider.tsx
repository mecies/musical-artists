import { FC } from 'react';

import { ApolloProvider } from './ApolloProvider';
import { ReduxProvider } from './ReduxProvider';
import { ThemeProvider } from './ThemeProvider';

const RootProvider: FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ReduxProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export { RootProvider };
