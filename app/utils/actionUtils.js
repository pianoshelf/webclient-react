/**
 * @module actionUtils
 * A set of utility functions that generate an action creator in the right format.
 */

/**
 * Returns a start action given an action payload.
 * @param {Object} payload The payload of the action.
 * @return {Object} Object representing a 'done' action.
 */
export function actionDone(payload) {
  if (typeof payload !== 'undefined') {
    return { error: false, payload };
  } else {
    return { error: false };
  }
}

/**
 * Returns an error action given an action error code and payload.
 * @param {Number} errorCode The error code of the action.
 * @param {Object} payload The payload of the action.
 * @return {Object} Object representing a 'error' action.
 */
export function actionError(errorCode, payload) {
  if (typeof payload !== 'undefined') {
    return { error: true, payload, code: errorCode };
  } else {
    return { error: true, code: errorCode };
  }
}

/**
 * Returns true or false depending on if the provided action is an error.
 * @param {Object} action The action to check.
 * @return {Boolean} Whether or not the provided action is an error.
 */
export function isActionError(action) {
  return action.error;
}

/**
 * Returns true or false depending on if the provided action is an error.
 * This function is meant for the action format fed into the dispatcher.
 * @param {Object} action The action to check.
 * @return {Boolean} Whether or not the provided action is an error.
 */
export function isDispatchedActionError(action) {
  return action.progress === 'error';
}
