
// Import external modules
import { expect } from 'chai';

// Import module to test
import LoginActions from 'app/actions/LoginActions';
import { mockApiCall } from 'test/shared/mocks';

describe('LoginActions', () => {
  let actions;

  beforeEach(() => {
    actions = new LoginActions();
  });

  it('can call #login', () => {
    mockApiCall('post', '/api-auth/login/', {
      username: 'user',
      password: 'pass',
    });

    return actions.login('user', 'pass').then((response) => {
      expect(response.text).to.equal('success');
    });
  });


  it('can call #logout', () => {
    mockApiCall('post', '/api-auth/logout/', {});

    return actions.logout().then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #verifyEmail', () => {
    mockApiCall('post', '/api-auth/register/account-confirm-email/verification1234/', {});

    return actions.verifyEmail('verification1234').then((response) => {
      expect(response.text).to.equal('success');
    });
  });

  it('can call #register', () => {
    let user = {
      username: 'user',
      password1: 'pass1',
      password2: 'pass2',
      email: 'email',
    };

    mockApiCall('post', '/api-auth/register/', user);

    return actions.register(user).then((response) => {
      expect(response.text).to.equal('success');
    });
  });


  it('can call #resetPassword', () => {
    mockApiCall('post', '/api-auth/password/reset/', {
      email: 'email@email.com',
    });

    return actions.resetPassword('email@email.com').then((response) => {
      expect(response.text).to.equal('success');
    });
  });


  it('can call #resetPasswordConfirm', () => {
    mockApiCall('post', '/api-auth/password/reset/confirm/', {
      new_password1: 'pass1',
      new_password2: 'pass2',
      uid: 'uid',
      token: 'token',
    });

    return actions.resetPasswordConfirm({
      password1: 'pass1',
      password2: 'pass2',
    }, 'uid', 'token').then((response) => {
      expect(response.text).to.equal('success');
    });
  });


  it('can call #changePassword', () => {
    mockApiCall('post', '/api-auth/password/change/', {
      new_password1: 'pass1',
      new_password2: 'pass2',
    });

    return actions.changePassword({
      password1: 'pass1',
      password2: 'pass2',
    }).then((response) => {
      expect(response.text).to.equal('success');
    });
  });


  it('can call #facebookLogin', () => {
    mockApiCall('post', '/api-auth/social-login/facebook/', {
      access_token: 'fb-token',
    });

    return actions.facebookLogin({
      accessToken: 'fb-token',
    }).then((response) => {
      expect(response.text).to.equal('success');
    });
  });


  it('can call #twitterLogin', () => {
    mockApiCall('post', '/api-auth/social-login/twitter/', {
      access_token: 'twitter-token',
      access_token_secret: 'twitter-token-secret',
    });

    return actions.twitterLogin({
      oauth_token: 'twitter-token',
      oauth_token_secret: 'twitter-token-secret',
    }).then((response) => {
      expect(response.text).to.equal('success');
    });
  });


});

