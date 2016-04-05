
import createReducer from '../utils/createReducer';

import { UPLOAD_FILE, UPLOAD_RESET_ERROR } from '../constants/upload';

const initialResults = {
  errorCode: 0,
};

export default createReducer(initialResults, {
  [UPLOAD_RESET_ERROR]: state => ({
    ...state,
    errorCode: 0,
  }),

  [UPLOAD_FILE]: {
    done() {
      return {
        errorCode: 0,
      };
    },
    error(state, errorCode) {
      return {
        errorCode,
      };
    },
  },
});
