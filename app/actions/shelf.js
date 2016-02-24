
import createAction from '../utils/createAction';
import { get, post, del } from '../utils/api';
import {
  SHELF_GET,
  SHELF_ADD,
  SHELF_REMOVE,
} from '../constants/shelf';

export const getShelf = createAction(
  SHELF_GET,
  async (username, store) => {
    return await get({
      endpoint: '/shelf/',
      params: { username },
      store,
    });
  }
);

export const addToShelf = createAction(
  SHELF_ADD,
  async sheetId => {
    return await post({
      endpoint: '/shelf/',
      params: { sheetmusic: sheetId },
    });
  }
);

export const removeFromShelf = createAction(
  SHELF_REMOVE,
  async sheetId => {
    return await del({
      endpoint: '/shelf/',
      params: { sheetmusic: sheetId },
    });
  }
);
