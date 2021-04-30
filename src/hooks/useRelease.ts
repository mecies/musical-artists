import { gql, useQuery } from '@apollo/client';
import { Release } from 'typings';

type ReleaseData = {
  lookup: {
    release: Release;
  };
};

type ReleaseVariables = {
  mbid: string;
};

const GET_RELEASE = gql`
  query GetReleaseByMbid($mbid: MBID!) {
    lookup {
      release(mbid: $mbid) {
        title
        date
        country
        mbid
        recordings {
          nodes {
            mbid
            title
          }
        }
      }
    }
  }
`;

export const useRelease = (mbid: string) => {
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
