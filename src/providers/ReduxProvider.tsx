import { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';

const ReduxProvider: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { ReduxProvider };
