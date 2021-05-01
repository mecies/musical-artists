import { gql } from '@apollo/client';

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

export { GET_ARTIST };
