
import createReducer from '../../utils/createReducer';

import {
  SHEETMUSIC_GET_TOP,
  SHEETMUSIC_GET_TRENDING,
  SHEETMUSIC_GET_LIST,
  SHEETMUSIC_GET_POPULAR,
} from '../../constants/sheetmusic';

function createList(items = []) {
  return {
    list: items,
    count: items.length,
  };
}

/**
 * Reducer for sheet music lists, like trending, popular, and top sheet music. Also allows for
 * general lists, like with filters.
 */
export default createReducer({
  errorCode: 0,
  list: createList(),
  popular: createList(),
  top: createList(),
  trending: createList(),
}, {

  [SHEETMUSIC_GET_LIST]: {
    done(state, payload) {
      console.log('i got the list yay');
      return {
        ...state,
        list: createList(payload),
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        list: createList(),
        errorCode: code,
      };
    },
  },

  [SHEETMUSIC_GET_POPULAR]: {
    done(state, payload) {
      return {
        ...state,
        popular: createList(payload),
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        popular: createList(),
        errorCode: code,
      };
    },
  },

  [SHEETMUSIC_GET_TOP]: {
    done(state, payload) {
      return {
        ...state,
        top: createList(payload),
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        top: createList(),
        errorCode: code,
      };
    },
  },

  [SHEETMUSIC_GET_TRENDING]: {
    done(state, payload) {
      return {
        ...state,
        trending: createList(payload),
        errorCode: 0,
      };
    },
    error(state, code) {
      return {
        ...state,
        trending: createList(),
        errorCode: code,
      };
    },
  },
});
