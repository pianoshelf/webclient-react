
import { isDispatchedActionError } from '../../app/utils/actionUtils';

export function getFailedResponseError(response) {
  if (isDispatchedActionError(response)) {
    return response.code;
  }
  throw Error('Response did not fail!');
}

export function getSuccessResponsePayload(response) {
  if (!isDispatchedActionError(response)) {
    return response.payload;
  }
  throw Error('Response did not succeed!');
}
