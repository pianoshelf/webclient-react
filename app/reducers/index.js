
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import login from './login';
import profile from './profile';
import progress from './progress';
import search from './search';
import sheetmusic from './sheetmusic';
import upload from './upload';

export default combineReducers({
  // My reducers
  login,
  profile,
  progress,
  search,
  sheetmusic,
  upload,

  // External reducers
  form,
  routing,
  reduxAsyncConnect,
});
