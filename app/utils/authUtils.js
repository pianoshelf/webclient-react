/**
 * @module authUtils
 * This module works only on the client side and exports functions that manage the auth token
 * cookie.
 */

import Cookie from 'cookie-dough';
import config from '../../config';

/**
 * Sets the auth token cookie.
 * @param {string} authToken The auth token.
 */
export function setAuthToken(authToken) {
  Cookie().set(config.cookie.authtoken, authToken);
}

/**
 * Deletes the auth token cookie.
 */
export function deleteAuthToken() {
  Cookie().remove(config.cookie.authtoken);
}
