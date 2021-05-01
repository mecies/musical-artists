import '@testing-library/jest-dom';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Artist } from 'models';
import { artistModule } from 'store/reducers/artist';

import { FavouriteArtists } from './FavouriteArtists';

describe('FavouriteArtists component', () => {
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

  const FavouriteArtistsWrapper: FC = () => (
    <Provider store={store}>
      <FavouriteArtists />
    </Provider>
  );

  it('should display artist name when user has favourite artist', () => {
    render(<FavouriteArtistsWrapper />, { wrapper: MemoryRouter });
    store.dispatch(artistModule.actions.addArtist(artist));

    const artistName = screen.getByText(artist.name);
    expect(artistName.textContent).toEqual(artist.name);
  });

  it('should display message when user has no favourite artists', () => {
    render(<FavouriteArtistsWrapper />, { wrapper: MemoryRouter });
    store.dispatch(artistModule.actions.removeArtist(artist.mbid));

    const visitProfileMessage = screen.getByText(/visit artist profile/i);
    expect(visitProfileMessage).toHaveTextContent(/visit artist profile/i);
  });
});
