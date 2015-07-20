
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { get, post, fail } from '../utils/api';
import { errors } from '../utils/constants';

/**
 * Actions for anything that has to do with authentication.
 * @class
 */
export default class LoginActions extends Actions {

  /**
   * Action for resetting the error code.
   */
  clearErrors() {
    return false;
  }

  /**
   * Gets the current logged in user
   *
   * @param {Flux} flux The Flux object.
   */
  getUser(flux) {
    return get(
      '/user/',
      {},
      flux, true /* authUrl */
    );
  }

  /**
   * Logs in the user.
   *
   * @param {string} username User's username.
   * @param {string} password User's password.
   * @param {Flux} flux The Flux object.
   */
  login(username, password, flux) {

    // Make sure the username field is not empty
    if (username === '') {
      return fail(errors.NO_USERNAME);
    }

    // Make sure the password field is not empty
    if (password === '') {
      return fail(errors.NO_PASSWORD);
    }

    // Perform the AJAX request
    return post(
      '/login/',
      { username, password },
      flux, true /* authUrl */
    );
  }

  /**
   * Logs out the user.
   *
   * @param {Flux} flux The Flux object.
   */
  logout(flux) {
    return post(
      '/logout/',
      {},
      flux, true /* authUrl */
    );
  }

  verifyEmail(verificationKey, flux) {
    return post(
      `/register/account-confirm-email/${verificationKey}/`,
      {},
      flux, true /* authUrl */
    );
  }

  register(user, flux) {

    // Make sure username field is not empty
    if (user.username === '') {
      return fail(errors.NO_USERNAME);
    }

    // Make sure email field is not empty
    if (user.email === '') {
      return fail(errors.NO_EMAIL);
    }

    // Make sure email field has a valid email
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!emailRegex.test(user.email)) {
      return fail(errors.INVALID_EMAIL);
    }

    // Make sure password field is not empty
    if (user.password1 === '') {
      return fail(errors.NO_PASSWORD);
    }

    // Make sure password and confirm password fields have the same value
    if (user.password2 !== user.password1) {
      return fail(errors.NOT_SAME_PASSWORD);
    }

    // Call the API
    return post(
      '/register/',
      {
        username: user.username,
        password1: user.password1,
        password2: user.password2,
        email: user.email,
      },
      flux, true /* authUrl */
    );
  }

  resetPassword(email, flux) {

    // Make sure email field is not empty
    if (email === '') {
      return fail(errors.NO_EMAIL);
    }

    // Make sure email field has a valid email
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!emailRegex.test(email)) {
      return fail(errors.INVALID_EMAIL);
    }

    // Call the API
    return post(
      '/password/reset/',
      { email },
      flux, true /* authUrl */
    );
  }

  resetPasswordConfirm(user, uid, token, flux) {

    // Make sure password field is not empty
    if (user.password1 === '') {
      return fail(errors.NO_PASSWORD);
    }

    // Make sure password and confirm password fields have the same value
    if (user.password2 !== user.password1) {
      return fail(errors.NOT_SAME_PASSWORD);
    }

    // Call the API
    return post(
      '/password/reset/confirm/',
      {
        new_password1: user.password1,
        new_password2: user.password2,
        uid,
        token,
      },
      flux, true /* authUrl */
    );
  }

  changePassword(user, flux) {

    // Make sure password field is not empty
    if (user.password1 === '') {
      return fail(errors.NO_PASSWORD);
    }

    // Make sure password and confirm password fields have the same value
    if (user.password2 !== user.password1) {
      return fail(errors.NOT_SAME_PASSWORD);
    }

    return post(
      '/password/change/',
      {
        new_password1: user.password1,
        new_password2: user.password2,
      },
      flux, true /* authUrl */
    );
  }

  facebookLogin(token, flux) {
    return post(
      '/social-login/facebook/',
      {
        access_token: token.accessToken,
      },
      flux, true /* authUrl */
    );
  }

  twitterLogin(token, flux) {
    return post(
      '/social-login/twitter/',
      {
        access_token: token.oauth_token,
        access_token_secret: token.oauth_token_secret,
      },
      flux, true /* authUrl */
    );
  }

}
