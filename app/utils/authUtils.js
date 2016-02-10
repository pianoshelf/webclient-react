
import { isDispatchedActionError } from './actionUtils';
import { getUser } from '../actions/login';

/**
 * This function returns a react-router transition callback that makes sure
 * a user is authenticated before proceeding. It makes an async call to the
 * getUsers API.
 *
 * @param {Store} store The redux store
 *
 * @return {Function} Callback to feed into react-router
 */
export function requireAuth(store) {
  return function (nextState, transition, callback) {
    store.dispatch(getUser(store))
    .then(response => {
      if (isDispatchedActionError(response)) {
        transition.to('/login/', { redirect: nextState.location.pathname });
      }
    })
    .then(callback);
  };
}

/**
 * This function returns a react-router transition callback that makes sure
 * a user is NOT authenticated before proceeding. It makes an async call to the
 * getUsers API. It also returns the user back to the homepage if they are
 * authenticated.
 *
 * @param {Store} store The redux store
 *
 * @return {Function} Callback to feed into react-router
 */
export function requireNoAuth(store) {
  return function (nextState, transition, callback) {
    store.dispatch(getUser(store))
    .then(response => {
      if (!isDispatchedActionError(response)) {
        transition.to('/', { redirect: nextState.location.pathname });
      }
    })
    .then(callback);
  };
}
