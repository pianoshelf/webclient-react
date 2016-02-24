
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import login from './login';
import progress from './progress';
import search from './search';
import sheetmusic from './sheetmusic';

export default combineReducers({
  login,
  progress,
  search,
  sheetmusic,
  routing,
  reduxAsyncConnect,
});
