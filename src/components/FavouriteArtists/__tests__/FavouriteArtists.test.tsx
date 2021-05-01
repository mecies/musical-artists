import '@testing-library/jest-dom';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { artistModule } from 'store/reducers/artist';
import { ARTIST } from 'utils/mockTestData';

import { FavouriteArtists } from '../FavouriteArtists';

describe('FavouriteArtists component', () => {
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
    store.dispatch(artistModule.actions.addArtist(ARTIST));

    const artistName = screen.getByText(ARTIST.name);
    expect(artistName.textContent).toEqual(ARTIST.name);
  });

  it('should display message when user has no favourite artists', () => {
    render(<FavouriteArtistsWrapper />, { wrapper: MemoryRouter });
    store.dispatch(artistModule.actions.removeArtist(ARTIST.mbid));

    const visitProfileMessage = screen.getByText(/visit artist profile/i);
    expect(visitProfileMessage).toHaveTextContent(/visit artist profile/i);
  });
});
