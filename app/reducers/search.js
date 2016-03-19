
import createReducer from '../utils/createReducer';
import { mapSheetMusic } from '../utils/sheetMusicUtils';

import { SEARCH_SHEETMUSIC } from '../constants/search';

const initialResults = {
  errorCode: 0,
  count: 0,
  free: [],
};

export default createReducer(initialResults, {
  [SEARCH_SHEETMUSIC]: {
    done(state, { count, free }) {
      return {
        errorCode: 0,
        free: mapSheetMusic(free),
        count,
      };
    },
    error(state, errorCode) {
      return {
        ...initialResults,
        errorCode,
      };
    },
  },
});
