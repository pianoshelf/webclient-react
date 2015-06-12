
// Import external modules
import { Actions } from 'flummox';

// Import internal modules
import { post } from '../utils/api';

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
