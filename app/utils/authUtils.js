
import defer from 'lodash/function/defer';
import extend from 'lodash/object/extend';
import { Navigation } from 'react-router';

import config from '../../config';
import { setAuthToken, deleteAuthToken } from './api';
import { errors, success } from './constants';

/**
 * This function returns a react-router transition callback that makes sure
 * a user is authenticated before proceeding. It makes an async call to the
 * getUsers API.
 *
 * @param {Flux} flux The flux object
 *
 * @return {Function} Callback to feed into react-router
 */
export function requireAuth(flux) {
  return function(nextState, transition, callback) {
    flux.getActions('login').getUser(flux).then(() => {
      callback();
    }).catch(() => {
      transition.to('/login/', { redirect: nextState.location.pathname });
      callback();
    });
  };
}

/**
 * This function returns a react-router transition callback that makes sure
 * a user is NOT authenticated before proceeding. It makes an async call to the
 * getUsers API. It also returns the user back to the homepage if they are
 * authenticated.
 *
 * @param {Flux} flux The flux object
 *
 * @return {Function} Callback to feed into react-router
 */
export function requireNoAuth(flux) {
  return function(nextState, transition, callback) {
    flux.getActions('login').getUser(flux).then(() => {
      transition.to('/');
      callback();
    }).catch(() => {
      callback();
    });
  };
}

/**
 * A mixin that adds a login listener to the component. The component this is
 * connected to MUST BE connected to the LoginStore.
 */
export let CanLoginMixin = {
  mixins: [Navigation],
  componentDidMount() { this.loginUser_(); },
  componentDidUpdate() { this.loginUser_(); },

  loginUser_() {
    if (this.state.errorCode === success.LOGGED_IN) {

      // Set authorization token
      let { user } = this.state;
      setAuthToken(user.authToken, this.flux);

      if (this.props.location.query && this.props.location.query.redirect) {
        defer(() => this.transitionTo(this.props.location.query.redirect));
      } else {
        defer(() => this.transitionTo('/'));
      }
    }
  },
};

/**
 * A mixin that adds a logout listener to the component. The component this is
 * connected to MUST BE connected to the LoginStore.
 */
export let CanLogoutMixin = {
  mixins: [Navigation],
  componentDidMount() { this.logoutUser_(); },
  componentDidUpdate() { this.logoutUser_(); },

  logoutUser_() {
    if (this.state.errorCode !== success.LOGGED_IN) {

      // Delete authorization token
      deleteAuthToken(this.flux);

      if (this.props.location.query && this.props.location.query.redirect) {
        defer(() => this.transitionTo(this.props.location.query.redirect));
      } else {
        defer(() => this.transitionTo('/'));
      }
    }
  },
};

/**
 * A mixin that adds the ability to log in to Facebook by asynchronously loading
 * the Facebook Javascript SDK.
 */
export let FacebookLoginMixin = {

  componentDidMount() {

    // Function that will run after Facebook is done initializing
    window.fbAsyncInit = () => {
      /*global FB*/
      FB.init({
        appId: config.facebook.appId,
        xfbml: false,
        version: 'v2.3',
      });
    };

    // Asynchronously load Facebook
    (function(d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Inject fb-root div if it doesn't exist
    if (!document.getElementById('fb-root')) {
      let fbRoot = document.createElement('div');
      fbRoot.setAttribute('id', 'fb-root');
      document.querySelector('body').appendChild(fbRoot);
    }
  },

  componentDidUnmount() {

    // Remove fb-root div
    if (document.getElementById('fb-root')) {
      let fbRoot = document.getElementById('fb-root');
      fbRoot.parentElement.removeChild(fbRoot);
    }
  },

  facebookLogin() {
    /*global FB*/
    FB.login(response => {
      if (response.authResponse) {
        FB.api('/me', loginResponse => {
          extend(loginResponse, {
            status: 'connected',
            accessToken: response.authResponse.accessToken,
            expiresIn: response.authResponse.expiresIn,
            signedRequest: response.authResponse.signedRequest,
          });

          if (this.facebookLoginHandler) this.facebookLoginHandler(loginResponse);
        });
      } else {
        if (this.facebookLoginHandler) {
          this.facebookLoginHandler({ status: response.status });
        }
      }
    }, {
      scope: 'public_profile, email, user_birthday',
    });
  },
};
