
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import login from './login';
import progress from './progress';
import search from './search';
import sheetmusic from './sheetmusic';

export default combineReducers({
  // My reducers
  login,
  progress,
  search,
  sheetmusic,

  // External reducers
  form,
  routing,
  reduxAsyncConnect,
});
