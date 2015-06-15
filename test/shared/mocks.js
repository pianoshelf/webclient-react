
// Import config file
import config from 'config.js';

export function mockApiCall(httpPrefix, path, params) {
  let nock = require('nock');
  nock('http://localhost:5000')
    .intercept(path, httpPrefix.toUpperCase(), params)
    .reply(200, 'success');
}


