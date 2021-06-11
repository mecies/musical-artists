import '@testing-library/jest-dom';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { artistModule } from 'store/reducers/artist';
import { RELEASE } from 'utils/mockTestData';

import { ReleaseCard } from '../ReleaseCard';

describe('ReleaseCard component', () => {
  const store = createStore(
    combineReducers({
      artist: artistModule.reducer,
    }),
  );

  const ReleaseCardWrapper: FC = () => (
    <Provider store={store}>
      <ReleaseCard release={RELEASE} />
    </Provider>
  );

  it('should display release title', () => {
    render(<ReleaseCardWrapper />);

    const releaseTitle = screen.getAllByText(RELEASE.title)[0];
    expect(releaseTitle).toBeInTheDocument();
  });

  it('should display recording in a release', () => {
    render(<ReleaseCardWrapper />);
    const recording = RELEASE.recordings?.nodes[0].title;

    if (recording) {
      const recordingTitle = screen.getAllByText(recording)[1];
      expect(recordingTitle).toBeInTheDocument();
    }
  });
});
