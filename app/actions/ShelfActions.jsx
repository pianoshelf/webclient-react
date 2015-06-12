
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { get, post, del } from '../utils/api';

/**
 * Actions for anything that has to do with sheet music.
 * @class
 */
export default class ShelfActions extends Actions {

  getShelf(username, flux) {
    return get(
      '/shelf/',
      { username },
      flux
    );
  }

  addToShelf(sheetId, flux) {
    return post(
      '/shelf/',
      { sheetmusic: sheetId },
      flux
    );
  }

  removeFromShelf(sheetId, flux) {
    return del(
      `/shelf/`,
      { sheetmusic: sheetId },
      flux
    );
  }

}
