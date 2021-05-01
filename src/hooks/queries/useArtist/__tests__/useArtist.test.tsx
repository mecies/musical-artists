import React, { FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { Artist } from 'models';
import { ARTIST, ARTIST_MBID } from 'utils/mockTestData';

import { GET_ARTIST } from '../query';
import { useArtist } from '../useArtist';

describe('useArtist hook', () => {
  const artistMockQuery = {
    request: {
      query: GET_ARTIST,
      variables: {
        mbid: ARTIST_MBID,
      },
    },
    result: {
      data: {
        lookup: {
          artist: ARTIST,
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

    const { result, waitForNextUpdate } = renderHook(() => useArtist(ARTIST_MBID), {
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
    expect<Artist | undefined>(result.current.data).toEqual(ARTIST);
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
