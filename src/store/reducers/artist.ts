import { createSlice } from '@reduxjs/toolkit';
import { Artist } from 'typings';

export type InitialAppStore = {
  favouriteArtists: Artist[];
};
const initialState: InitialAppStore = {
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
