
// Import modules
import { Flummox } from 'flummox';


export default class Flux extends Flummox {

  /**
   * @param {Express.Request=} request The express server context if in a server context.
   */
  constructor(request) {
    super();

    // Set this instance's request object to the request provided.
    this.request_ = request;

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

