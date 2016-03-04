
import createReducer from '../utils/createReducer';
import { success } from '../utils/constants';

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

const initialState = {
  code: 0,
  user: {},
  loggedIn: false,
};

export default createReducer(initialState, {
  [LOGIN_CLEAR_ERRORS]: state => ({
    ...state,
    code: 0,
  }),

  [LOGIN_GET]: {
    done(state, payload) {
      return {
        code: success.LOGGED_IN,
        user: payload,
        loggedIn: true,
      };
    },
    error() {
      return {
        code: 0,
        user: {},
        loggedIn: false,
      };
    },
  },

  [LOGIN_LOGIN]: {
    done(state, payload) {
      return {
        code: success.LOGGED_IN,
        user: payload,
        loggedIn: true,
      };
    },
    error(state, code) {
      return {
        code,
        user: {},
        loggedIn: false,
      };
    },
  },

  [LOGIN_LOGOUT]: () => initialState,

  [LOGIN_VERIFY_EMAIL]: {
    done(state) {
      return { ...state, code: success.EMAIL_VERIFIED };
    },
    error(state, code) {
      return { ...state, code };
    },
  },

  [LOGIN_REGISTER]: {
    done(state, payload) {
      return {
        code: success.LOGGED_IN,
        user: payload,
        loggedIn: true,
      };
    },
    error(state, code) {
      return {
        code,
        user: {},
        loggedIn: false,
      };
    },
  },

  [LOGIN_RESET_PASSWORD]: {
    done(state) {
      return { ...state, code: success.PASSWORD_RESET };
    },
    error(state, code) {
      return { ...state, code };
    },
  },

  [LOGIN_RESET_PASSWORD_CONFIRM]: {
    done(state) {
      return { ...state, code: success.PASSWORD_CONFIRM_RESET };
    },
    error(state, code) {
      return { ...state, code };
    },
  },

  [LOGIN_CHANGE_PASSWORD]: {
    done(state) {
      return state;
    },
    error(state, code) {
      return { ...state, code };
    },
  },

  [LOGIN_FACEBOOK]: {
    done(state, payload) {
      return {
        code: success.LOGGED_IN,
        user: payload,
        loggedIn: true,
      };
    },
    error(state, code) {
      return {
        code,
        user: {},
        loggedIn: false,
      };
    },
  },

  [LOGIN_TWITTER]: {
    done(state, payload) {
      return {
        code: success.LOGGED_IN,
        user: payload,
        loggedIn: true,
      };
    },
    error(state, code) {
      return {
        code,
        user: {},
        loggedIn: false,
      };
    },
  },
});
