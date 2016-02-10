
import { createReducer } from '../utils/createReducer';

import {
  PROGRESS_RESET,
  PROGRESS_ADD,
  PROGRESS_REMOVE,
} from '../constants/profile';

export default createReducer({
  inProgress: [],
}, {
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
});
