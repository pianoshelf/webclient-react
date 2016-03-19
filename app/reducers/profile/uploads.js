
import createReducer from '../../utils/createReducer';
import { mapSheetMusic } from '../../utils/sheetMusicUtils';

import { PROFILE_GET_UPLOADS_FOR_USER } from '../../constants/profile';

export default createReducer([], {
  [PROFILE_GET_UPLOADS_FOR_USER]: {
    done(state, { results }) {
      return mapSheetMusic(results);
    },
    error() {
      return [];
    },
  },
});
