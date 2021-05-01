import { useQuery } from '@apollo/client';
import { Artist } from 'models';

import { GET_ARTIST } from './query';

type ArtistData = {
  lookup: {
    artist: Artist;
  };
};

type ArtistVariables = {
  mbid: string;
};

const useArtist = (mbid: string) => {
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

export { useArtist };
