import { useQuery } from '@apollo/client';
import { Release } from 'models';

import { GET_RELEASE } from './query';

type ReleaseData = {
  lookup: {
    release: Release;
  };
};

type ReleaseVariables = {
  mbid: string;
};

const useRelease = (mbid: string) => {
  const { loading, error, data } = useQuery<ReleaseData, ReleaseVariables>(GET_RELEASE, {
    variables: {
      mbid,
    },
    skip: !mbid,
  });

  return {
    loading,
    error,
    data: data?.lookup.release,
  };
};

export { useRelease };
