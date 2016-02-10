// Disable param reassigning rules because that's how decorators work
/* eslint-disable no-param-reassign */

import defer from 'lodash/function/defer';

import { deleteAuthToken } from './api';

/**
 * This decorator adds logout functionality to a React component. If the component is connected to
 * the `login` part of the Redux store, attaching this decorator will give it the ability to
 * delete the auth token cookie.
 */
export default function canLogout(target) {
  const parentDidMount = target.prototype.componentDidMount || (() => {});
  const parentDidUpdate = target.prototype.componentDidUpdate || (() => {});

  function logoutUser() {
    if (!this.props.loggedIn) {
      // Delete authorization token cookie
      const { store, location } = this.props;
      deleteAuthToken(store);

      if (location.query && location.query.redirect) {
        defer(() => this.context.router.push(location.query.redirect));
      } else {
        defer(() => this.context.router.push('/'));
      }
    }
  }

  // Override existing component properties
  target.prototype.componentDidMount = function componentDidMount() {
    logoutUser();
    parentDidMount();
  };

  target.prototype.componentDidUpdate = function componentDidUpdate() {
    logoutUser();
    parentDidUpdate();
  };

  return target;
}

/**
 * A mixin that adds a logout listener to the component. The component this is
 * connected to MUST BE connected to the LoginStore.
 */
// export const CanLogoutMixin = {
  // mixins: [History],
  // componentDidMount() { this.logoutUser_(); },
  // componentDidUpdate() { this.logoutUser_(); },

  // logoutUser_() {
    // if (!this.state.loggedIn) {
      // // Delete authorization token
      // deleteAuthToken(this.flux);

      // if (this.props.location.query && this.props.location.query.redirect) {
        // defer(() => this.history.pushState(null, this.props.location.query.redirect));
      // } else {
        // defer(() => this.history.pushState(null, '/'));
      // }
    // }
  // },
// };

