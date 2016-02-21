
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import login from './login';
import progress from './progress';
import search from './search';
import sheetmusic from './sheetmusic';

export default combineReducers({
  login,
  progress,
  search,
  sheetmusic,
  routing: routeReducer,
});
