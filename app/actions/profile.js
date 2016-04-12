
import createAction from '../utils/createAction';
import { actionDone } from '../utils/actionUtils';
import { mapSheetMusic } from '../utils/sheetMusicUtils';
import { get, post, upload } from '../utils/api';
import {
  PROFILE_GET,
  PROFILE_MAKE_DESCRIPTION_EDITABLE,
  PROFILE_UPDATE_DESCRIPTION,
  PROFILE_UPDATE_PROFILE_PICTURE,
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

export const makeDescriptionEditable = createAction(PROFILE_MAKE_DESCRIPTION_EDITABLE);

export const updateProfileDescription = createAction(
  PROFILE_UPDATE_DESCRIPTION,
  async description =>
    await post({
      endpoint: '/profile/',
      params: { description },
    })
);

export const updateProfilePicture = createAction(
  PROFILE_UPDATE_PROFILE_PICTURE,
  async file => {
    const data = new FormData();
    data.append('file', file);
    const response = await upload({
      endpoint: '/submit/profilepicture/',
      formData: data,
    });
    return response;
  }
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
  async (username, page, request) => {
    const response = await get({
      endpoint: '/sheetmusic/uploads/',
      params: { username, page },
      request,
    });

    const { payload, meta } = response;
    return actionDone({
      results: mapSheetMusic(payload),
      count: meta.pagination.count,
    });
  }
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
