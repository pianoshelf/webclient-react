
import createAction from '../utils/createAction';
import { actionDone, actionError, isActionError } from '../utils/actionUtils';
import { errors } from '../utils/constants';
import { get, post } from '../utils/api';
import {
  LOGIN_CLEAR_ERRORS,
  LOGIN_GET,
  LOGIN_LOGIN,
  LOGIN_LOGOUT,
  LOGIN_VERIFY_EMAIL,
  LOGIN_REGISTER,
  LOGIN_RESET_PASSWORD,
  LOGIN_RESET_PASSWORD_CONFIRM,
  LOGIN_CHANGE_PASSWORD,
  LOGIN_FACEBOOK,
  LOGIN_TWITTER,
} from '../constants/login';

/**
 * Action creator that resets the error code.
 */
export const clearErrors = createAction(LOGIN_CLEAR_ERRORS);

/**
 * Gets the current logged in user
 *
 * @param {Store} store The Redux store object.
 */
export const getUser = createAction(
  LOGIN_GET,
  async store => {
    return await get({
      endpoint: '/user/',
      auth: true,
      store,
    });
  }
);

/**
 * Logs in the user.
 *
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {Store} store The Redux store object.
 */
export const login = createAction(
  LOGIN_LOGIN,
  async (username, password, store) => {
    // Make sure the username field is not empty
    if (username === '') {
      return actionError(errors.NO_USERNAME);
    }

    // Make sure the password field is not empty
    if (password === '') {
      return actionError(errors.NO_PASSWORD);
    }

    // Call the server
    const response = await post({
      endpoint: '/login/',
      params: { username, password },
      auth: true,
      store,
    });

    if (isActionError(response)) return response;
    const { auth_token, name, first_name, last_name, email, is_superuser } = response.payload;
    return actionDone({
      authToken: auth_token,
      firstName: first_name,
      lastName: last_name,
      isSuperuser: is_superuser,
      username: name,
      email,
    });
  }
);

/**
 * Logs out the user.
 *
 * @param {Store} store The Redux store object.
 */
export const logout = createAction(
  LOGIN_LOGOUT,
  async store => {
    return await post({
      endpoint: '/logout/',
      auth: true,
      store,
    });
  }
);

/**
 *
 */
export const verifyEmail = createAction(
  LOGIN_VERIFY_EMAIL,
  async (verificationKey, store) => {
    return await post({
      endpoint: `/register/account-confirm-email/${verificationKey}/`,
      auth: true,
      store,
    });
  }
);

/**
 *
 */
export const register = createAction(
  LOGIN_REGISTER,
  async (user, store) => {
    // Make sure username field is not empty
    if (user.username === '') {
      return actionError(errors.NO_USERNAME);
    }

    // Make sure email field is not empty
    if (user.email === '') {
      return actionError(errors.NO_EMAIL);
    }

    // Make sure email field has a valid email
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!emailRegex.test(user.email)) {
      return actionError(errors.INVALID_EMAIL);
    }

    // Make sure password field is not empty
    if (user.password1 === '') {
      return actionError(errors.NO_PASSWORD);
    }

    // Make sure password is strong
    if (user.password1.length < 6) {
      return actionError(errors.NOT_STRONG_PASSWORD);
    }

    // Make sure password and confirm password fields have the same value
    if (user.password2 !== user.password1) {
      return actionError(errors.NOT_SAME_PASSWORD);
    }

    // Call the API
    return await post({
      endpoint: '/register/',
      params: {
        username: user.username,
        password1: user.password1,
        password2: user.password2,
        email: user.email,
      },
      auth: true,
      store,
    });
  }
);

export const resetPassword = createAction(
  LOGIN_RESET_PASSWORD,
  async (email, store) => {
    // Make sure email field is not empty
    if (email === '') {
      return actionError(errors.NO_EMAIL);
    }

    // Make sure email field has a valid email
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!emailRegex.test(email)) {
      return actionError(errors.INVALID_EMAIL);
    }

    // Call the API
    return await post(
      '/password/reset/',
      { email },
      store, true /* authUrl */
    );
  }
);

export const resetPasswordConfirm = createAction(
  LOGIN_RESET_PASSWORD_CONFIRM,
  async (user, uid, token, store) => {
    // Make sure password field is not empty
    if (user.password1 === '') {
      return actionError(errors.NO_PASSWORD);
    }

    // Make sure password is strong
    if (user.password1.length < 6) {
      return actionError(errors.NOT_STRONG_PASSWORD);
    }

    // Make sure password and confirm password fields have the same value
    if (user.password2 !== user.password1) {
      return actionError(errors.NOT_SAME_PASSWORD);
    }

    // Call the API
    return await post({
      endpoint: '/password/reset/confirm/',
      params: {
        new_password1: user.password1,
        new_password2: user.password2,
        uid,
        token,
      },
      auth: true,
      store,
    });
  }
);

export const changePassword = createAction(
  LOGIN_CHANGE_PASSWORD,
  async (user, store) => {
    // Make sure password field is not empty
    if (user.password1 === '') {
      return actionError(errors.NO_PASSWORD);
    }

    // Make sure password and confirm password fields have the same value
    if (user.password2 !== user.password1) {
      return actionError(errors.NOT_SAME_PASSWORD);
    }

    return await post({
      endpoint: '/password/change/',
      params: {
        new_password1: user.password1,
        new_password2: user.password2,
      },
      auth: true,
      store,
    });
  }
);

export const facebookLogin = createAction(
  LOGIN_FACEBOOK,
  async (token, store) => {
    return await post({
      endpoint: '/social-login/facebook/',
      params: {
        access_token: token.accessToken,
      },
      auth: true,
      store,
    });
  }
);

export const twitterLogin = createAction(
  LOGIN_TWITTER,
  async (token, store) => {
    return await post({
      endpoint: '/social-login/twitter/',
      params: {
        access_token: token.oauth_token,
        access_token_secret: token.oauth_token_secret,
      },
      auth: true,
      store,
    });
  }
);
