
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as login from '../../app/actions/login';
import { mockApiCall, getFailedResponseError } from '../shared/mocks';
import { errors } from '../../app/utils/constants';

// Mock passthrough dispatch function
const dispatch = value => value;

describe('actions/login', () => {
  describe('#getUser', () => {
    it('calls the correct API', () => {
      mockApiCall('get', '/api-auth/user/', {});
      expect(
        login.getUser()(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#login', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/login/', {
        username: 'user',
        password: 'pass',
      });
      expect(
        login.login('user', 'pass')(dispatch)
      ).to.eventually.equal('success');
    });

    it('throws error when username is empty', () => {
      return login.login('', 'pass')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_USERNAME);
      });
    });

    it('throws error when the password is empty', () => {
      return login.login('user', '')(dispatch).then(res => {
        expect(getFailedResponseError(res)).to.equal(errors.NO_PASSWORD);
      });
    });
  });

  describe('#logout', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/logout/', {});
      expect(
        login.logout()(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#verifyEmail', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/register/account-confirm-email/verification1234/', {});
      expect(
        login.verifyEmail('verification1234')(dispatch)
      ).to.eventually.equal('success');
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
      mockApiCall('post', '/api-auth/register/', user);
      expect(
        login.register(user)(dispatch)
      ).to.eventually.equal('success');
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
  });

  describe('#resetPassword', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/password/reset/', {
        email: 'email@email.com',
      });
      expect(
        login.resetPassword('email@email.com')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#resetPasswordConfirm', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/password/reset/confirm/', {
        new_password1: 'password',
        new_password2: 'password',
        uid: 'uid',
        token: 'token',
      });
      expect(
        login.resetPasswordConfirm({
          password1: 'password',
          password2: 'password',
        }, 'uid', 'token')(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#changePassword', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/password/change/', {
        new_password1: 'password',
        new_password2: 'password',
      });
      expect(
        login.changePassword({
          password1: 'password',
          password2: 'password',
        })(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#facebookLogin', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/social-login/facebook/', {
        access_token: 'fb-token',
      });
      expect(
        login.facebookLogin({
          accessToken: 'fb-token',
        })(dispatch)
      ).to.eventually.equal('success');
    });
  });

  describe('#twitterLogin', () => {
    it('calls the correct API', () => {
      mockApiCall('post', '/api-auth/social-login/twitter/', {
        access_token: 'twitter-token',
        access_token_secret: 'twitter-token-secret',
      });
      expect(
        login.twitterLogin({
          oauth_token: 'twitter-token',
          oauth_token_secret: 'twitter-token-secret',
        })(dispatch)
      ).to.eventually.equal('success');
    });
  });
});
