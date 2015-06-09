/**
 * This file interacts with cookies.
 */

// Import external modules
import Cookie from 'cookie-dough';

/**
 * This function gets a cookie.
 *
 * @param {string} name The name of the cookie.
 * @param {Flux=} flux The Flux object.
 */
export function getCookie(name, flux) {

  // Return cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().get(name);
  }

  // Get cookie from request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(flux.request)).get(name);
  }

}

/**
 * This function sets a cookie.
 *
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 * @param {Flux=} flux The Flux object.
 * @param {Object} options Options to pass into cookie-dough
 */
export function setCookie(name, value, flux, options) {

  // Set cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().set(name, value, options);
  }

  // Set cookie using request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(flux.request)).set(name, value, options);
  }

}

