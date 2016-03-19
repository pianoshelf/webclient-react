
import createReducer from '../../utils/createReducer';

import { PROFILE_GET_UPLOADS_FOR_USER } from '../../constants/profile';

export default createReducer([], {
  [PROFILE_GET_UPLOADS_FOR_USER]: {
    done(state, { results }) {
      return results;
    },
    error() {
      return [];
    },
  },
});
