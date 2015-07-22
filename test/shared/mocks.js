
// Import config file
import config from '../../config';

import nock from 'nock';

export function mockApiCall(httpPrefix, path, params) {
  nock('http://localhost:5000')
    .intercept(path, httpPrefix.toUpperCase(), params)
    .reply(200, 'success');
}

export function getFailedResponseError(response) {
  if (response.failedResponse) {
    let data = JSON.parse(response.text);
    return data.actionError;
  } else {
    throw new Error('Response did not fail!');
  }
}

