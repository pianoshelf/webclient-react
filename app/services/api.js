/**
 * This file contains common functions that are used between services for
 * PianoShelf.
 */

// Import external modules
import request from 'superagent';

// Import internal modules
import authtoken from './authtoken';
import config from '../../config';

/**
 * Sends a GET request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the URL.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function get(endpoint, params) {
  return new Promise((resolve, reject) => {
    request
      .get(`${config.api.prefix}${endpoint}`)
      .query(params)
      // TODO: Add auth token stuff
      .set('Accept', 'application/json')
      .end((error, res) => error ? reject(error) : resolve(res));
  });
}

/**
 * Sends a POST request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function post(endpoint, params) {
  return new Promise((resolve, reject) => {
    request
      .post(`${config.api.prefix}${endpoint}`)
      .send(params)
      // TODO: Add auth token stuff
      .set('Accept', 'application/json')
      .end((error, res) => error ? reject(error) : resolve(res));
  });
}

/**
 * Sends a DELETE request and returns a promise.
 *
 * @param {string} endpoint The API endpoint.
 * @param {Object} params The query parameters to send in the request.
 *
 * @return {Promise} A promise that resolves when the request is complete.
 */
export function del(endpoint, params) {
  return new Promise((resolve, reject) => {
    request
      .del(`${config.api.prefix}${endpoint}`)
      .send(params)
      // TODO: Add auth token stuff
      .set('Accept', 'application/json')
      .end((error, res) => error ? reject(error) : resolve(res));
  });
}
