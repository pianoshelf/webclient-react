
// Import modules
import { Flummox } from 'flummox';

import LoginActions from './actions/LoginActions';
import SheetMusicActions from './actions/SheetMusicActions';
import ShelfActions from './actions/ShelfActions';
import ProfileActions from './actions/ProfileActions';

import LoginStore from './stores/LoginStore';

export default class Flux extends Flummox {

  /**
   * @param {Express.Request=} request The express server context if in a server context.
   */
  constructor(request) {
    super();

    // Set this instance's request object to the request provided.
    this.request_ = request;

    this.createActions('login', LoginActions);
    this.createStore('login', LoginStore, this);

    this.createActions('sheetmusic', SheetMusicActions);
    this.createActions('shelf', ShelfActions);
    this.createActions('profile', ProfileActions);
  }

  /**
   * Gets the current request object, useful in the server context.
   *
   * @return {Express.Request} The current request object.
   */
  get request() {
    return this.request_;
  }

}

