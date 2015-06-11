
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { get, post, patch, del } from '../utils/api';

/**
 * Actions for anything that has to do with sheet music.
 * @class
 */
export default class SheetMusicActions extends Actions {

  getSheetMusic(sheetId, flux) {
    return get(
      `/sheetmusic/${sheetId}`,
      {},
      flux
    );
  }

  updateSheetMusic(sheetId, data, flux) {
    return patch(
      `/sheetmusic/${sheetId}`,
      { sheetmusic: data },
      flux
    );
  }

  getComposers(flux) {
    return get(
      '/composers/',
      {},
      flux
    );
  }

  getTopSheetMusic(flux) {
    return get(
      '/sheetmusic/top',
      {},
      flux
    );
  }

  getTrendingSheetMusic(days, flux) {
    return get(
      '/sheetmusic/trending',
      { days, results: 10 },
      flux
    );
  }

  getSheetMusicList(filterOptions, flux) {
    return get(
      '/sheetmusic/',
      filterOptions,
      flux
    );
  }

  getRating(sheetId, flux) {
    return get(
      '/sheetmusic/getrating',
      { sheet_id: sheetId },
      flux
    );
  }

  postRating(sheetId, value, flux) {
    return post(
      '/sheetmusic/rate/',
      { sheetmusic: sheetId, value },
      flux
    );
  }

  getUploads(flux) {
    return get(
      '/sheetmusic/uploads/',
      {},
      flux
    );
  }

  deleteSheetMusic(sheetId, flux) {
    return del(
      `/sheetmusic/${sheetId}`,
      {},
      flux
    );
  }

  postVideo(link, title, grade, sheetId, flux) {
    if (sheetId === null) {
      post(
        '/video/',
        { link, title, grade },
        flux
      );
    } else {
      post(
        '/video/',
        { link, title, grade, sheetmusicId: sheetId },
        flux
      );
    }
  }

  increaseViewCount(sheetId, flux) {
    return post(
      '/sheetmusic/viewCount/',
      { sheetmusic_id: sheetId },
      flux
    );
  }

  search(query, flux) {
    return get(
      '/search',
      { query },
      flux
    );
  }

  getComments(sheetId, flux) {
    return get(
      '/comment/',
      { sheetmusicId: sheetId },
      flux
    );
  }

  addComment(commentText, sheetId, recipientId, flux) {
    return post(
      '/comment/',
      { commentText, sheetmusicId: sheetId, recipientId },
      flux
    );
  }

  removeComment(commentId, flux) {
    return del(
      `/comment/${commentId}/`,
      {},
      flux
    );
  }

  editComment(commentId, commentText, flux) {
    return patch(
      `/comment/${commentId}/`,
      {},
      flux
    );
  }

  undoRemoveComment(commentId, flux) {
    return post(
      `/comment/${commentId}/undodelete/`,
      {},
      flux
    );
  }

  upvoteComment(commentId, sheetId, flux) {
    return get(
      '/commentupvote/',
      { commentId, sheetmusicId: sheetId },
      flux
    );
  }

}
