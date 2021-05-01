import { gql } from '@apollo/client';

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

export { GET_RELEASE };
