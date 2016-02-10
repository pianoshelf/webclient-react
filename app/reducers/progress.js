
import { handleActions } from 'redux-actions';

import {
  PROGRESS_RESET,
  PROGRESS_ADD,
  PROGRESS_REMOVE,
} from '../constants/profile';

export default handleActions({
  [PROGRESS_RESET]: () => ({
    inProgress: [],
  }),
  [PROGRESS_ADD]: (state, action) => ({
    inProgress: [...state.inProgress, action],
  }),
  [PROGRESS_REMOVE]: (state, action) => {
    if (state.inProgress.includes(action)) {
      return {
        inProgress: state.splice(action, 1),
      };
    } else {
      return state;
    }
  },
}, {
  inProgress: [],
});
