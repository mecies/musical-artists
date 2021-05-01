import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';
import { artistModule } from 'store/reducers/artist';
import { ARTIST } from 'utils/mockTestData';

import { useFavouriteArtists } from '../useFavouriteArtists';

describe('useFavouriteArtists hook', () => {
  const store = createStore(
    combineReducers({
      artist: artistModule.reducer,
    }),
  );

  const Wrapper: FC = ({ children }) => <Provider store={store}>{children}</Provider>;

  it('should add artist to favourites', async () => {
    const { result } = renderHook(() => useFavouriteArtists(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.addFavouriteArtist(ARTIST);
    });

    expect(store.getState().artist.favouriteArtists).toEqual([ARTIST]);
  });

  it('should remove artist from favourites', async () => {
    const { result } = renderHook(() => useFavouriteArtists(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.addFavouriteArtist(ARTIST);
      result.current.removeFavouriteArtist(ARTIST);
    });

    expect(store.getState().artist.favouriteArtists).toEqual([]);
  });
});
