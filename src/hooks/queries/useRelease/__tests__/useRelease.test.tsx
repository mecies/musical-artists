import React, { FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { Release } from 'models';
import { ARTIST_MBID, RELEASE } from 'utils/mockTestData';

import { GET_RELEASE } from '../query';
import { useRelease } from '../useRelease';

describe('useRelease hook', () => {
  const releaseMockQuery = {
    request: {
      query: GET_RELEASE,
      variables: {
        mbid: ARTIST_MBID,
      },
    },
    result: {
      data: {
        lookup: {
          release: RELEASE,
          __typename: 'LookupQuery',
        },
      },
    },
  };

  const releaseMockQueryError = {
    request: {
      query: GET_RELEASE,
    },
    error: new Error('Ohh Ohh error!'),
  };

  const getHookWrapper = (mocks: (typeof releaseMockQuery | typeof releaseMockQueryError)[] = []) => {
    const wrapper: FC = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useRelease(ARTIST_MBID), {
      wrapper,
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();
    return { result, waitForNextUpdate };
  };

  it('should return a release', async () => {
    const { result, waitForNextUpdate } = getHookWrapper([releaseMockQuery]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect<Release | undefined>(result.current.data).toEqual(RELEASE);
  });

  it('should return error when request fails', async () => {
    const { result, waitForNextUpdate } = getHookWrapper([releaseMockQueryError]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
