
// Import modules
import { Flummox } from 'flummox';

// Import actions
import LoginActions from 'app/actions/LoginActions';
import SheetMusicActions from 'app/actions/SheetMusicActions';
import ShelfActions from 'app/actions/ShelfActions';
import ProfileActions from 'app/actions/ProfileActions';

// Import stores
import LoginStore from 'app/stores/LoginStore';
import SheetMusicStore from 'app/stores/SheetMusicStore';

// Export Flux class
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
    this.createStore('sheetmusic', SheetMusicStore, this);

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

