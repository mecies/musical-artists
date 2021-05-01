import { gql } from '@apollo/client';

const GET_ARTIST = gql`
  query GetArtistByMbid($mbid: MBID!) {
    lookup {
      artist(mbid: $mbid) {
        mbid
        name
        releases {
          nodes {
            title
            mbid
          }
        }
      }
    }
  }
`;

export { GET_ARTIST };
