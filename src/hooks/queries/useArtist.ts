import { gql, useQuery } from '@apollo/client';
import { Artist } from 'models';

type ArtistData = {
  lookup: {
    artist: Artist;
  };
};

type ArtistVariables = {
  mbid: string;
};

const GET_ARTIST = gql`
  query GetArtistByMbid($mbid: MBID!) {
    lookup {
      artist(mbid: $mbid) {
        mbid
        name
        country
        releases {
          nodes {
            title
            mbid
            date
            country
          }
        }
      }
    }
  }
`;

export const useArtist = (mbid: string) => {
  const { loading, error, data } = useQuery<ArtistData, ArtistVariables>(GET_ARTIST, {
    variables: {
      mbid,
    },
    skip: !mbid,
  });

  return {
    loading,
    error,
    data: data?.lookup.artist,
  };
};