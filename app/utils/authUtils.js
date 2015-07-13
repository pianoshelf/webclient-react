
import defer from 'lodash/function/defer';
import { Navigation } from 'react-router';

import { setAuthToken, deleteAuthToken } from './api';
import { success } from './constants';

/**
 * This function returns a react-router transition callback that makes sure
 * a user is authenticated before proceeding. It makes an async call to the
 * getUsers API.
 *
 * @param {Flux} flux The flux object
 *
 * @return {Function} Callback to feed into react-router
 */
export function requireAuth(flux) {
  return function (nextState, transition, callback) {
    flux.getActions('login').getUser(flux).then(() => {
      callback();
    }).catch(() => {
      transition.to('/login/', { redirect: nextState.location.pathname });
      callback();
    });
  }
}

/**
 * This function returns a react-router transition callback that makes sure
 * a user is NOT authenticated before proceeding. It makes an async call to the
 * getUsers API. It also returns the user back to the homepage if they are
 * authenticated.
 *
 * @param {Flux} flux The flux object
 *
 * @return {Function} Callback to feed into react-router
 */
export function requireNoAuth(flux) {
  return function (nextState, transition, callback) {
    flux.getActions('login').getUser(flux).then(() => {
      transition.to('/');
      callback();
    }).catch(() => {
      callback();
    });
  }
}

/**
 * A mixin that adds a login listener to the component. The component this is
 * connected to MUST BE connected to the LoginStore.
 */
export let CanLoginMixin = {
  mixins: [Navigation],
  componentDidMount() { this.loginUser_() },
  componentDidUpdate() { this.loginUser_() },

  loginUser_() {
    if (this.state.errorCode === success.LOGGED_IN) {

      // Set authorization token
      let { user } = this.state;
      setAuthToken(user.authToken, this.flux);

      if (this.props.location.query && this.props.location.query.redirect) {
        defer(() => this.transitionTo(this.props.location.query.redirect));
      } else {
        defer(() => this.transitionTo('/'));
      }
    }
  },
};

/**
 * A mixin that adds a logout listener to the component. The component this is
 * connected to MUST BE connected to the LoginStore.
 */
export let CanLogoutMixin = {
  mixins: [Navigation],
  componentDidMount() { this.logoutUser_() },
  componentDidUpdate() { this.logoutUser_() },

  logoutUser_() {
    if (this.state.errorCode !== success.LOGGED_IN) {

      // Delete authorization token
      deleteAuthToken(this.flux);

      if (this.props.location.query && this.props.location.query.redirect) {
        defer(() => this.transitionTo(this.props.location.query.redirect));
      } else {
        defer(() => this.transitionTo('/'));
      }
    }
  },
};

/**
 * A mixin that adds a function that retrieves a standardized set of error messages.
 */
export let AuthMessagesMixin = {
  getErrorMessage(errorCode) {
    switch (errorCode) {
      case errors.INVALID_EMAIL:
        return 'The email you provided is invalid.';
      case errors.NO_EMAIL:
        return 'Please enter an email!';
      case errors.NO_PASSWORD:
        return 'You did not enter a password!';
      case errors.NO_USERNAME:
        return 'You did not enter a username!';
      case errors.NOT_SAME_PASSWORD:
        return 'The two password fields do not match.';
      case errors.UNABLE_TO_LOG_IN:
        return 'Unable to log in with the provided username and password.';
      case errors.USERNAME_TAKEN:
        return 'Sorry, that username is taken.';
      case errors.EMAIL_ALREADY_REGISTERED:
        return 'A user is already registered with this e-mail address.';
      default:
        return 'An unknown error occurred!';
    }
  },
}
