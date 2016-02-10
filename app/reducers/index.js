
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import comments from './comments';
import login from './login';
import progress from './progress';
import sheetmusic from './sheetmusic';

export default combineReducers({
  comments,
  login,
  progress,
  sheetmusic,
  routing: routeReducer,
});
