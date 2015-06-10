
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { get, post } from '../services/api';

/**
 * Actions for anything that has to do with sheet music.
 * @class
 */
export default class ProfileActions extends Actions {

  getProfile(username) {
    return get(
      '/profile/',
      { username },
      flux
    );
  }

  updateProfileDescription(description) {
    return post(
      '/profile/',
      { description },
      flux
    );
  }

  getCommentsForUser(username) {
    return get(
      '/comment/',
      { username },
      flux
    );
  }

  getUploadsForUser(username, page) {
    return get(
      '/sheetmusic/uploads/',
      { username, page },
      flux
    );
  }

  getVideosForUser(username) {
    return get(
      '/video/',
      { username },
      flux
    );
  }

}
