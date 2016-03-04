
import createReducer from '../utils/createReducer';
import { mapSheetMusic, mapPaidSheetMusic } from '../utils/sheetMusicUtils';

import { SEARCH_SHEETMUSIC } from '../constants/search';

const initialResults = {
  errorCode: 0,
  count: 0,
  free: [],
  paid: [],
  progress: false,
};

export default createReducer(initialResults, {
  [SEARCH_SHEETMUSIC]: {
    start() {
      return {
        ...initialResults,
        progress: true,
      };
    },
    done(state, { count, free, paid }) {
      return {
        errorCode: 0,
        free: mapSheetMusic(free),
        paid: mapPaidSheetMusic(paid),
        progress: false,
        count,
      };
    },
    error(state, errorCode) {
      return {
        ...initialResults,
        progress: false,
        errorCode,
      };
    },
  },
});
