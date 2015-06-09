/**
 * This file contains common functions that are used between services for
 * PianoShelf.
 */

// Import external modules
import request from 'superagent';
import thenify from 'thenify';

// Import internal modules
import config from '../../config';
import { getCookie } from './cookie';

/**
 * Retrieves a list of headers to send with the request given the Flux object
 */
function getHeaders_(flux) {

  let headers = {
    'Accept': 'application/json',
  };

  // Set authorization token header if it exists.
  let auth = getCookie(config.cookie.authtoken, flux);
  if (auth) headers['Authorization'] = auth;

  // Set CSRF header if it exists.
  let csrf = getCookie(config.cookie.csrf, flux);
  if (csrf) headers['X-CSRFToken'] = csrf;

  return headers;
}


/**
 * Sends a GET request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the URL.
 * @param {Object} options Options for the post request.
 *   @param {Flux=} options.flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function get(endpoint, params, options) {
  return thenify((callback) => {
    request.get(`${config.api.prefix}${endpoint}`)
      .query(params)
      .set(getHeaders_(options.flux))
      .end((error) => callback(error ? new Error(error) : null));
  });
}

/**
 * Sends a POST request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 * @param {Object} options Options for the post request.
 *   @param {boolean=} options.auth Whether we should send it to the auth endpoints.
 *   @param {Flux=} options.flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function post(endpoint, params, options) {
  return thenify((callback) => {
    request.post(`${options.auth ? config.api.authPrefix : config.api.prefix}${endpoint}`)
      .send(params)
      .set(getHeaders_(options.flux))
      .end((error) => callback(error ? new Error(error) : null));
  });
}

/**
 * Sends a PATCH request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 * @param {Object} options Options for the patch request.
 *   @param {boolean=} options.auth Whether we should send it to the auth endpoints.
 *   @param {Flux=} options.flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function patch(endpoint, params) {
  return thenify((callback) => {
    request('PATCH', `${options.auth ? config.api.authPrefix : config.api.prefix}${endpoint}`)
      .send(params)
      .set(getHeaders_(options.flux))
      .end((error) => callback(error ? new Error(error) : null));
  });
}

/**
 * Sends a DELETE request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 * @param {Object} options Options for the delete request.
 *   @param {Flux=} options.flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function del(endpoint, params) {
  return thenify((callback) => {
    request.del(`${config.api.prefix}${endpoint}`)
      .send(params)
      .set(getHeaders_(options.flux))
      .end((error) => callback(error ? new Error(error) : null));
  });
}
