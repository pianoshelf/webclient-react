/**
 * This file contains functions that make requests to the API server.
 */

// Import external modules
import Cookie from 'cookie-dough';
import request from 'superagent';

// Import internal modules
import config from '../../config';

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
      .end(finishRequest_(flux, resolve, reject));
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
      .end(finishRequest_(flux, resolve, reject));
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
      .end(finishRequest_(flux, resolve, reject));
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
      .end(finishRequest_(flux, resolve, reject));
  });
}

/**
 * Retrieves a list of headers to send with the request given the Flux object
 */
function getHeaders_(flux) {

  // Initial set of headers.
  let headers = {
    'Accept': 'application/json',
  };

  // Mirror cookies if we're on the server.
  if (__SERVER__) headers.Cookie = flux.request.get('Cookie');

  // Set authorization token header if it exists.
  let auth = getCookie_(flux, config.cookie.authtoken);
  if (auth) headers.Authorization = auth;

  // Set CSRF header if it exists.
  let csrf = getCookie_(flux, config.cookie.csrf);
  if (csrf) headers['X-CSRFToken'] = csrf;

  return headers;
}

/**
 * Create a callback that does post-processing on the response.
 */
function finishRequest_(flux, resolve, reject) {

  // Return anonymous function
  return (err, res) => {

    // If we're on the server and the 'Set-Cookie' header is in the response, propogate
    // that to the client by appending it to the response header.
    if (__SERVER__) {
      res.headers['set-cookie'].forEach((header) => {
        flux.request.res.append('Set-Cookie', header);
      });
    }

    // Reject if there's an error, otherwise resolve.
    if (err) reject(err);
    else resolve(res);
  };

}

/**
 * Gets the value of a cookie in an isomorphic way.
 */
function getCookie_(flux, name) {

  // Return cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().get(name);
  }

  // Get cookie from request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(flux.request)).get(name);
  }

}
