import { FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Artist } from 'models';
import { artistModule } from 'store/reducers/artist';

import { ArtistCard } from './ArtistCard';

describe('ArtistCard component', () => {
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

  const ArtistCardWrapped: FC = () => (
    <Provider store={store}>
      <ArtistCard artist={artist} />
    </Provider>
  );

  it('should display artist name', () => {
    render(<ArtistCardWrapped />, { wrapper: MemoryRouter });

    const artistName = screen.getByText(artist.name);
    expect(artistName.textContent).toEqual(artist.name);
  });

  it("should display artist's release", () => {
    render(<ArtistCardWrapped />, { wrapper: MemoryRouter });
    const release = artist.releases?.nodes[0].title;

    if (release) {
      const artistRelease = screen.getByText(release);
      expect(artistRelease.textContent).toEqual(release);
    }
  });

  it('should add artist to favourites on button click', () => {
    render(<ArtistCardWrapped />, { wrapper: MemoryRouter });

    const addToFavouritesButton = screen.getByText(/add to favourites/i);

    act(() => {
      fireEvent(
        addToFavouritesButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    expect(store.getState().artist.favouriteArtists).toEqual([artist]);
  });

  it('should remove artist from favourites on button click', () => {
    render(<ArtistCardWrapped />, { wrapper: MemoryRouter });

    const removeFromFavouritesButton = screen.getByText(/remove from favourites/i);

    act(() => {
      fireEvent(
        removeFromFavouritesButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    expect(store.getState().artist.favouriteArtists).toEqual([]);
  });
});
