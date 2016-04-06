
import createReducer from '../utils/createReducer';

import { UPLOAD_FILE, UPLOAD_CLEAR_ERROR } from '../constants/upload';
import { success } from '../utils/constants';

const initialResults = {
  errorCode: 0,
};

export default createReducer(initialResults, {
  [UPLOAD_CLEAR_ERROR]: state => ({
    ...state,
    errorCode: 0,
  }),

  [UPLOAD_FILE]: {
    done() {
      return {
        errorCode: success.UPLOADED,
      };
    },
    error(state, errorCode) {
      return {
        errorCode,
      };
    },
  },
});
