/**
 * A function that takes in the dispatch function and a thunk, dispatches it, and returns a
 * promise that resolves once the action creator dispatches a `done` or `error` action.
 *
 * @param {Function} dispatch The dispatch function.
 * @param {Function} thunk A thunks.
 * @return {Promise} A promise that resolves once all actions are finished.
 */
export function dispatchAndPromise(dispatch, thunk) {
  return new Promise(resolve => {
    // Proxy the dispatch function, and resolve the Promise.
    thunk(action => {
      if (action.progress === 'done') resolve(true);
      if (action.progress === 'error') resolve(false);
      return dispatch(action);
    });
  });
}

/**
 * A function that takes in the dispatch function and a set of thunks, dispatches all of them,
 * and returns a promise that resolves once all action creators dispatch a `done` or `error`
 * action.
 *
 * @param {Function} dispatch The dispatch function.
 * @param {Array<Function>} thunks A set of thunks.
 * @return {Promise} A promise that resolves once all actions are finished.
 */
export function dispatchAndPromiseAll(dispatch, thunks) {
  return Promise.all(
    thunks.map(thunk => dispatchAndPromise(dispatch, thunk))
  );
}
