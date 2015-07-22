
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { get, post } from '../utils/api';

/**
 * Actions for anything that has to do with sheet music.
 * @class
 */
export default class ProfileActions extends Actions {

  getProfile(username, flux) {
    return get(
      '/profile/',
      { username },
      flux
    );
  }

  updateProfileDescription(description, flux) {
    return post(
      '/profile/',
      { description },
      flux
    );
  }

  getCommentsForUser(username, flux) {
    return get(
      '/comment/',
      { username },
      flux
    );
  }

  getUploadsForUser(username, page, flux) {
    return get(
      '/sheetmusic/uploads/',
      { username, page },
      flux
    );
  }

  getVideosForUser(username, flux) {
    return get(
      '/video/',
      { username },
      flux
    );
  }

}
