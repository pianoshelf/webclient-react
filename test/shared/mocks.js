
import nock from 'nock';

import { isActionError } from '../../app/utils/actionUtils';

export function mockApiCall(httpPrefix, path, params) {
  nock('http://localhost:5000')
    .intercept(path, httpPrefix.toUpperCase(), params)
    .reply(200, '"success"');
}

export function getFailedResponseError(response) {
  if (isActionError(response)) {
    return response.code;
  } else {
    throw new Error('Response did not fail!');
  }
}

