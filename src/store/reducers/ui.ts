import { createSlice } from '@reduxjs/toolkit';

export type InitialUiState = {
  searchQuery: string;
  artistMbid: string;
  releaseMbid: string;
};

const initialState: InitialUiState = {
  searchQuery: '',
  artistMbid: '',
  releaseMbid: '',
};

const uiModule = createSlice({
  name: 'uiModule',
  initialState,
  reducers: {
    setSearchQuery: (state, { payload }: { payload: string }) => {
      state.searchQuery = payload;
    },
    setArtistMbid: (state, { payload }: { payload: string }) => {
      state.artistMbid = payload;
    },
    setReleaseMbid: (state, { payload }: { payload: string }) => {
      state.releaseMbid = payload;
    },
  },
});

export { uiModule };
