// Disable param reassigning rules because that's how decorators work
/* eslint-disable no-param-reassign */

import extend from 'lodash/object/extend';

import config from '../../config';

/**
 * This decorator adds a function, `facebookLogin` that calls the Facebook API to log into the
 * site and returns a promise that resolves to a response given by Facebook.
 */
export default function canFacebookLogin(target) {
  const parentDidMount = target.prototype.componentDidMount || (() => {});
  const parentWillUnmount = target.prototype.componentWillUnmount || (() => {});

  target.prototype.facebookLogin = function facebookLogin() {
    return new Promise(resolve => {
      // Login in the global FB object
      /* global FB */
      FB.login(response => {
        if (response.authResponse) {
          FB.api('/me', loginResponse => {
            extend(loginResponse, {
              status: 'connected',
              accessToken: response.authResponse.accessToken,
              expiresIn: response.authResponse.expiresIn,
              signedRequest: response.authResponse.signedRequest,
            });

            resolve(loginResponse);
          });
        } else {
          resolve({ status: response.status });
        }
      }, {
        scope: 'public_profile, email, user_birthday',
      });
    });
  };

  // Override existing component properties
  target.prototype.componentDidMount = function componentDidMount() {
    // Function that will run after Facebook is done initializing
    window.fbAsyncInit = () => {
      /* global FB */
      FB.init({
        appId: config.facebook.appId,
        xfbml: false,
        version: 'v2.3',
      });
    };

    // Asynchronously load Facebook
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Inject fb-root div if it doesn't exist
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.setAttribute('id', 'fb-root');
      document.querySelector('body').appendChild(fbRoot);
    }

    // Call original componentDidMount function
    parentDidMount();
  };

  target.prototype.componentWillUnmount = function componentWillUnmount() {
    // Remove fb-root div
    if (document.getElementById('fb-root')) {
      const fbRoot = document.getElementById('fb-root');
      fbRoot.parentElement.removeChild(fbRoot);
    }
    parentWillUnmount();
  };

  return target;
}
