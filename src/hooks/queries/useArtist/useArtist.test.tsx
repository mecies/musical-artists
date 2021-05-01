import React, { FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { Artist } from 'models';

import { GET_ARTIST } from './query';
import { useArtist } from './useArtist';

describe('useArtist hook', () => {
  const mbid = '7b24231e-faa5-4838-b6a8-6a2eb2727b37';
  const artist: Artist = {
    mbid,
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

  const artistMockQuery = {
    request: {
      query: GET_ARTIST,
      variables: {
        mbid,
      },
    },
    result: {
      data: {
        lookup: {
          artist,
          __typename: 'LookupQuery',
        },
      },
    },
  };

  const artistMockQueryError = {
    request: {
      query: GET_ARTIST,
    },
    error: new Error('Ohh Ohh error!'),
  };

  const getHookWrapper = (mocks: (typeof artistMockQuery | typeof artistMockQueryError)[] = []) => {
    const wrapper: FC = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useArtist(mbid), {
      wrapper,
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    return { result, waitForNextUpdate };
  };

  it('should return an artist', async () => {
    const { result, waitForNextUpdate } = getHookWrapper([artistMockQuery]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect<Artist | undefined>(result.current.data).toEqual(artist);
  });

  it('should return error when request fails', async () => {
    const { result, waitForNextUpdate } = getHookWrapper([artistMockQueryError]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
