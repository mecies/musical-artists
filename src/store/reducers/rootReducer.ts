import { combineReducers } from '@reduxjs/toolkit';

import { artistModule } from './artist';
import { uiModule } from './ui';

const rootReducer = combineReducers({
  artist: artistModule.reducer,
  ui: uiModule.reducer,
});

export { rootReducer };
