
// Import external modules
import { expect } from 'chai';

// Import module to test
import * as login from '../../app/actions/login';
import { mockApiCall, getFailedResponseError } from '../shared/mocks';
import { errors } from '../../app/utils/constants';

// Fake dispatch function
function dispatch(value) { return value; }

describe('actions/login', () => {
  it('can call #getUser', () => {
    mockApiCall('get', '/api-auth/user/', {});
    login.getUser().then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #login', () => {
    mockApiCall('post', '/api-auth/login/', {
      username: 'user',
      password: 'pass',
    });
    login.login('user', 'pass').then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #login and throw error when username is empty', () => {
    login.login('', 'pass').catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.NO_USERNAME);
    });
  });

  it('can call #login and throw error when the password is empty', () => {
    login.login('user', '').catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.NO_PASSWORD);
    });
  });

  it('can call #logout', () => {
    mockApiCall('post', '/api-auth/logout/', {});
    login.logout().then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #verifyEmail', () => {
    mockApiCall('post', '/api-auth/register/account-confirm-email/verification1234/', {});
    login.verifyEmail('verification1234').then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #register', () => {
    const user = {
      username: 'user',
      password1: 'password',
      password2: 'password',
      email: 'email@email.com',
    };

    mockApiCall('post', '/api-auth/register/', user);

    login.register(user).then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #register and throw error when email is empty', () => {
    const user = {
      username: 'user',
      password1: 'password',
      password2: 'password',
      email: '',
    };

    login.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.NO_EMAIL);
    });
  });

  it('can call #register and throw error when the email is invalid', () => {
    const user = {
      username: 'user',
      password1: 'password',
      password2: 'password',
      email: 'hello',
    };

    login.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
    });
  });

  it('can call #register and throw error when the password is less than 6 characters', () => {
    const user = {
      username: 'user',
      password1: 'pass',
      password2: 'pass',
      email: 'hello',
    };

    login.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
    });
  });

  it('can call #register and throw error when the passwords is not the same', () => {
    const user = {
      username: 'user',
      password1: 'password1',
      password2: 'password2',
      email: 'hello',
    };

    login.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
    });
  });

  it('can call #resetPassword', () => {
    mockApiCall('post', '/api-auth/password/reset/', {
      email: 'email@email.com',
    });

    login.resetPassword('email@email.com').then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #resetPasswordConfirm', () => {
    mockApiCall('post', '/api-auth/password/reset/confirm/', {
      new_password1: 'password',
      new_password2: 'password',
      uid: 'uid',
      token: 'token',
    });

    login.resetPasswordConfirm({
      password1: 'password',
      password2: 'password',
    }, 'uid', 'token').then(res => {
      expect(res.text).to.equal('success');
    });
  });


  it('can call #changePassword', () => {
    mockApiCall('post', '/api-auth/password/change/', {
      new_password1: 'password',
      new_password2: 'password',
    });

    login.changePassword({
      password1: 'password',
      password2: 'password',
    }).then(res => {
      expect(res.text).to.equal('success');
    });
  });


  it('can call #facebookLogin', () => {
    mockApiCall('post', '/api-auth/social-login/facebook/', {
      access_token: 'fb-token',
    });

    login.facebookLogin({
      accessToken: 'fb-token',
    }).then(res => {
      expect(res.text).to.equal('success');
    });
  });


  it('can call #twitterLogin', () => {
    mockApiCall('post', '/api-auth/social-login/twitter/', {
      access_token: 'twitter-token',
      access_token_secret: 'twitter-token-secret',
    });

    login.twitterLogin({
      oauth_token: 'twitter-token',
      oauth_token_secret: 'twitter-token-secret',
    }).then(res => {
      expect(res.text).to.equal('success');
    });
  });
});
