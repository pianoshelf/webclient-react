
import createReducer from '../../utils/createReducer';
import { mapSheetMusic } from '../../utils/sheetMusicUtils';

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
    error(error, code) {
      return {
        ...state,
        result: {},
        errorCode: code,
      };
    },
  },
});
