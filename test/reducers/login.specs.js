
import loginReducer from '../../app/reducers/login';
import testReducer from '../shared/testReducer';
import { createDoneAction, createErrorAction } from '../shared/actions';
import { success } from '../../app/utils/constants';

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
} from '../../app/constants/login';

function mockUser() {
  return {
    username: 'user',
    email: 'email@email.com',
    firstName: '',
    lastName: '',
    authToken: '1111111111111111111111111111111111111111',
    isSuperuser: false,
  };
}

const assertReducer = testReducer(loginReducer);

describe('reducers/login', () => {
  it('can clear errors when logged in', () => {
    assertReducer({
      from: { loggedIn: true, user: mockUser(), code: 123 },
      to: { loggedIn: true, user: mockUser(), code: 0 },
      action: createDoneAction(LOGIN_CLEAR_ERRORS),
    });
  });

  it('can clear errors when not logged in', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 123 },
      to: { loggedIn: false, user: {}, code: 0 },
      action: createDoneAction(LOGIN_CLEAR_ERRORS),
    });
  });

  it('can get user data and log them in', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: true, user: mockUser(), code: success.LOGGED_IN },
      action: createDoneAction(LOGIN_GET, mockUser()),
    });
  });

  it('resets when user data is unavailable', () => {
    assertReducer({
      from: { loggedIn: true, user: mockUser(), code: 0 },
      to: { loggedIn: false, user: {}, code: 0 },
      action: createErrorAction(LOGIN_GET),
    });
  });

  it('can log in a user', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: true, user: mockUser(), code: success.LOGGED_IN },
      action: createDoneAction(LOGIN_LOGIN, mockUser()),
    });
  });

  it('can show login errors', () => {
    assertReducer({
      from: { loggedIn: true, user: mockUser(), code: 0 },
      to: { loggedIn: true, user: mockUser(), code: 123 },
      action: createErrorAction(LOGIN_LOGIN, 123),
    });
  });

  it('can log out a user properly', () => {
    assertReducer({
      from: { loggedIn: true, user: mockUser(), code: 0 },
      to: { loggedIn: false, user: {}, code: 0 },
      action: createDoneAction(LOGIN_LOGOUT),
    });
  });

  it('can verify emails properly', () => {
    assertReducer({
      from: { loggedIn: true, user: mockUser(), code: 0 },
      to: { loggedIn: true, user: mockUser(), code: success.EMAIL_VERIFIED },
      action: createDoneAction(LOGIN_VERIFY_EMAIL),
    });
  });

  it('can show email verification errors', () => {
    assertReducer({
      from: { loggedIn: true, user: mockUser(), code: 0 },
      to: { loggedIn: true, user: mockUser(), code: 123 },
      action: createErrorAction(LOGIN_LOGIN, 123),
    });
  });

  it('can register a user', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: true, user: mockUser(), code: success.LOGGED_IN },
      action: createDoneAction(LOGIN_REGISTER, mockUser()),
    });
  });

  it('can show registration errors', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: 123 },
      action: createErrorAction(LOGIN_LOGIN, 123),
    });
  });

  it('can reset a password', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: success.PASSWORD_RESET },
      action: createDoneAction(LOGIN_RESET_PASSWORD),
    });
  });

  it('can show password reset errors', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: 123 },
      action: createErrorAction(LOGIN_RESET_PASSWORD, 123),
    });
  });

  it('can confirm a password reset', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: success.PASSWORD_CONFIRM_RESET },
      action: createDoneAction(LOGIN_RESET_PASSWORD_CONFIRM),
    });
  });

  it('can show password reset confirm errors', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: 123 },
      action: createErrorAction(LOGIN_RESET_PASSWORD_CONFIRM, 123),
    });
  });

  it.skip('can change a password', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: success.PASSWORD_CHANGED },
      action: createDoneAction(LOGIN_CHANGE_PASSWORD),
    });
  });

  it('can show password change errors', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: 123 },
      action: createErrorAction(LOGIN_CHANGE_PASSWORD, 123),
    });
  });

  it('can perform Facebook login', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: true, user: mockUser(), code: success.LOGGED_IN },
      action: createDoneAction(LOGIN_FACEBOOK, mockUser()),
    });
  });

  it('can show Facebook login errors', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: 123 },
      action: createErrorAction(LOGIN_FACEBOOK, 123),
    });
  });

  it('can perform Twitter login', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: true, user: mockUser(), code: success.LOGGED_IN },
      action: createDoneAction(LOGIN_TWITTER, mockUser()),
    });
  });

  it('can show Twitter login errors', () => {
    assertReducer({
      from: { loggedIn: false, user: {}, code: 0 },
      to: { loggedIn: false, user: {}, code: 123 },
      action: createErrorAction(LOGIN_TWITTER, 123),
    });
  });
});
