import '@testing-library/jest-dom';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { act, render, screen } from '@testing-library/react';
import { artistModule } from 'store/reducers/artist';
import { uiModule } from 'store/reducers/ui';
import { ARTIST_MBID, RELEASE_MBID } from 'utils/mockTestData';

import { Header } from '../Header';

describe('Header component', () => {
  const store = createStore(
    combineReducers({
      artist: artistModule.reducer,
      ui: uiModule.reducer,
    }),
  );

  const HeaderWrapper: FC = () => (
    <Provider store={store}>
      <Header />
    </Provider>
  );

  it('should display only search when on home page', () => {
    render(<HeaderWrapper />, { wrapper: MemoryRouter });

    act(() => {
      store.dispatch(uiModule.actions.setArtistMbid(''));
      store.dispatch(uiModule.actions.setReleaseMbid(''));
    });

    const searchBreadcrumb = screen.getByText(/search/i);

    expect(searchBreadcrumb).toBeInTheDocument();
    expect(screen.queryByText(/artist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/release/i)).not.toBeInTheDocument();
  });

  it('should display search and artist when on artist page', () => {
    render(<HeaderWrapper />, { wrapper: MemoryRouter });

    act(() => {
      store.dispatch(uiModule.actions.setArtistMbid(ARTIST_MBID));
      store.dispatch(uiModule.actions.setReleaseMbid(''));
    });

    const searchBreadcrumb = screen.getByText(/search/i);
    const artistBreadcrumb = screen.getByText(/artist/i);

    expect(artistBreadcrumb).toBeInTheDocument();
    expect(searchBreadcrumb).toBeInTheDocument();
  });

  it('should display search and artist, and release when on release page', () => {
    render(<HeaderWrapper />, { wrapper: MemoryRouter });

    act(() => {
      store.dispatch(uiModule.actions.setArtistMbid(ARTIST_MBID));
      store.dispatch(uiModule.actions.setReleaseMbid(RELEASE_MBID));
    });

    const searchBreadcrumb = screen.getByText(/search/i);
    const artistBreadcrumb = screen.getByText(/artist/i);
    const releaseBreadcrumb = screen.getByText(/release/i);

    expect(artistBreadcrumb).toBeInTheDocument();
    expect(searchBreadcrumb).toBeInTheDocument();
    expect(releaseBreadcrumb).toBeInTheDocument();
  });
});
