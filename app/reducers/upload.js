
import createReducer from '../utils/createReducer';

import { UPLOAD_FILE } from '../constants/upload';

const initialResults = {
  errorCode: 0,
};

export default createReducer(initialResults, {
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
