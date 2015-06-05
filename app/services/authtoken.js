/**
 * This file interacts with cookies to store and retrieve auth tokens.
 */

// Import external modules
import Cookie from 'cookie-dough';

// Import internal modules
import config from '../../config';

/**
 * This function gets a cookie value that contains the authentication token.
 *
 * @param {Express.Request=} request The ExpressJS request object. Only
 *   relevant to the server-side.
 */
export function getAuthToken(request) {

  // Return cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().get(config.cookie.authToken);
  }

  // Get cookie from request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(request)).get(config.cookie.authtoken);
  }

}

/**
 * This function sets a cookie with the specified authentication token.
 *
 * @param {string} authToken The authentication token.
 * @param {Express.Request=} request The ExpressJS request object. Only
 *   relevant to the server-side.
 */
export function setAuthToken(authToken, request) {

  // Set cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().set(config.cookie.authToken, authToken);
  }

  // Set cookie using request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(request)).set(config.cookie.authtoken, authToken);
  }

}
