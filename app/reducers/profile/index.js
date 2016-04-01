
import { combineReducers } from 'redux';

import shelf from './shelf';
import uploads from './uploads';

export default combineReducers({
  shelf,
  uploads,
});
