/**
 * This file contains common functions that are used between services for
 * PianoShelf.
 */

// Import external modules
import request from 'superagent';

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

  // Mirror cookies if we're on the server.
  if (__SERVER__) headers['Cookie'] = flux.request.get('Cookie');

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
 * @param {Flux=} flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function get(endpoint, params, flux) {
  return new Promise((resolve, reject) => {
    request.get(`${config.api.prefix}${endpoint}`)
      .query(params)
      .set(getHeaders_(flux))
      .end((error) => error ? reject(error) : resolve());
  });
}

/**
 * Sends a POST request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 * @param {Flux=} flux The Flux object.
 * @param {boolean=} authUrl Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function post(endpoint, params, flux, authUrl) {
  return new Promise((resolve, reject) => {
    request.post(`${authUrl ? config.api.authPrefix : config.api.prefix}${endpoint}`)
      .send(params)
      .set(getHeaders_(flux))
      .end((error) => error ? reject(error) : resolve());
  });
}

/**
 * Sends a PATCH request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 * @param {Flux=} flux The Flux object.
 * @param {boolean=} authUrl Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function patch(endpoint, params, flux, authUrl) {
  return new Promise((resolve, reject) => {
    request('PATCH', `${authUrl ? config.api.authPrefix : config.api.prefix}${endpoint}`)
      .send(params)
      .set(getHeaders_(flux))
      .end((error) => error ? reject(error) : resolve());
  });
}

/**
 * Sends a DELETE request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 * @param {Flux=} flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function del(endpoint, params, flux) {
  return new Promise((resolve, reject) => {
    request.del(`${config.api.prefix}${endpoint}`)
      .send(params)
      .set(getHeaders_(flux))
      .end((error) => error ? reject(error) : resolve());
  });
}
