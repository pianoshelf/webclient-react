
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

  // SHEETMUSIC_GET_TOP,
/**
 * Sheet music manipulation functions
 */

export const getSheetMusic = createAction(
  SHEETMUSIC_GET,
  async (sheetId, store) => {
    const response = await get({
      endpoint: `/sheetmusic/${sheetId}/`,
      store,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    return actionDone(convertSheetMusic(response.payload));
  }
);

export const updateSheetMusic = createAction(
  SHEETMUSIC_UPDATE,
  async (sheetId, data) => {
    return await patch({
      endpoint: `/sheetmusic/${sheetId}/`,
      params: { sheetmusic: data },
    });
  }
);

export const deleteSheetMusic = createAction(
  SHEETMUSIC_DELETE,
  async sheetId => {
    return await del({
      endpoint: `/sheetmusic/${sheetId}/`,
    });
  }
);

/**
 * Getting list of sheet music
 */

// export const getTopSheetMusic = createAction(
  // SHEETMUSIC_GET_TOP,
  // async store => {
    // const response = await get({
      // endpoint: '/sheetmusic/top',
      // store,
    // });

    // if (isActionError(response)) {
      // // TODO: Find any errors to put here
      // return response;
    // }

    // return actionDone(mapSheetMusic(response.payload, result => result.sheetmusic));
  // }
// );

export const getTrendingSheetMusic = createAction(
  SHEETMUSIC_GET_TRENDING,
  async (days, results, store) => {
    const response = await get({
      endpoint: '/sheetmusic/trending/',
      params: { days, results },
      store,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    return actionDone(mapSheetMusic(response.payload, result => result.sheetmusic));
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

    const response = await get({
      endpoint: '/sheetmusic/',
      params: filters,
      store,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    return actionDone(mapSheetMusic(response.payload, result => result.sheetmusic));
  }
);

export const getMostPopularSheetMusic = createAction(
  SHEETMUSIC_GET_POPULAR,
  async store => {
    const response = await get({
      endpoint: '/sheetmusic/',
      params: {
        order_by: 'popular',
        page: 1,
        page_size: 12,
      },
      store,
    });

    if (isActionError(response)) {
      // TODO: Find any errors to put here
      return response;
    }

    return actionDone(mapSheetMusic(response.payload.results));
  }
);

/**
 * Getting details of sheet music
 */

export const getComposers = createAction(
  SHEETMUSIC_GET_COMPOSERS,
  async store => {
    return await get({
      endpoint: '/composers/',
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
  async (sheetId, value) => {
    return await post({
      endpoint: '/sheetmusic/rate/',
      params: { sheetmusic: sheetId, value },
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

export const postVideo = createAction(
  SHEETMUSIC_POST_VIDEO,
  async (link, title, grade, sheetId) => {
    if (sheetId === null) {
      return await post({
        endpoint: '/video/',
        params: { link, title, grade },
      });
    } else {
      return await post({
        endpoint: '/video/',
        params: { link, title, grade, sheetmusicId: sheetId },
      });
    }
  }
);

export const increaseViewCount = createAction(
  SHEETMUSIC_INCR_VIEW_COUNT,
  async sheetId => {
    return await post({
      endpoint: '/sheetmusic/viewCount/',
      params: { sheetmusic_id: sheetId },
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
  async (commentText, sheetId, recipientId) => {
    return await post({
      endpoint: '/comment/',
      params: { commentText, sheetmusicId: sheetId, recipientId },
    });
  }
);

export const removeComment = createAction(
  SHEETMUSIC_COMMENT_DELETE,
  async (commentId) => {
    return await del({
      endpoint: `/comment/${commentId}/`,
    });
  }
);

export const editComment = createAction(
  SHEETMUSIC_COMMENT_EDIT,
  async (commentId, commentText) => {
    return await patch({
      endpoint: `/comment/${commentId}/`,
      params: { commentText },
    });
  }
);

export const undoRemoveComment = createAction(
  SHEETMUSIC_COMMENT_UNDO_REMOVE,
  async (commentId) => {
    return await post({
      endpoint: `/comment/${commentId}/undodelete/`,
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
