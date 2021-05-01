import React, { FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { Artist } from 'models';

import { GET_ARTISTS } from './query';
import { useArtists } from './useArtists';

describe('useArtists hook', () => {
  const query = 'Sele';

  const artists: Artist[] = [
    {
      mbid: '4421af8a-2ea7-482a-a626-213cb2777404',
      name: 'Sele',
    },
    {
      mbid: 'f15c34cd-684c-424d-8a51-e04f06ee684e',
      name: 'Afande Sele',
    },
    {
      mbid: '4609b46a-c492-475a-bac1-3a5415d4c22e',
      name: 'Paul Sele',
    },
  ];

  const artistsMockQuery = {
    request: {
      query: GET_ARTISTS,
      variables: {
        query,
      },
    },
    result: {
      data: {
        search: {
          artists: {
            nodes: artists,
            __typename: 'ArtistConnection',
          },
          __typename: 'SearchQuery',
        },
      },
    },
  };

  const artistsMockQueryError = {
    request: {
      query: GET_ARTISTS,
      variables: {
        query,
      },
    },
    error: new Error('Ohh Ohh error!'),
  };

  const getHookWrapper = (mocks: (typeof artistsMockQuery | typeof artistsMockQueryError)[] = []) => {
    const wrapper: FC = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useArtists(query), {
      wrapper,
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual([]);
    return { result, waitForNextUpdate };
  };

  it('should return an array of artists', async () => {
    const { result, waitForNextUpdate } = getHookWrapper([artistsMockQuery]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect<Artist[] | undefined>(result.current.data).toEqual(artists);
  });

  it('should return error when request fails', async () => {
    const { result, waitForNextUpdate } = getHookWrapper([artistsMockQueryError]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toEqual([]);
  });
});
