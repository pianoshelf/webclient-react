
// Import external modules
import { expect } from 'chai';
import { Flummox } from 'flummox';

// Import module to test
import LoginActions from '../../app/actions/LoginActions';
import { mockApiCall, getFailedResponseError } from '../shared/mocks';
import { errors, success } from '../../app/utils/constants';

// Declare Flux object
class Flux extends Flummox {
  constructor() {
    super();
    this.createActions('login', LoginActions);
  }
}

describe('LoginActions', () => {
  let actions;

  beforeEach(() => {
    let flux = new Flux();
    actions = flux.getActions('login');
  });

  it('can call #getUser', () => {
    mockApiCall('get', '/api-auth/user/', {});
    actions.getUser().then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #login', () => {
    mockApiCall('post', '/api-auth/login/', {
      username: 'user',
      password: 'pass',
    });
    actions.login('user', 'pass').then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #login and throw error when username is empty', () => {
    actions.login('', 'pass').catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.NO_USERNAME);
    })
  });

  it('can call #login and throw error when the password is empty', () => {
    actions.login('user', '').catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.NO_PASSWORD);
    })
  });

  it('can call #logout', () => {
    mockApiCall('post', '/api-auth/logout/', {});
    actions.logout().then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #verifyEmail', () => {
    mockApiCall('post', '/api-auth/register/account-confirm-email/verification1234/', {});
    actions.verifyEmail('verification1234').then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #register', () => {
    let user = {
      username: 'user',
      password1: 'password',
      password2: 'password',
      email: 'email@email.com',
    };

    mockApiCall('post', '/api-auth/register/', user);

    actions.register(user).then(res => {
      expect(res.text).to.equal('success');
    });
  });

  it('can call #register and throw error when email is empty', () => {
    let user = {
      username: 'user',
      password1: 'password',
      password2: 'password',
      email: '',
    };

    actions.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.NO_EMAIL);
    });
  });

  it('can call #register and throw error when the email is invalid', () => {
    let user = {
      username: 'user',
      password1: 'password',
      password2: 'password',
      email: 'hello',
    };

    actions.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
    });
  });

  it('can call #register and throw error when the password is less than 6 characters', () => {
    let user = {
      username: 'user',
      password1: 'pass',
      password2: 'pass',
      email: 'hello',
    };

    actions.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
    });
  });

  it('can call #register and throw error when the passwords is not the same', () => {
    let user = {
      username: 'user',
      password1: 'password1',
      password2: 'password2',
      email: 'hello',
    };

    actions.register(user).catch(res => {
      expect(getFailedResponseError(res)).to.equal(errors.INVALID_EMAIL);
    });
  });

  it('can call #resetPassword', () => {
    mockApiCall('post', '/api-auth/password/reset/', {
      email: 'email@email.com',
    });

    actions.resetPassword('email@email.com').then(res => {
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

    actions.resetPasswordConfirm({
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

    actions.changePassword({
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

    actions.facebookLogin({
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

    actions.twitterLogin({
      oauth_token: 'twitter-token',
      oauth_token_secret: 'twitter-token-secret',
    }).then(res => {
      expect(res.text).to.equal('success');
    });
  });


});

