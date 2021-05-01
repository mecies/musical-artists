import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';
import { uiModule } from 'store/reducers/ui';

import { useBreadcrumbs } from './useBreadcrumbs';

describe('useBreadcrumbs hook', () => {
  const store = createStore(
    combineReducers({
      ui: uiModule.reducer,
    }),
  );

  const mbid = 'mbid';
  const releaseMbid = 'releaseMbid';
  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

  it('should set home page', async () => {
    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setHomePage();
    });

    expect(store.getState().ui.artistMbid).toEqual('');
    expect(store.getState().ui.releaseMbid).toEqual('');
  });

  it('should set artist page', async () => {
    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setArtistPage(mbid);
    });

    expect(store.getState().ui.artistMbid).toEqual(mbid);
    expect(store.getState().ui.releaseMbid).toEqual('');
  });

  it('should set release page', async () => {
    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setReleasePage(mbid, releaseMbid);
    });

    expect(store.getState().ui.artistMbid).toEqual(mbid);
    expect(store.getState().ui.releaseMbid).toEqual(releaseMbid);
  });
});
