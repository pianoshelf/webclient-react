
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
 * UTILITIES
 */

function sanitizeUserInfo(user) {
  const { auth_token, username, first_name, last_name, email, is_superuser } = user;
  return {
    authToken: auth_token,
    firstName: first_name,
    lastName: last_name,
    isSuperuser: is_superuser,
    username,
    email,
  };
}

/**
 * ACTIONS
 */

/**
 * Action creator that resets the error code.
 */
export const clearErrors = createAction(LOGIN_CLEAR_ERRORS);

/**
 * Gets the current logged in user
 * @param {Store} store The Redux store object.
 */
export const getUser = createAction(
  LOGIN_GET,
  async store => {
    const response = await get({
      endpoint: '/user/',
      auth: true,
      store,
    });

    if (isActionError(response)) {
      return response;
    }

    return actionDone(sanitizeUserInfo(response.payload));
  }
);

/**
 * Logs in the user.
 * @param {string} username User's username.
 * @param {string} password User's password.
 */
export const login = createAction(
  LOGIN_LOGIN,
  async (username, password) => {
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
    });

    if (isActionError(response)) {
      const { payload } = response;

      // Make sure user actually logged in
      if (payload.non_field_errors &&
          payload.non_field_errors[0] === 'Unable to log in with provided credentials.') {
        return actionError(errors.UNABLE_TO_LOG_IN);
      }

      return response;
    }

    return actionDone(sanitizeUserInfo(response.payload));
  }
);

/**
 * Logs out the user.
 */
export const logout = createAction(
  LOGIN_LOGOUT,
  async () =>
    await post({
      endpoint: '/logout/',
      auth: true,
    })
);

/**
 *
 */
export const verifyEmail = createAction(
  LOGIN_VERIFY_EMAIL,
  async (verificationKey) => {
    const response = await post({
      endpoint: `/register/account-confirm-email/${verificationKey}/`,
      auth: true,
    });

    if (isActionError(response)) {
      const { payload } = response;

      // Check if verification actually happened
      if (payload.detail && payload.detail === 'Not found') {
        return actionError(errors.EMAIL_UNVERIFIED);
      }
    }

    return response;
  }
);

/**
 *
 */
export const register = createAction(
  LOGIN_REGISTER,
  async user => {
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

    // Register the user
    const registerResponse = await post({
      endpoint: '/register/',
      params: {
        username: user.username,
        password1: user.password1,
        password2: user.password2,
        email: user.email,
      },
      auth: true,
    });

    if (isActionError(registerResponse)) {
      const { payload } = registerResponse;

      // Make sure username is not taken
      if (payload.username &&
          payload.username[0] === 'This username is already taken. Please choose another.') {
        return actionError(errors.USERNAME_TAKEN);
      }

      // Make sure email address is not taken
      if (payload.email &&
          payload.email[0] === 'A user is already registered with this e-mail address.') {
        return actionError(errors.EMAIL_ALREADY_REGISTERED);
      }

      return registerResponse;
    }

    // Login on the server
    const loginResponse = await post({
      endpoint: '/login/',
      params: {
        username: user.username,
        password: user.password1,
      },
      auth: true,
    });

    if (isActionError(loginResponse)) {
      const { payload } = loginResponse;

      // Make sure user actually logged in
      if (payload.non_field_errors &&
          payload.non_field_errors[0] === 'Unable to log in with provided credentials.') {
        return actionError(errors.UNABLE_TO_LOG_IN);
      }

      return loginResponse;
    }

    return actionDone(sanitizeUserInfo(loginResponse.payload));
  }
);

export const resetPassword = createAction(
  LOGIN_RESET_PASSWORD,
  async email => {
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
    const response = await post({
      endpoint: '/password/reset/',
      params: { email },
      auth: true,
    });

    if (isActionError(response)) {
      const { payload } = response;

      // Check if the email is registered
      if (payload.email &&
          payload.email[0] === 'Invalid Email') {
        return actionError(errors.EMAIL_NOT_REGISTERED);
      }
    }

    return response;
  }
);

export const resetPasswordConfirm = createAction(
  LOGIN_RESET_PASSWORD_CONFIRM,
  async (user, uid, token) => {
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

    let response;
    // When submitting a completely invalid token and uid, the backend spits out errors that aren't
    // JSON. This else statement exists so we can take care of that specific situation.
    // TODO(ankit): When the backend bug is fixed, remove this hack.
    try {
      response = await post({
        endpoint: '/password/reset/confirm/',
        params: {
          new_password1: user.password1,
          new_password2: user.password2,
          uid,
          token,
        },
        auth: true,
      });
    } catch (e) {
      return actionError(errors.EXPIRED_LINK);
    }

    if (isActionError(response)) {
      const { payload } = response;

      // Check if token is invalid
      if (payload.token &&
          payload.token[0] === 'Invalid value') {
        return actionError(errors.EXPIRED_LINK);
      }

      // Check if uid is invalid
      if (payload.uid &&
          payload.uid[0] === 'Invalid value') {
        return actionError(errors.EXPIRED_LINK);
      }
    }

    return response;
  }
);

export const changePassword = createAction(
  LOGIN_CHANGE_PASSWORD,
  async user => {
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

    return await post({
      endpoint: '/password/change/',
      params: {
        new_password1: user.password1,
        new_password2: user.password2,
      },
      auth: true,
    });
  }
);

export const facebookLogin = createAction(
  LOGIN_FACEBOOK,
  async token => {
    const response = await post({
      endpoint: '/social-login/facebook/',
      params: {
        access_token: token.accessToken,
      },
      auth: true,
    });

    return actionDone(sanitizeUserInfo(response.payload));
  }
);

export const twitterLogin = createAction(
  LOGIN_TWITTER,
  async token => {
    const response = await post({
      endpoint: '/social-login/twitter/',
      params: {
        access_token: token.oauthToken,
        access_token_secret: token.oauthTokenSecret,
      },
      auth: true,
    });

    return actionDone(sanitizeUserInfo(response.payload));
  }
);
