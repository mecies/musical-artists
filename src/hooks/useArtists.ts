import { gql, useQuery } from '@apollo/client';
import { Artist } from 'typings';

type ArtistsData = {
  search: {
    artists: {
      nodes: Artist[];
    };
  };
};

type ArtistsVariables = {
  query: string;
};

const GET_ARTISTS = gql`
  query GetArtists($query: String!) {
    search {
      artists(query: $query) {
        nodes {
          mbid
          name
        }
      }
    }
  }
`;

export const useArtists = (query: string) => {
  const { loading, error, data } = useQuery<ArtistsData, ArtistsVariables>(GET_ARTISTS, {
    variables: {
      query,
    },
    skip: !query,
  });

  return {
    loading,
    error,
    data: data?.search.artists.nodes,
  };
};
