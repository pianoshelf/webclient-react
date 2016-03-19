
import createReducer from '../../utils/createReducer';
import { mapSheetMusic } from '../../utils/sheetMusicUtils';

import { SHELF_GET } from '../../constants/shelf';

export default createReducer([], {
  [SHELF_GET]: {
    done(state, { sheetmusic }) {
      return mapSheetMusic(sheetmusic);
    },
    error() {
      return [];
    },
  },
});
