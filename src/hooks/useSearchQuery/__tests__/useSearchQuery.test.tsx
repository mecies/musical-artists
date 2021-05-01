import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';
import { uiModule } from 'store/reducers/ui';

import { useSearchQuery } from '../useSearchQuery';

describe('useBreadcrumbs hook', () => {
  const store = createStore(
    combineReducers({
      ui: uiModule.reducer,
    }),
  );

  const searchQuery = '123';
  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

  it('should set search query and not set debounced search query immediately', async () => {
    const { result } = renderHook(() => useSearchQuery(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setSearchQuery(searchQuery);
    });

    expect(store.getState().ui.searchQuery).toEqual(searchQuery);
    expect(result.current.debouncedSearchQuery).toEqual('');
  });
});
