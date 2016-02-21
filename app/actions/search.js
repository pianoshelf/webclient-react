
import createAction from '../utils/createAction';
import { get } from '../utils/api';
import {
  SEARCH_SHEETMUSIC,
} from '../constants/search';

export const search = createAction(
  SEARCH_SHEETMUSIC,
  async (query, store) => {
    return await get({
      endpoint: '/search/',
      params: { query },
      store,
    });
  }
);
