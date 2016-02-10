
import { createReducer } from '../utils/createReducer';

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

export default createReducer({

}, {
  [LOGIN_CLEAR_ERRORS]: state => ({
    ...state,
    errorCode: 0,
    user: {},
    loggedIn: false,
  }),
  [LOGIN_GET]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_LOGIN]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_LOGOUT]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_VERIFY_EMAIL]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_REGISTER]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_RESET_PASSWORD]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_RESET_PASSWORD_CONFIRM]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_CHANGE_PASSWORD]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_FACEBOOK]: (state, payload) => ({
    ...state,

  }),
  [LOGIN_TWITTER]: (state, payload) => ({
    ...state,

  }),
});
