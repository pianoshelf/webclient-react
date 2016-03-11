
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
  async (username, request) =>
    await get({
      endpoint: '/profile/',
      params: { username },
      request,
    })
);

export const updateProfileDescription = createAction(
  PROFILE_UPDATE_DESCRIPTION,
  async description =>
    await post({
      endpoint: '/profile/',
      params: { description },
    })
);

export const getCommentsForUser = createAction(
  PROFILE_GET_COMMENTS_FOR_USER,
  async (username, request) =>
    await get({
      endpoint: '/comment/',
      params: { username },
      request,
    })
);

export const getUploadsForUser = createAction(
  PROFILE_GET_UPLOADS_FOR_USER,
  async (username, page, request) =>
    await get({
      endpoint: '/sheetmusic/uploads/',
      params: { username, page },
      request,
    })
);

export const getVideosForUser = createAction(
  PROFILE_GET_VIDEOS_FOR_USER,
  async (username, request) =>
    await get({
      endpoint: '/video/',
      params: { username },
      request,
    })
);
