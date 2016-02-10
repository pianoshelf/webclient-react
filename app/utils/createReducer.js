/**
 * @function createReducer
 *
 * This utility function will mirror the functionality of the handleActions function provided by
 * the redux-actions package, but will be adapted to our action format. Actions dispatched by the
 * createAction utility can be parsed, so we can control what happens at the start, done, and error
 * phases of the action.
 *
 * @param {Object} initialState The initial state of this part of the store.
 * @param {Object<String,Function>} reducerObject A mapping from action types to functions, or
 *   action types to objects that describe each level of the function.
 * @return {Function} A reducer.
 */
export default function createReducer(initialState = {}, reducerObject) {
  const reducers = Object.keys(reducerObject).map(type => {
    // Get the function
    const reducer = reducerObject[type];

    // Return a reducer that determines the next state given an action
    return (state, action) => {
      // If action doesn't match our type, return the original state
      if (action.type !== type) {
        return state;
      }

      // If a function was passed in, execute only if it's a `done` task, else return state
      if (typeof reducer === 'function') {
        if (action.progress === 'done') {
          return reducer(state, action.payload);
        } else {
          return state;
        }
      }

      // If it is a mapping, execute the relevant methods
      if (typeof reducer === 'object') {
        if (reducer.start && action.progress === 'start') {
          return reducer.start(state);
        } else if (reducer.progress && action.progress === 'progress') {
          return reducer.progress(state, action.payload);
        } else if (reducer.done && action.progress === 'done') {
          return reducer.done(state, action.payload);
        } else if (reducer.error && action.progress === 'error') {
          return reducer.error(state, action.payload, action.code);
        }
      }

      // If we get this far, the action was in an invalid format
      throw Error('Invariant violation: action was a weird format.');
    };
  });

  // Return the wrapped reducer
  return (state = initialState, action) => {
    return reducers.reduce(
      (prevState, reducer) => reducer(prevState, action),
      state
    );
  };
}
