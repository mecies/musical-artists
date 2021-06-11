import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { artistModule } from 'store/reducers/artist';
import { ARTIST } from 'utils/mockTestData';

import { ArtistCard } from '../ArtistCard';

describe('ArtistCard component', () => {
  const store = createStore(
    combineReducers({
      artist: artistModule.reducer,
    }),
  );

  const ArtistCardWrapped: FC = () => (
    <Provider store={store}>
      <ArtistCard artist={ARTIST} />
    </Provider>
  );

  it('should display artist name', () => {
    render(<ArtistCardWrapped />);

    const artistName = screen.getByText(ARTIST.name);
    expect(artistName.textContent).toEqual(ARTIST.name);
  });

  it("should display artist's release", () => {
    render(<ArtistCardWrapped />);
    const release = ARTIST.releases?.nodes[0].title;

    if (release) {
      const artistRelease = screen.getByText(release);
      expect(artistRelease.textContent).toEqual(release);
    }
  });

  it('should add artist to favourites on button click', () => {
    render(<ArtistCardWrapped />);

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

    expect(store.getState().artist.favouriteArtists).toEqual([ARTIST]);
  });

  it('should remove artist from favourites on button click', () => {
    render(<ArtistCardWrapped />);

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
