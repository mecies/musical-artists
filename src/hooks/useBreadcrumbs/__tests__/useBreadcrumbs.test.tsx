import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';
import { uiModule } from 'store/reducers/ui';
import { ARTIST_MBID, RELEASE_MBID } from 'utils/mockTestData';

import { useBreadcrumbs } from '../useBreadcrumbs';

describe('useBreadcrumbs hook', () => {
  const store = createStore(
    combineReducers({
      ui: uiModule.reducer,
    }),
  );

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
      result.current.setArtistPage(ARTIST_MBID);
    });

    expect(store.getState().ui.artistMbid).toEqual(ARTIST_MBID);
    expect(store.getState().ui.releaseMbid).toEqual('');
  });

  it('should set release page', async () => {
    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setReleasePage(ARTIST_MBID, RELEASE_MBID);
    });

    expect(store.getState().ui.artistMbid).toEqual(ARTIST_MBID);
    expect(store.getState().ui.releaseMbid).toEqual(RELEASE_MBID);
  });
});
