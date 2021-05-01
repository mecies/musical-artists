import React, { FC } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { Release } from 'models';

import { GET_RELEASE } from './query';
import { useRelease } from './useRelease';

describe('useRelease hook', () => {
  const mbid = '06f70f0e-5612-4559-81c1-093853478505';
  const release: Release = {
    title: 'New Age',
    date: '2019-04-12',
    country: 'FR',
    mbid,
    recordings: {
      nodes: [
        {
          mbid: '15dfb72a-95b2-466f-bba7-4b77a4c0034f',
          title: 'New Age',
        },
        {
          mbid: '2ecd464d-1f27-494b-b81e-f9cc6d4e705e',
          title: 'Champagne',
        },
      ],
    },
  };

  const releaseMockQuery = {
    request: {
      query: GET_RELEASE,
      variables: {
        mbid,
      },
    },
    result: {
      data: {
        lookup: {
          release,
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

    const { result, waitForNextUpdate } = renderHook(() => useRelease(mbid), {
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
    expect<Release | undefined>(result.current.data).toEqual(release);
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
