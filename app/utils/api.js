/**
 * This file contains functions that make requests to the API server.
 */

// Import external modules
import Cookie from 'cookie-dough';
import qs from 'qs';

// Import internal modules
import config from '../../config';
import { errors } from './constants';
import { actionDone, actionError } from './actionUtils';

/**
 * Gets the value of a cookie in an isomorphic way.
 */
function getCookie(name, request) {
  // Return cookie if we're on the client.
  if (__CLIENT__) {
    return Cookie().get(name);
  }

  // Get cookie from request if we're on the server.
  if (__SERVER__) {
    return (new Cookie(request)).get(name);
  }

  return null;
}

/**
 * Gets the absolute URL given the endpoint.
 */
function getURL(endpoint, params) {
  const BASE_URL = __CLIENT__ ?
    window.location.origin :
    `http://localhost:${config.ports.django}`;

  if (typeof params === 'object' && Object.keys(params).length > 0) {
    return `${BASE_URL}/api${endpoint}?${qs.stringify(params)}`;
  }

  return `${BASE_URL}/api${endpoint}`;
}

/**
 * Retrieves a list of headers to send with the request given the Store object
 */
function getHeaders(request) {
  // Initial set of headers.
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  if (request) {
    // Mirror cookies if we're on the server.
    if (__SERVER__) {
      headers.append('Cookie', request.get('Cookie'));
    }

    // Set authorization token header if it exists.
    const auth = getCookie(config.cookie.authtoken, request);
    if (auth) {
      headers.append('Authorization', auth);
    }

    // Set CSRF header if it exists.
    const csrf = getCookie(config.cookie.csrf, request);
    if (csrf) {
      headers.append('X-CSRFToken', csrf);
    }
  }

  return headers;
}

/**
 * Finish off the request by fulfilling common errors.
 */
async function finishRequest(response) {
  if (response.status === 500) {
    return actionError(errors.NETWORK_ERROR);
  }

  if (!response.ok) {
    const { meta = {} } = await response.json();
    return actionError(errors.API_ERROR, meta);
  }

  const { data = {}, meta = {} } = await response.json();
  return actionDone(data, meta);
}

/**
 * Sends a GET request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the URL.
 *   @param {Express.Request} options.request The request object.
 * @return {Promise} A promise that resolves when the request is complete.
 */
export async function get({ endpoint, params = {}, request }) {
  try {
    const body = await fetch(getURL(endpoint, params), {
      method: 'GET',
      headers: getHeaders(request),
      credentials: 'same-origin',
    });

    return await finishRequest(body);
  } catch (e) {
    console.log(e);
    console.log(e.stack);
    return actionError(errors.NETWORK_ERROR);
  }
}

/**
 * Sends a POST request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the request.
 * @return {Promise} A promise that resolves when the request is complete.
 */
export async function post({ endpoint, params = {} }) {
  try {
    const body = await fetch(getURL(endpoint), {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(params),
      credentials: 'same-origin',
    });

    return await finishRequest(body);
  } catch (e) {
    return actionError(errors.NETWORK_ERROR);
  }
}

/**
 * Sends a PATCH request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the request.
 * @return {Promise} A promise that resolves when the request is complete.
 */
export async function patch({ endpoint, params = {} }) {
  try {
    const body = await fetch(getURL(endpoint), {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(params),
      credentials: 'same-origin',
    });

    return await finishRequest(body);
  } catch (e) {
    return actionError(errors.NETWORK_ERROR);
  }
}

/**
 * Sends a DELETE request and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.params The query parameters to send in the request.
 * @return {Promise} A promise that resolves when the request is complete.
 */
export async function del({ endpoint, params = {} }) {
  try {
    const body = await fetch(getURL(endpoint), {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify(params),
      credentials: 'same-origin',
    });

    return await finishRequest(body);
  } catch (e) {
    return actionError(errors.NETWORK_ERROR);
  }
}

/**
 * Sends a POST request containing form data and returns a promise.
 *
 * @param {Object} options
 *   @param {string} options.endpoint The API endpoint.
 *   @param {Object} options.formData The FormData object to send in the request.
 * @return {Promise} A promise that resolves when the request is complete.
 */
export async function upload({ endpoint, formData }) {
  try {
    const body = await fetch(getURL(endpoint), {
      method: 'POST',
      headers: getHeaders(),
      body: formData,
      credentials: 'same-origin',
    });

    return await finishRequest(body);
  } catch (e) {
    return actionError(errors.NETWORK_ERROR);
  }
}
