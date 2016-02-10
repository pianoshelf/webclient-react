
import { handleActions } from 'redux-actions';

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

export default handleActions({
  [LOGIN_CLEAR_ERRORS]: state => ({
    errorCode: 0,
    user: {},
    loggedIn: false,
  }),
  [LOGIN_GET]: (state, action) => ({

  }),
  [LOGIN_LOGIN]: (state, action) => ({

  }),
  [LOGIN_LOGOUT]: (state, action) => ({

  }),
  [LOGIN_VERIFY_EMAIL]: (state, action) => ({

  }),
  [LOGIN_REGISTER]: (state, action) => ({

  }),
  [LOGIN_RESET_PASSWORD]: (state, action) => ({

  }),
  [LOGIN_RESET_PASSWORD_CONFIRM]: (state, action) => ({

  }),
  [LOGIN_CHANGE_PASSWORD]: (state, action) => ({

  }),
  [LOGIN_FACEBOOK]: (state, action) => ({

  }),
  [LOGIN_TWITTER]: (state, action) => ({

  }),
}, {

});
