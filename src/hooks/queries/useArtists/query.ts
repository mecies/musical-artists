import { gql } from '@apollo/client';

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

export { GET_ARTISTS };
