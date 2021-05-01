import '@testing-library/jest-dom';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Release } from 'models';
import { artistModule } from 'store/reducers/artist';

import { ReleaseCard } from './ReleaseCard';

describe('ReleaseCard component', () => {
  const release: Release = {
    title: 'Treat You Better',
    date: '2016-08-19',
    country: 'DE',
    mbid: '05455d74-7911-430d-9e90-e550da0d53cc',
    recordings: {
      nodes: [
        {
          mbid: '2445f788-914f-4893-9a6d-5de91d7db4f9',
          title: 'Treat You Better',
        },
        {
          mbid: '81874058-4b20-4b0f-a74b-7eefc6102904',
          title: 'Ruin',
        },
      ],
    },
  };

  const store = createStore(
    combineReducers({
      artist: artistModule.reducer,
    }),
  );

  const ReleaseCardWrapper: FC = () => (
    <Provider store={store}>
      <ReleaseCard release={release} />
    </Provider>
  );

  it('should display release title', () => {
    render(<ReleaseCardWrapper />, { wrapper: MemoryRouter });

    const releaseTitle = screen.getAllByText(release.title)[0];
    expect(releaseTitle).toBeInTheDocument();
  });

  it('should display recording in a release', () => {
    render(<ReleaseCardWrapper />, { wrapper: MemoryRouter });
    const recording = release.recordings?.nodes[0].title;

    if (recording) {
      const recordingTitle = screen.getAllByText(recording)[1];
      expect(recordingTitle).toBeInTheDocument();
    }
  });
});
