
import createReducer from '../utils/createReducer';

import {
  PROGRESS_RESET,
  PROGRESS_ADD,
  PROGRESS_REMOVE,
} from '../constants/progress';

export default createReducer({
  inProgress: [],
}, {
  [PROGRESS_RESET]: () => ({ inProgress: [] }),

  [PROGRESS_ADD]: (state, action) => ({ inProgress: [...state.inProgress, action] }),

  [PROGRESS_REMOVE]: (state, action) => {
    const inProgress = state.inProgress.slice(0);
    const actionIndex = inProgress.indexOf(action);
    if (actionIndex !== -1) {
      inProgress.splice(actionIndex, 1);
      return { inProgress };
    } else {
      return state;
    }
  },
});
