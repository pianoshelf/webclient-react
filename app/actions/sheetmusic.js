
import createAction from '../utils/createAction';
import { convertSheetMusic, mapSheetMusic } from '../utils/sheetMusicUtils';
import { isActionError, actionDone } from '../utils/actionUtils';
import { get, post, patch, del } from '../utils/api';
import {
  SHEETMUSIC_GET,
  SHEETMUSIC_UPDATE,
  SHEETMUSIC_GET_COMPOSERS,
  SHEETMUSIC_GET_TRENDING,
  SHEETMUSIC_GET_LIST,
  SHEETMUSIC_GET_POPULAR,
  SHEETMUSIC_GET_RATING,
  SHEETMUSIC_POST_RATING,
  SHEETMUSIC_GET_UPLOADS,
  SHEETMUSIC_DELETE,
  SHEETMUSIC_POST_VIDEO,
  SHEETMUSIC_INCR_VIEW_COUNT,
  SHEETMUSIC_COMMENT_GET,
  SHEETMUSIC_COMMENT_ADD,
  SHEETMUSIC_COMMENT_DELETE,
  SHEETMUSIC_COMMENT_EDIT,
  SHEETMUSIC_COMMENT_UNDO_REMOVE,
  SHEETMUSIC_COMMENT_UPVOTE,
  SHEETMUSIC_DOWNLOAD,
} from '../constants/sheetmusic';
import {
  SHELF_ADD,
  SHELF_REMOVE,
} from '../constants/shelf';

/**
 * Sheet music manipulation functions
 */

export const getSheetMusic = createAction(
  SHEETMUSIC_GET,
  async (sheetId, request) => {
    const response = await get({
      endpoint: `/sheetmusic/${sheetId}/`,
      request,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    const { payload } = response;
    return actionDone(convertSheetMusic(payload));
  }
);

export const updateSheetMusic = createAction(
  SHEETMUSIC_UPDATE,
  async (sheetId, data) =>
    await patch({
      endpoint: `/sheetmusic/${sheetId}/`,
      params: { sheetmusic: data },
    })
);

export const deleteSheetMusic = createAction(
  SHEETMUSIC_DELETE,
  async sheetId =>
    await del({
      endpoint: `/sheetmusic/${sheetId}/`,
    })
);

/**
 * Getting list of sheet music
 */

export const getTrendingSheetMusic = createAction(
  SHEETMUSIC_GET_TRENDING,
  async (days, results, request) => {
    const response = await get({
      endpoint: '/sheetmusic/',
      params: {
        order_by: 'trending',
        days,
        results,
      },
      request,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    const { payload, meta } = response;
    return actionDone({
      results: mapSheetMusic(payload),
      count: meta.pagination.count,
    });
  }
);

export const getSheetMusicList = createAction(
  SHEETMUSIC_GET_LIST,
  async (options, request) => {
    const filters = {
      order_by: options.orderBy,
      page: options.page,
      page_size: options.pageSize,
      sort_by: options.sortBy,
    };

    const response = await get({
      endpoint: '/sheetmusic/',
      params: filters,
      request,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    const { payload, meta } = response;
    return actionDone({
      results: mapSheetMusic(payload),
      count: meta.pagination.count,
    });
  }
);

export const getMostPopularSheetMusic = createAction(
  SHEETMUSIC_GET_POPULAR,
  async request => {
    const response = await get({
      endpoint: '/sheetmusic/',
      params: {
        order_by: 'popular',
        page: 1,
        page_size: 12,
      },
      request,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    const { payload, meta } = response;
    return actionDone({
      results: mapSheetMusic(payload),
      count: meta.pagination.count,
    });
  }
);

/**
 * Getting details of sheet music
 */

export const getComposers = createAction(
  SHEETMUSIC_GET_COMPOSERS,
  async request =>
    await get({
      endpoint: '/composers/',
      request,
    })
);

export const getRating = createAction(
  SHEETMUSIC_GET_RATING,
  async (sheetId, request) =>
    await get({
      endpoint: '/sheetmusic/getrating',
      params: { sheet_id: sheetId },
      request,
    })
);

export const postRating = createAction(
  SHEETMUSIC_POST_RATING,
  async (sheetId, value) =>
    await post({
      endpoint: '/sheetmusic/rate/',
      params: { sheetmusic: sheetId, value },
    })
);

export const getUploads = createAction(
  SHEETMUSIC_GET_UPLOADS,
  async request =>
    await get({
      endpoint: '/sheetmusic/uploads/',
      request,
    })
);

export const postVideo = createAction(
  SHEETMUSIC_POST_VIDEO,
  async (link, title, grade, sheetId) => {
    if (sheetId === null) {
      return await post({
        endpoint: '/video/',
        params: { link, title, grade },
      });
    }
    return await post({
      endpoint: '/video/',
      params: { link, title, grade, sheetmusicId: sheetId },
    });
  }
);

export const increaseViewCount = createAction(
  SHEETMUSIC_INCR_VIEW_COUNT,
  async sheetId =>
    await post({
      endpoint: '/sheetmusic/viewCount/',
      params: { sheetmusic_id: sheetId },
    })
);

export const getComments = createAction(
  SHEETMUSIC_COMMENT_GET,
  async (sheetId, request) =>
    await get({
      endpoint: '/comment/',
      params: { sheetmusicId: sheetId },
      request,
    })
);

export const addComment = createAction(
  SHEETMUSIC_COMMENT_ADD,
  async (commentText, sheetId, recipientId) =>
    await post({
      endpoint: '/comment/',
      params: { commentText, sheetmusicId: sheetId, recipientId },
    })
);

export const removeComment = createAction(
  SHEETMUSIC_COMMENT_DELETE,
  async (commentId) =>
    await del({
      endpoint: `/comment/${commentId}/`,
    })
);

export const editComment = createAction(
  SHEETMUSIC_COMMENT_EDIT,
  async (commentId, commentText) =>
    await patch({
      endpoint: `/comment/${commentId}/`,
      params: { commentText },
    })
);

export const undoRemoveComment = createAction(
  SHEETMUSIC_COMMENT_UNDO_REMOVE,
  async (commentId) =>
    await post({
      endpoint: `/comment/${commentId}/undodelete/`,
    })
);

export const upvoteComment = createAction(
  SHEETMUSIC_COMMENT_UPVOTE,
  async (commentId, sheetId, request) =>
    await get({
      endpoint: '/commentupvote/',
      params: { commentId, sheetmusicId: sheetId },
      request,
    })
);

export const getSheetMusicDownloadLink = createAction(
  SHEETMUSIC_DOWNLOAD,
  async (sheetId, request) =>
    await get({
      endpoint: '/sheetmusic/downloads/',
      params: { sheetmusic_id: sheetId },
      request,
    })
);

export const addToShelf = createAction(
  SHELF_ADD,
  async sheetId =>
    await post({
      endpoint: '/shelf/',
      params: { sheetmusic: sheetId },
    })
);

export const removeFromShelf = createAction(
  SHELF_REMOVE,
  async sheetId =>
    await del({
      endpoint: '/shelf/',
      params: { sheetmusic: sheetId },
    })
);
