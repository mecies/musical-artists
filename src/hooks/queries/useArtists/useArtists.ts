import { useQuery } from '@apollo/client';
import { Artist } from 'models';

import { GET_ARTISTS } from './query';

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

const useArtists = (query: string) => {
  const { loading, error, data } = useQuery<ArtistsData, ArtistsVariables>(GET_ARTISTS, {
    variables: {
      query,
    },
    skip: !query,
  });

  return {
    loading,
    error,
    data: data?.search.artists.nodes || [],
  };
};

export { useArtists };
