
import { combineReducers } from 'redux';

import shelf from './shelf';
import profile from './profile';
import uploads from './uploads';

export default combineReducers({
  shelf,
  profile,
  uploads,
});
