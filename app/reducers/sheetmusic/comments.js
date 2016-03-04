
import createReducer from '../../utils/createReducer';

import {
  SHEETMUSIC_GET,
  SHEETMUSIC_COMMENT_GET,
  SHEETMUSIC_COMMENT_ADD,
  SHEETMUSIC_COMMENT_DELETE,
  SHEETMUSIC_COMMENT_EDIT,
  SHEETMUSIC_COMMENT_UNDO_REMOVE,
  SHEETMUSIC_COMMENT_UPVOTE,
} from '../../constants/sheetmusic';

const initialState = {
  list: [],
  errorCode: 0,
};

/**
 * Reducer for comments within sheet music.
 */
export default createReducer(initialState, {

  [SHEETMUSIC_GET]: {
    start() {
      return initialState;
    },
  },

  [SHEETMUSIC_COMMENT_GET]: {
    start() {
      return {
        list: [],
        errorCode: 0,
      };
    },
    done(state, payload) {
      return {
        list: payload,
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        list: [],
        errorCode: code,
      };
    },
  },

  [SHEETMUSIC_COMMENT_ADD]: state => state,

  [SHEETMUSIC_COMMENT_DELETE]: state => state,

  [SHEETMUSIC_COMMENT_EDIT]: state => state,

  [SHEETMUSIC_COMMENT_UNDO_REMOVE]: state => state,

  [SHEETMUSIC_COMMENT_UPVOTE]: state => state,

});
