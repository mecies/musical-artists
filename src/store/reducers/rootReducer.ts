import { combineReducers } from '@reduxjs/toolkit';

import { artistModule } from './artist';

const rootReducer = combineReducers({
  artist: artistModule.reducer,
});

export { rootReducer };
