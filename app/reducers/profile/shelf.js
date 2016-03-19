
import createReducer from '../../utils/createReducer';

import { SHELF_GET } from '../../constants/shelf';

export default createReducer([], {
  [SHELF_GET]: {
    done(state, { results }) {
      return results;
    },
    error() {
      return [];
    },
  },
});
