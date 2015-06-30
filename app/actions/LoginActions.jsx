
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { post, failedResponse } from 'app/utils/api';
import { errors } from 'app/utils/constants';

/**
 * Actions for anything that has to do with authentication.
 * @class
 */
export default class LoginActions extends Actions {

  /**
   * Logs in the user.
   *
   * @param {string} username User's username.
   * @param {string} password User's password.
   * @param {Flux} flux The Flux object.
   */
  login(username, password, flux) {

    // Validate input
    if (username === '') return failedResponse({
      actionError: errors.login.NO_USERNAME,
    });

    if (password === '') return failedResponse({
      actionError: errors.login.NO_PASSWORD,
    });

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

    // Validate input
    if (user.username === '') return failedResponse({
      actionError: errors.register.NO_USERNAME,
    });

    if (user.email === '') return failedResponse({
      actionError: errors.register.NO_EMAIL,
    });

    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!emailRegex.test(user.email)) return failedResponse({
      actionError: errors.register.INVALID_EMAIL,
    });

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
    return post(
      '/password/reset/',
      { email },
      flux, true /* authUrl */
    );
  }

  resetPasswordConfirm(user, uid, token, flux) {
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
