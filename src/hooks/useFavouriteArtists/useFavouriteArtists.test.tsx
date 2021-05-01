import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';
import { Artist } from 'models';
import { artistModule } from 'store/reducers/artist';

import { useFavouriteArtists } from './useFavouriteArtists';

describe('useFavouriteArtists hook', () => {
  const artist: Artist = {
    mbid: '7b24231e-faa5-4838-b6a8-6a2eb2727b37',
    name: 'KSI',
    country: 'GB',
    releases: {
      nodes: [
        {
          title: 'Lighter',
          mbid: 'f7e385e0-8cde-43d6-818d-990a19b0850e',
          date: '2020-07-24',
          country: 'XW',
        },
      ],
    },
  };

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
      result.current.addFavouriteArtist(artist);
    });

    expect(store.getState().artist.favouriteArtists).toEqual([artist]);
  });

  it('should remove artist from favourites', async () => {
    const { result } = renderHook(() => useFavouriteArtists(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.addFavouriteArtist(artist);
      result.current.removeFavouriteArtist(artist);
    });

    expect(store.getState().artist.favouriteArtists).toEqual([]);
  });
});
