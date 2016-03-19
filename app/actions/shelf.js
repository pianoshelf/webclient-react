
import createAction from '../utils/createAction';
import { get } from '../utils/api';
import { SHELF_GET } from '../constants/shelf';

export const getShelf = createAction(
  SHELF_GET,
  async (username, request) =>
    await get({
      endpoint: '/shelf/',
      params: { username },
      request,
    })
);
