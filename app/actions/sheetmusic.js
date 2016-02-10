
import createAction from '../utils/createAction';
import { get, post, patch, del } from '../utils/api';
import {
  SHEETMUSIC_GET,
  SHEETMUSIC_UPDATE,
  SHEETMUSIC_GET_COMPOSERS,
  SHEETMUSIC_GET_TOP,
  SHEETMUSIC_GET_TRENDING,
  SHEETMUSIC_GET_LIST,
  SHEETMUSIC_GET_POPULAR,
  SHEETMUSIC_GET_RATING,
  SHEETMUSIC_POST_RATING,
  SHEETMUSIC_GET_UPLOADS,
  SHEETMUSIC_DELETE,
  SHEETMUSIC_POST_VIDEO,
  SHEETMUSIC_INCR_VIEW_COUNT,
  SHEETMUSIC_DECR_VIEW_COUNT,
  SHEETMUSIC_COMMENT_GET,
  SHEETMUSIC_COMMENT_ADD,
  SHEETMUSIC_COMMENT_DELETE,
  SHEETMUSIC_COMMENT_EDIT,
  SHEETMUSIC_COMMENT_UNDO_REMOVE,
  SHEETMUSIC_COMMENT_UPVOTE,
  SHEETMUSIC_DOWNLOAD,
} from '../constants/sheetmusic';

export const getSheetMusic = createAction(
  SHEETMUSIC_GET,
  async (sheetId, store) => {
    return await get({
      endpoint: `/sheetmusic/${sheetId}/`,
      store,
    });
  }
);

export const updateSheetMusic = createAction(
  SHEETMUSIC_UPDATE,
  async (sheetId, data, store) => {
    return await patch({
      endpoint: `/sheetmusic/${sheetId}/`,
      params: { sheetmusic: data },
      store,
    });
  }
);

export const getComposers = createAction(
  SHEETMUSIC_GET_COMPOSERS,
  async store => {
    return await get({
      endpoint: '/composers/',
      store,
    });
  }
);

export const getTopSheetMusic = createAction(
  SHEETMUSIC_GET_TOP,
  async store => {
    return await get({
      endpoint: '/sheetmusic/top',
      store,
    });
  }
);

export const getTrendingSheetMusic = createAction(
  SHEETMUSIC_GET_TRENDING,
  async (days, results, store) => {
    return await get({
      endpoint: '/sheetmusic/trending/',
      params: { days, results },
      store,
    });
  }
);

export const getSheetMusicList = createAction(
  SHEETMUSIC_GET_LIST,
  async (options, store) => {
    const filters = {
      order_by: options.orderBy,
      page: options.page,
      page_size: options.pageSize,
      sort_by: options.sortBy,
    };

    return await get({
      endpoint: '/sheetmusic/',
      params: filters,
      store,
    });
  }
);

export const getMostPopularSheetMusic = createAction(
  SHEETMUSIC_GET_POPULAR,
  async store => {
    return await get({
      endpoint: '/sheetmusic/',
      params: {
        order_by: 'popular',
        page: 1,
        page_size: 12,
      },
      store,
    });
  }
);

export const getRating = createAction(
  SHEETMUSIC_GET_RATING,
  async (sheetId, store) => {
    return await get({
      endpoint: '/sheetmusic/getrating',
      params: { sheet_id: sheetId },
      store,
    });
  }
);

export const postRating = createAction(
  SHEETMUSIC_POST_RATING,
  async (sheetId, value, store) => {
    return await post({
      endpoint: '/sheetmusic/rate/',
      params: { sheetmusic: sheetId, value },
      store,
    });
  }
);

export const getUploads = createAction(
  SHEETMUSIC_GET_UPLOADS,
  async store => {
    return await get({
      endpoint: '/sheetmusic/uploads/',
      store,
    });
  }
);

export const deleteSheetMusic = createAction(
  SHEETMUSIC_DELETE,
  async (sheetId, store) => {
    return await del({
      endpoint: `/sheetmusic/${sheetId}/`,
      store,
    });
  }
);

export const postVideo = createAction(
  SHEETMUSIC_POST_VIDEO,
  async (link, title, grade, sheetId, store) => {
    if (sheetId === null) {
      return await post({
        endpoint: '/video/',
        params: { link, title, grade },
        store,
      });
    } else {
      return await post({
        endpoint: '/video/',
        params: { link, title, grade, sheetmusicId: sheetId },
        store,
      });
    }
  }
);

export const increaseViewCount = createAction(
  SHEETMUSIC_INCR_VIEW_COUNT,
  async (sheetId, store) => {
    return await post({
      endpoint: '/sheetmusic/viewCount/',
      params: { sheetmusic_id: sheetId },
      store,
    });
  }
);

export const search = createAction(
  SHEETMUSIC_DECR_VIEW_COUNT,
  async (query, store) => {
    return await get({
      endpoint: '/search/',
      params: { query },
      store,
    });
  }
);

export const getComments = createAction(
  SHEETMUSIC_COMMENT_GET,
  async (sheetId, store) => {
    return await get({
      endpoint: '/comment/',
      params: { sheetmusicId: sheetId },
      store,
    });
  }
);

export const addComment = createAction(
  SHEETMUSIC_COMMENT_ADD,
  async (commentText, sheetId, recipientId, store) => {
    return await post({
      endpoint: '/comment/',
      params: { commentText, sheetmusicId: sheetId, recipientId },
      store,
    });
  }
);

export const removeComment = createAction(
  SHEETMUSIC_COMMENT_DELETE,
  async (commentId, store) => {
    return await del({
      endpoint: `/comment/${commentId}/`,
      store,
    });
  }
);

export const editComment = createAction(
  SHEETMUSIC_COMMENT_EDIT,
  async (commentId, commentText, store) => {
    return await patch({
      endpoint: `/comment/${commentId}/`,
      params: { commentText },
      store,
    });
  }
);

export const undoRemoveComment = createAction(
  SHEETMUSIC_COMMENT_UNDO_REMOVE,
  async (commentId, store) => {
    return await post({
      endpoint: `/comment/${commentId}/undodelete/`,
      store,
    });
  }
);

export const upvoteComment = createAction(
  SHEETMUSIC_COMMENT_UPVOTE,
  async (commentId, sheetId, store) => {
    return await get({
      endpoint: '/commentupvote/',
      params: { commentId, sheetmusicId: sheetId },
      store,
    });
  }
);

export const getSheetMusicDownloadLink = createAction(
  SHEETMUSIC_DOWNLOAD,
  async (sheetId, store) => {
    return await get({
      endpoint: '/sheetmusic/downloads/',
      params: { sheetmusic_id: sheetId },
      store,
    });
  }
);

