/* eslint no-unused-expressions: 0 */

// Import external modules
import { expect } from 'chai';

// Import module to test
import * as login from '../../app/actions/login';
import mockApiCall from '../shared/mockApiCall';
import { getFailedResponseError, getSuccessResponsePayload } from '../shared/response';
import { errors } from '../../app/utils/constants';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/login', () => {
  describe('#getUser', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'get',
        path: '/api/auth/user/',
      });
      return login.getUser()(dispatch)
        .then(() => scope.done());
    });

    it('returns user info properly', () => {
      mockApiCall({
        method: 'get',
        path: '/api/auth/user/',
        returnData: {
          username: 'user',
          email: 'email@email.com',
          first_name: '',
          last_name: '',
          profile_picture: '',
          auth_token: '1111111111111111111111111111111111111111',
          is_superuser: false,
        },
      });
      return login.getUser()(dispatch).then(res => {
        expect(getSuccessResponsePayload(res)).to.deep.equal({
          username: 'user',
          email: 'email@email.com',
          firstName: '',
          lastName: '',
          profilePicture: '',
          authToken: '1111111111111111111111111111111111111111',
          isSuperuser: false,
        });
      });
    });

    it('returns error when user is not logged in', () => {
      mockApiCall({
        method: 'get',
        path: '/api/auth/user/',
        returnCode: 401,
      });
      return login.getUser()(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.API_ERROR);
      });
    });
  });

  describe('#login', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/login/',
        params: {
          username: 'user',
          password: 'pass',
        },
      });
      return login.login('user', 'pass')(dispatch)
        .then(() => scope.done());
    });

    it('throws error when username is empty', () =>
      login.login('', 'pass')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_USERNAME);
      })
    );

    it('throws error when the password is empty', () =>
      login.login('user', '')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_PASSWORD);
      })
    );

    it('throws error when server says you cannot log in', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/login/',
        params: {
          username: 'user',
          password: 'pass',
        },
        returnCode: 401,
        returnMeta: {
          non_field_errors: ['Unable to log in with provided credentials.'],
        },
      });
      return login.login('user', 'pass')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.UNABLE_TO_LOG_IN);
      });
    });

    it('logs user in properly', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/login/',
        params: {
          username: 'user',
          password: 'pass',
        },
        returnData: {
          username: 'user',
          email: 'email@email.com',
          first_name: '',
          last_name: '',
          profile_picture: '',
          auth_token: '1111111111111111111111111111111111111111',
          is_superuser: false,
        },
      });
      return login.login('user', 'pass')(dispatch).then(res => {
        expect(getSuccessResponsePayload(res)).to.deep.equal({
          username: 'user',
          email: 'email@email.com',
          firstName: '',
          lastName: '',
          profilePicture: '',
          authToken: '1111111111111111111111111111111111111111',
          isSuperuser: false,
        });
      });
    });
  });

  describe('#logout', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/logout/',
      });
      return login.logout()(dispatch)
        .then(() => scope.done());
    });
  });

  describe('#verifyEmail', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/register/account-confirm-email/verification1234/',
      });
      return login.verifyEmail('verification1234')(dispatch)
        .then(() => scope.done());
    });

    it('throws error when server says verification has failed', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/register/account-confirm-email/verification1234/',
        returnCode: 401,
        returnMeta: {
          detail: 'Not found',
        },
      });
      return login.verifyEmail('verification1234')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.EMAIL_UNVERIFIED);
      });
    });
  });

  describe('#register', () => {
    it('calls the correct API', () => {
      const user = {
        username: 'user',
        password1: 'password',
        password2: 'password',
        email: 'email@email.com',
      };
      const registerScope = mockApiCall({
        method: 'post',
        path: '/api/auth/register/',
        returnData: user,
      });
      const loginScope = mockApiCall({
        method: 'post',
        path: '/api/auth/login/',
      });
      return login.register(user)(dispatch)
        .then(() => registerScope.done() && loginScope.done());
    });

    it('throws error when email is empty', () => {
      const user = {
        username: 'user',
        password1: 'password',
        password2: 'password',
        email: '',
      };
      return login.register(user)(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_EMAIL);
      });
    });

    it('throws error when the email is invalid', () => {
      const user = {
        username: 'user',
        password1: 'password',
        password2: 'password',
        email: 'hello',
      };
      return login.register(user)(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
      });
    });

    it('throws error when the password is less than 6 characters', () => {
      const user = {
        username: 'user',
        password1: 'pass',
        password2: 'pass',
        email: 'hello',
      };
      return login.register(user)(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
      });
    });

    it('throws error when the passwords is not the same', () => {
      const user = {
        username: 'user',
        password1: 'password1',
        password2: 'password2',
        email: 'hello',
      };
      return login.register(user)(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
      });
    });

    it('throws error when server says username is taken', () => {
      const user = {
        username: 'user',
        password1: 'password',
        password2: 'password',
        email: 'email@email.com',
      };
      mockApiCall({
        method: 'post',
        path: '/api/auth/register/',
        params: user,
        returnCode: 401,
        returnMeta: {
          username: ['This username is already taken. Please choose another.'],
        },
      });
      return login.register(user)(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.USERNAME_TAKEN);
      });
    });

    it('throws error when server says email is taken', () => {
      const user = {
        username: 'user',
        password1: 'password',
        password2: 'password',
        email: 'email@email.com',
      };
      mockApiCall({
        method: 'post',
        path: '/api/auth/register/',
        params: user,
        returnCode: 401,
        returnMeta: {
          email: ['A user is already registered with this e-mail address.'],
        },
      });
      return login.register(user)(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.EMAIL_ALREADY_REGISTERED);
      });
    });

    it('throws error when server says you cannot log in', () => {
      const user = {
        username: 'user',
        password1: 'password',
        password2: 'password',
        email: 'email@email.com',
      };
      mockApiCall({
        method: 'post',
        path: '/api/auth/register/',
        params: user,
        returnData: {
          username: 'user',
          email: 'email@email.com',
          first_name: '',
          last_name: '',
          profile_picture: '',
          auth_token: '1111111111111111111111111111111111111111',
          is_superuser: false,
        },
      });
      mockApiCall({
        method: 'post',
        path: '/api/auth/login/',
        params: {
          username: 'user',
          password: 'password',
        },
        returnCode: 401,
        returnMeta: {
          non_field_errors: ['Unable to log in with provided credentials.'],
        },
      });
      return login.login('user', 'password')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.UNABLE_TO_LOG_IN);
      });
    });
  });

  describe('#resetPassword', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/password/reset/',
        params: {
          email: 'email@email.com',
        },
      });
      return login.resetPassword('email@email.com')(dispatch)
        .then(() => scope.done());
    });

    it('throws error when email field is empty', () =>
      login.resetPassword('')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_EMAIL);
      })
    );

    it('throws error when email field is not an email', () =>
      login.resetPassword('hello')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
      })
    );

    it('throws error when server says email is not registered', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/password/reset/',
        params: {
          email: 'email@email.com',
        },
        returnCode: 401,
        returnMeta: {
          email: ['Invalid Email'],
        },
      });
      return login.resetPassword('email@email.com')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.EMAIL_NOT_REGISTERED);
      });
    });
  });

  describe('#resetPasswordConfirm', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/password/reset/confirm/',
        params: {
          new_password1: 'password',
          new_password2: 'password',
          uid: 'uid',
          token: 'token',
        },
      });
      return login.resetPasswordConfirm({
        password1: 'password',
        password2: 'password',
      }, 'uid', 'token')(dispatch)
        .then(() => scope.done());
    });

    it('throws error when password is empty', () =>
      login.resetPasswordConfirm({
        password1: '',
        password2: '',
      })(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_PASSWORD);
      })
    );

    it('throws error when password is too short', () =>
      login.resetPasswordConfirm({
        password1: 'pass',
        password2: 'pass',
      })(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NOT_STRONG_PASSWORD);
      })
    );

    it('throws error when passwords do not match', () =>
      login.resetPasswordConfirm({
        password1: 'password1',
        password2: 'password2',
      })(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NOT_SAME_PASSWORD);
      })
    );

    it('throws error when server says token is invalid', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/password/reset/confirm/',
        params: {
          new_password1: 'password',
          new_password2: 'password',
          uid: 'uid',
          token: 'token',
        },
        returnCode: 401,
        returnMeta: {
          token: ['Invalid value'],
        },
      });
      return login.resetPasswordConfirm({
        password1: 'password',
        password2: 'password',
      }, 'uid', 'token')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.EXPIRED_LINK);
      });
    });

    it('throws error when server says uid is invalid', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/password/reset/confirm/',
        params: {
          new_password1: 'password',
          new_password2: 'password',
          uid: 'uid',
          token: 'token',
        },
        returnCode: 401,
        returnMeta: {
          uid: ['Invalid value'],
        },
      });
      return login.resetPasswordConfirm({
        password1: 'password',
        password2: 'password',
      }, 'uid', 'token')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.EXPIRED_LINK);
      });
    });
  });

  describe('#changePassword', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/password/change/',
        params: {
          new_password1: 'password',
          new_password2: 'password',
        },
      });
      return login.changePassword({
        password1: 'password',
        password2: 'password',
      })(dispatch)
        .then(() => scope.done());
    });

    it('throws error when password is empty', () =>
      login.changePassword({
        password1: '',
        password2: '',
      })(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_PASSWORD);
      })
    );

    it('throws error when password is too short', () =>
      login.changePassword({
        password1: 'pass',
        password2: 'pass',
      })(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NOT_STRONG_PASSWORD);
      })
    );

    it('throws error when passwords do not match', () =>
      login.changePassword({
        password1: 'password1',
        password2: 'password2',
      })(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NOT_SAME_PASSWORD);
      })
    );

    it('changes the users password');
  });

  describe('#facebookLogin', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/social-login/facebook/',
        params: {
          access_token: 'fb-token',
        },
      });
      return login.facebookLogin({
        accessToken: 'fb-token',
      })(dispatch)
        .then(() => scope.done());
    });

    it('logs user in properly', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/social-login/facebook/',
        params: {
          access_token: 'fb-token',
        },
        returnData: {
          username: 'user',
          email: 'email@email.com',
          first_name: '',
          last_name: '',
          profile_picture: '',
          auth_token: '1111111111111111111111111111111111111111',
          is_superuser: false,
        },
      });
      return login.facebookLogin({
        accessToken: 'fb-token',
      })(dispatch).then(res => {
        expect(getSuccessResponsePayload(res)).to.deep.equal({
          username: 'user',
          email: 'email@email.com',
          firstName: '',
          lastName: '',
          profilePicture: '',
          authToken: '1111111111111111111111111111111111111111',
          isSuperuser: false,
        });
      });
    });
  });

  describe('#twitterLogin', () => {
    it('calls the correct API', () => {
      const scope = mockApiCall({
        method: 'post',
        path: '/api/auth/social-login/twitter/',
        params: {
          access_token: 'twitter-token',
          access_token_secret: 'twitter-token-secret',
        },
      });
      return login.twitterLogin({
        oauthToken: 'twitter-token',
        oauthTokenSecret: 'twitter-token-secret',
      })(dispatch)
        .then(() => scope.done());
    });

    it('logs user in properly', () => {
      mockApiCall({
        method: 'post',
        path: '/api/auth/social-login/twitter/',
        params: {
          access_token: 'twitter-token',
          access_token_secret: 'twitter-token-secret',
        },
        returnData: {
          username: 'user',
          email: 'email@email.com',
          first_name: '',
          last_name: '',
          profile_picture: '',
          auth_token: '1111111111111111111111111111111111111111',
          is_superuser: false,
        },
      });
      return login.twitterLogin({
        oauthToken: 'twitter-token',
        oauthTokenSecret: 'twitter-token-secret',
      })(dispatch).then(res => {
        expect(getSuccessResponsePayload(res)).to.deep.equal({
          username: 'user',
          email: 'email@email.com',
          firstName: '',
          lastName: '',
          profilePicture: '',
          authToken: '1111111111111111111111111111111111111111',
          isSuperuser: false,
        });
      });
    });
  });
});
