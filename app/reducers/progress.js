
import createReducer from '../utils/createReducer';

/**
 * Import various action types
 */
import {
  LOGIN_LOGIN,
  LOGIN_REGISTER,
  LOGIN_RESET_PASSWORD,
  LOGIN_RESET_PASSWORD_CONFIRM,
  LOGIN_FACEBOOK,
} from '../constants/login';

import {
  PROGRESS_RESET,
  PROGRESS_ADD,
  PROGRESS_REMOVE,
} from '../constants/progress';

import {
  PROFILE_GET,
  PROFILE_GET_UPLOADS_FOR_USER,
} from '../constants/profile';

import {
  SEARCH_SHEETMUSIC,
} from '../constants/search';

import {
  SHELF_GET,
} from '../constants/shelf';

import {
  SHEETMUSIC_GET,
  SHEETMUSIC_GET_TRENDING,
  SHEETMUSIC_GET_LIST,
  SHEETMUSIC_GET_POPULAR,
} from '../constants/sheetmusic';

/**
 * Define mappings from actions to items in the progress array
 */
const progressMappings = {
  [LOGIN_LOGIN]: 'login',
  [LOGIN_REGISTER]: 'register',
  [LOGIN_RESET_PASSWORD]: 'resetPassword',
  [LOGIN_RESET_PASSWORD_CONFIRM]: 'resetPasswordConfirm',
  [LOGIN_FACEBOOK]: 'facebookLogin',
  [PROFILE_GET]: 'getProfile',
  [PROFILE_GET_UPLOADS_FOR_USER]: 'getUploadsForUser',
  [SEARCH_SHEETMUSIC]: 'search',
  [SHEETMUSIC_GET]: 'getSheetMusic',
  [SHEETMUSIC_GET_TRENDING]: 'trendingSheetMusic',
  [SHEETMUSIC_GET_LIST]: 'sheetMusicList',
  [SHEETMUSIC_GET_POPULAR]: 'popularSheetMusic',
  [SHELF_GET]: 'getShelf',
};

/**
 * Helper functions for adding and removing items from an array
 */
function addToArray(array, item) {
  return [...array, item];
}

function removeFromArray(array, item) {
  const newArray = array.slice(0);
  const actionIndex = newArray.indexOf(item);
  if (actionIndex !== -1) {
    newArray.splice(actionIndex, 1);
    return newArray;
  }
  return array;
}

/**
 * Generate reducer functions from progressMapping array
 */
let progressKeys = {}; // eslint-disable-line prefer-const
Object.keys(progressMappings).forEach(key => {
  progressKeys[key] = {
    start(state) {
      return { inProgress: addToArray(state.inProgress, progressMappings[key]) };
    },
    done(state) {
      return { inProgress: removeFromArray(state.inProgress, progressMappings[key]) };
    },
    error(state) {
      return { inProgress: removeFromArray(state.inProgress, progressMappings[key]) };
    },
  };
});

export default createReducer({
  inProgress: [],
}, {
  ...progressKeys,
  [PROGRESS_RESET]: () => ({ inProgress: [] }),
  [PROGRESS_ADD]: (state, action) => ({
    inProgress: addToArray(state.inProgress, action),
  }),
  [PROGRESS_REMOVE]: (state, action) => ({
    inProgress: removeFromArray(state.inProgress, action),
  }),
});
