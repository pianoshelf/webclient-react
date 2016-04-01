
import createAction from '../utils/createAction';
import { actionDone } from '../utils/actionUtils';
import { get } from '../utils/api';
import { mapSheetMusic } from '../utils/sheetMusicUtils';
import { SHELF_GET } from '../constants/shelf';

export const getShelf = createAction(
  SHELF_GET,
  async (username, request) => {
    const response = await get({
      endpoint: '/shelf/',
      params: { username },
      request,
    });

    const { payload } = response;
    return actionDone({
      results: mapSheetMusic(payload.sheetmusic),
    });
  }
);
