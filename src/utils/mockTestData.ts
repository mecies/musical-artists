import { Artist, Release } from 'models';

const ARTIST_MBID = '7b24231e-faa5-4838-b6a8-6a2eb2727b37';

const RELEASE_MBID = 'f7e385e0-8cde-43d6-818d-990a19b0850e';

const ARTIST: Artist = {
  mbid: ARTIST_MBID,
  name: 'KSI',
  releases: {
    nodes: [
      {
        title: 'Lighter',
        mbid: RELEASE_MBID,
      },
    ],
  },
};

const ARTISTS: Artist[] = [
  {
    mbid: '4421af8a-2ea7-482a-a626-213cb2777404',
    name: 'Sele',
  },
  {
    mbid: 'f15c34cd-684c-424d-8a51-e04f06ee684e',
    name: 'Afande Sele',
  },
  {
    mbid: '4609b46a-c492-475a-bac1-3a5415d4c22e',
    name: 'Paul Sele',
  },
];

const RELEASE: Release = {
  title: 'Treat You Better',
  mbid: RELEASE_MBID,
  recordings: {
    nodes: [
      {
        mbid: '2445f788-914f-4893-9a6d-5de91d7db4f9',
        title: 'Treat You Better',
      },
      {
        mbid: '81874058-4b20-4b0f-a74b-7eefc6102904',
        title: 'Ruin',
      },
    ],
  },
};

export { ARTIST_MBID, RELEASE_MBID, ARTISTS, ARTIST, RELEASE };
