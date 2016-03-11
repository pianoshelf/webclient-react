/**
 * This file contains functions that make requests to the API server.
 */

// Import external modules
import Cookie from 'cookie-dough';
import superagent from 'superagent';

// Import internal modules
import config from '../../config';
import { errors } from './constants';
import { actionDone, actionError } from './actionUtils';

// Select the correct URL prefix based on environment variables.
let apiUrl;
let authUrl;
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
function getCookie(request, name) {
  // Return cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().get(name);
  }

  // Get cookie from request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(request.request)).get(name);
  }

  return null;
}

/**
 * Retrieves a list of headers to send with the request given the Store object
 */
function getHeaders(request) {
  // Initial set of headers.
  const headers = {};

  // Set authorization token header if it exists.
  const auth = getCookie(request, config.cookie.authtoken);
  if (auth) headers.Authorization = auth;

  // Set CSRF header if it exists.
  const csrf = getCookie(request, config.cookie.csrf);
  if (csrf) headers['X-CSRFToken'] = csrf;

  return headers;
}

/**
 * Create a callback that does post-processing on the response.
 */
function finishRequest(resolve) {
  // Return anonymous function
  return (err, res) => {
    // Reject if there's an error, otherwise resolve.
    if (err) {
      if (res && res.status !== 500) {
        const { meta = {} } = JSON.parse(res.text);
        resolve(actionError(errors.API_ERROR, meta));
      } else {
        resolve(actionError(errors.NETWORK_ERROR));
      }
    } else {
      const { data = {}, meta = {} } = JSON.parse(res.text);
      resolve(actionDone(data, meta));
    }
  };
}

/**
 * Sends a GET request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the URL.
 *   @param {Express.Request} options.request The request object.
 *   @param {Boolean=} options.auth Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function get({ endpoint, params = {}, request, auth = false }) {
  const baseUrl = __CLIENT__ ? '' : `http://localhost:${config.ports.django}`;
  return new Promise(resolve => {
    const headers = getHeaders(request);

    // Mirror cookies if we're on the server.
    if (__SERVER__) headers.Cookie = request.request.get('Cookie');

    superagent.get(`${baseUrl}${auth ? authUrl : apiUrl}${endpoint}`)
      .query(params)
      .set(headers)
      .end((err, res) => {
        // If we're on the server and the 'Set-Cookie' header is in the response, propogate
        // that to the client by appending it to the response header.
        if (!err && __SERVER__ && res.headers['set-cookie']) {
          res.headers['set-cookie'].forEach(header => {
            request.request.res.append('Set-Cookie', header);
          });
        }

        finishRequest(resolve)(err, res);
      });
  });
}

/**
 * Sends a POST request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the request.
 *   @param {Boolean=} options.auth Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function post({ endpoint, params = {}, auth = false }) {
  const baseUrl = __CLIENT__ ? '' : `http://localhost:${config.ports.django}`;
  return new Promise(resolve => {
    superagent.post(`${baseUrl}${auth ? authUrl : apiUrl}${endpoint}`)
      .send(params)
      .set(getHeaders())
      .end(finishRequest(resolve));
  });
}

/**
 * Sends a PATCH request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the request.
 *   @param {Boolean=} options.auth Whether we should send it to the auth endpoints.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function patch({ endpoint, params = {}, auth = false }) {
  const baseUrl = __CLIENT__ ? '' : `http://localhost:${config.ports.django}`;
  return new Promise(resolve => {
    superagent('PATCH', `${baseUrl}${auth ? authUrl : apiUrl}${endpoint}`)
      .send(params)
      .set(getHeaders())
      .end(finishRequest(resolve));
  });
}

/**
 * Sends a DELETE request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the request.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function del({ endpoint, params = {} }) {
  const baseUrl = __CLIENT__ ? '' : `http://localhost:${config.ports.django}`;
  return new Promise(resolve => {
    superagent.del(`${baseUrl}${apiUrl}${endpoint}`)
      .send(params)
      .set(getHeaders())
      .end(finishRequest(resolve));
  });
}
