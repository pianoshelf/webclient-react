
import createReducer from '../../utils/createReducer';
import { mapSheetMusic } from '../../utils/sheetMusicUtils';

// SHEETMUSIC_UPDATE,
// SHEETMUSIC_GET_COMPOSERS,
// SHEETMUSIC_GET_RATING,
// SHEETMUSIC_POST_RATING,
// SHEETMUSIC_GET_UPLOADS,
// SHEETMUSIC_DELETE,
// SHEETMUSIC_DOWNLOAD,

import {
  SHEETMUSIC_GET,
} from '../../constants/sheetmusic';

const initialState = {
  errorCode: 0,
  result: {},
};

export default createReducer(initialState, {
  [SHEETMUSIC_GET]: {
    done(state, payload) {
      return {
        ...state,
        result: mapSheetMusic(payload),
      };
    },
    error(state, code) {
      return {
        ...state,
        result: {},
        errorCode: code,
      };
    },
  },
});
