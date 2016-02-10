/**
 * @module actionUtils
 * A set of utility functions that generate an action creator in the right format.
 */

/**
 * Returns a start action given an action type.
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
 * Returns an error action given an action type.
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
