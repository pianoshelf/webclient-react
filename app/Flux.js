
// Import modules
import { Flummox } from 'flummox';

// Import actions
import LoginActions from './actions/LoginActions';
import SheetMusicActions from './actions/SheetMusicActions';
import ShelfActions from './actions/ShelfActions';
import ProfileActions from './actions/ProfileActions';
import ProgressActions from './actions/ProgressActions';

// Import stores
import LoginStore from './stores/LoginStore';
import ProgressStore from './stores/ProgressStore';
import SheetMusicStore from './stores/SheetMusicStore';
import CommentsStore from './stores/CommentsStore';

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
    this.createActions('profile', ProfileActions);
    this.createActions('progress', ProgressActions);
    this.createActions('sheetmusic', SheetMusicActions);
    this.createActions('shelf', ShelfActions);

    this.createStore('login', LoginStore, this);
    this.createStore('progress', ProgressStore, this);
    this.createStore('sheetmusic', SheetMusicStore, this);
    this.createStore('comments', CommentsStore, this);
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

