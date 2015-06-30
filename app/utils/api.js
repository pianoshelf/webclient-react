/**
 * This file contains functions that make requests to the API server.
 */

// Import external modules
import Cookie from 'cookie-dough';
import request from 'superagent';

// Import internal modules
import config from 'config';

// Select the correct URL prefix based on environment variables.
let apiUrl, authUrl;
if (process.env.NODE_ENV === 'production') {
  apiUrl = config.api.prod.prefix;
  authUrl = config.api.prod.authPrefix;
} else {
  apiUrl = config.api.dev.prefix;
  authUrl = config.api.dev.authPrefix;
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

/**
 * Retrieves a list of headers to send with the request given the Flux object
 */
function getHeaders_(flux) {

  // Initial set of headers.
  let headers = {};

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
  return function(err, res) {

    // If we're on the server and the 'Set-Cookie' header is in the response, propogate
    // that to the client by appending it to the response header.
    if (!err && __SERVER__ && res.headers['set-cookie']) {
      res.headers['set-cookie'].forEach((header) => {
        flux.request.res.append('Set-Cookie', header);
      });
    }

    // Reject if there's an error, otherwise resolve.
    if (err) reject(res);
    else resolve(res);
  };
}

/**
 * Sends a GET request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the URL.
 * @param {Flux} flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function get(endpoint, params, flux) {
  return new Promise((resolve, reject) => {
    request.get(`${apiUrl}${endpoint}`)
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
 * @param {Flux} flux The Flux object.
 * @param {boolean=} auth Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function post(endpoint, params, flux, auth) {
  return new Promise((resolve, reject) => {
    request.post(`${auth ? authUrl : apiUrl}${endpoint}`)
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
 * @param {Flux} flux The Flux object.
 * @param {boolean=} auth Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function patch(endpoint, params, flux, auth) {
  return new Promise((resolve, reject) => {
    request('PATCH', `${auth ? authUrl : apiUrl}${endpoint}`)
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
 * @param {Flux} flux The Flux object.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function del(endpoint, params, flux) {
  return new Promise((resolve, reject) => {
    request.del(`${apiUrl}${endpoint}`)
      .send(params)
      .set(getHeaders_(flux))
      .end(finishRequest_(flux, resolve, reject));
  });
}

/**
 * Sets the auth token cookie.
 *
 * @param {string} authToken The auth token.
 * @param {Flux} flux The flux object.
 */
export function setAuthToken(authToken, flux) {

  // Return cookie if we're on the client.
  if (__CLIENT__) {
    Cookie().set(config.cookie.authtoken, name);
  }

  // Set cookie from request if we're on the server.
  if (__SERVER__) {
    (new Cookie(flux.request)).set(config.cookie.authtoken, name);
  }
}

/**
 * Returns a failed promise with the correct error format. This is
 * useful when we want to failed promise without making an API call,
 * due to a clearly invalid value or something.
 *
 * @param {Object} dataToReturn The data we want to send to the store.
 *
 * @return {Promise} A failed promise with the correct error format.
 */
export function failedResponse(dataToReturn) {
  let stringifiedData = JSON.stringify(dataToReturn);
  return Promise.reject({
    failedResponse: true,
    text: stringifiedData,
  });
}
