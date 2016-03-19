
import createReducer from '../../utils/createReducer';

import {
  SHEETMUSIC_GET_TRENDING,
  SHEETMUSIC_GET_LIST,
  SHEETMUSIC_GET_POPULAR,
} from '../../constants/sheetmusic';

/**
 * Reducer for sheet music lists, like trending, and popular sheet music. Also allows for
 * general lists, like with filters.
 */
export default createReducer({
  errorCode: 0,
  list: { results: [], count: 0 },
  popular: { results: [], count: 0 },
  trending: { results: [], count: 0 },
}, {

  [SHEETMUSIC_GET_LIST]: {
    done(state, { results, count }) {
      return {
        ...state,
        list: { results, count },
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        list: { results: [], count: 0 },
        errorCode: code,
      };
    },
  },

  [SHEETMUSIC_GET_POPULAR]: {
    done(state, { results, count }) {
      return {
        ...state,
        popular: { results, count },
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        popular: { results: [], count: 0 },
        errorCode: code,
      };
    },
  },

  [SHEETMUSIC_GET_TRENDING]: {
    done(state, { results, count }) {
      return {
        ...state,
        trending: { results, count },
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        trending: { results: [], count: 0 },
        errorCode: code,
      };
    },
  },
});
