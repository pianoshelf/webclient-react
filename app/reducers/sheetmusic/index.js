
import { combineReducers } from 'redux';

import comments from './comments';
import lists from './lists';
import results from './results';
import videos from './videos';

export default combineReducers({
  comments,
  lists,
  results,
  videos,
});
