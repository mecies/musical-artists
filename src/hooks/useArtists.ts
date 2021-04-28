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
  first: number;
};

const GET_ARTISTS = gql`
  query GetArtists($query: String!, $first: Int!) {
    search {
      artists(query: $query, first: $first) {
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
      // TODO pagination or infinite scrolling
      first: 10,
    },
    skip: !query,
  });

  return {
    loading,
    error,
    data: data?.search.artists.nodes,
  };
};
