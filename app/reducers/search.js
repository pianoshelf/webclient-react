
import { createReducer } from '../utils/createReducer';

import { SHEETMUSIC_SEARCH } from '../constants/sheetmusic';

export default createReducer({
  results: {
    count: 0,
    free: [],
    paid: [],
    progress: false,
  },
}, {
  [SHEETMUSIC_SEARCH]: {
    start() {
      return {
        count: 0,
        free: [],
        paid: [],
        progress: true,
      };
    },
    done(state) {
      return {
        ...state,
      };
    },
    error(state) {
      return {
        ...state,
      };
    },
  },
});
