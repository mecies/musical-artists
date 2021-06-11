import { FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { Artist } from 'models';
import { ARTISTS } from 'utils/mockTestData';

import { GET_ARTISTS } from '../query';
import { useArtists } from '../useArtists';

describe('useArtists hook', () => {
  const query = 'Sele';

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
            nodes: ARTISTS,
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
    expect<Artist[]>(result.current.data).toEqual(ARTISTS);
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
