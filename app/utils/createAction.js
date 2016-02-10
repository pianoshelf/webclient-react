/**
 * This utility mirrors the functionality provided by the createAction function in the
 * redux-actions package, but it will be adapted to our format. An action will be dispatched at
 * the start of the Promise, when it's done, and when there's an error.
 *
 * @param {String} type Constant representing what the action is.
 * @param {Promise} handler Sync or async function or promise that will create the action.
 *
 * @returns {Function} A thunk that can be passed into the dispatcher.
 */
export default function createAction(type, handler) {
  return dispatch => {
    dispatch({ type, progress: 'start' });
    return Promise.resolve(handler).then(action => {
      const { error, code, payload } = action;
      if (error) {
        return dispatch({ type, payload, code, progress: 'error' });
      } else {
        return dispatch({ type, payload, progress: 'done' });
      }
    });
  };
}
