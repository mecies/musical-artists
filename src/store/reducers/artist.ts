import { createSlice } from '@reduxjs/toolkit';
import { Artist } from 'typings';

export type InitialArtistState = {
  favouriteArtists: Artist[];
};
const initialState: InitialArtistState = {
  favouriteArtists: [],
};

const artistModule = createSlice({
  name: 'artistModule',
  initialState,
  reducers: {
    addArtist: (state, { payload }: { payload: Artist }) => {
      state.favouriteArtists.push(payload);
    },
    removeArtist: (state, { payload }: { payload: string }) => {
      state.favouriteArtists = state.favouriteArtists.filter((artist) => artist.mbid !== payload);
    },
  },
});

export { artistModule };
