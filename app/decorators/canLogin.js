// Disable param reassigning rules because that's how decorators work
/* eslint-disable no-param-reassign */

import defer from 'lodash/function/defer';

import { setAuthToken } from './api';

/**
 * This decorator adds login functionality to a React component. If the component is connected to
 * the `login` part of the Redux store, attaching this decorator will give it the ability to
 * set the auth token cookie.
 */
export default function canLogin(target) {
  const parentDidMount = target.prototype.componentDidMount || (() => {});
  const parentDidUpdate = target.prototype.componentDidUpdate || (() => {});

  function loginUser() {
    if (this.props.loggedIn) {
      // Set authorization token
      const { user, store, location } = this.props;
      setAuthToken(user.authToken, store);

      if (location.query && location.query.redirect) {
        defer(() => this.context.router.push(location.query.redirect));
      } else {
        defer(() => this.context.router.push('/'));
      }
    }
  }

  // Override existing component properties
  target.prototype.componentDidMount = function componentDidMount() {
    loginUser();
    parentDidMount();
  };

  target.prototype.componentDidUpdate = function componentDidUpdate() {
    loginUser();
    parentDidUpdate();
  };

  return target;
}

/**
 * A mixin that adds a login listener to the component. The component this is
 * connected to MUST BE connected to the LoginStore.
 */
// export const CanLoginMixin = {
  // mixins: [History],
  // componentDidMount() { this.loginUser_(); },
  // componentDidUpdate() { this.loginUser_(); },

  // loginUser_() {
    // if (this.state.loggedIn) {
      // // Set authorization token
      // const { user } = this.state;
      // setAuthToken(user.authToken, this.flux);

      // if (this.props.location.query && this.props.location.query.redirect) {
        // defer(() => this.history.pushState(null, this.props.location.query.redirect));
      // } else {
        // defer(() => this.history.pushState(null, '/'));
      // }
    // }
  // },
// };
