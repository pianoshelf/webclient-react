
import createAction from '../utils/createAction';
import { get, post } from '../utils/api';
import {
  PROFILE_GET,
  PROFILE_UPDATE_DESCRIPTION,
  PROFILE_GET_COMMENTS_FOR_USER,
  PROFILE_GET_UPLOADS_FOR_USER,
  PROFILE_GET_VIDEOS_FOR_USER,
} from '../constants/profile';

export const getProfile = createAction(
  PROFILE_GET,
  async (username, store) => {
    return await get({
      endpoint: '/profile/',
      params: { username },
      store,
    });
  }
);

export const updateProfileDescription = createAction(
  PROFILE_UPDATE_DESCRIPTION,
  async (description, store) => {
    return await post({
      endpoint: '/profile/',
      params: { description },
      store,
    });
  }
);

export const getCommentsForUser = createAction(
  PROFILE_GET_COMMENTS_FOR_USER,
  async (username, store) => {
    return await get({
      endpoint: '/comment/',
      params: { username },
      store,
    });
  }
);

export const getUploadsForUser = createAction(
  PROFILE_GET_UPLOADS_FOR_USER,
  async (username, page, store) => {
    return await get({
      endpoint: '/sheetmusic/uploads/',
      params: { username, page },
      store,
    });
  }
);

export const getVideosForUser = createAction(
  PROFILE_GET_VIDEOS_FOR_USER,
  async (username, store) => {
    return await get({
      endpoint: '/video/',
      params: { username },
      store,
    });
  }
);
