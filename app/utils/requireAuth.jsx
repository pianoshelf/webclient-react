
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { Navigation } from 'react-router';

import { success } from './constants';


export default function requireAuth(flux) {
  return (nextState, transition, callback) => {
    const loginActions = flux.getActions('login');
    loginActions.getUser(flux).then(() => {
      callback();
    }).catch(() => {
      transition.to('/login/', { redirect: nextState.location.pathname });
      callback();
    });
  };
}


// const authenticateComponent = WrappedComponent => {
  // return React.createClass({

    // displayName: 'Authenticator',

    // mixins: [Navigation, fluxMixin({
      // login: store => ({
        // errorCode: store.state.errorCode,
        // user: store.state.user,
      // }),
    // }), ],

    // getInitialState() {
      // return {};
    // },

    // componentWillMount() {
      // // this.context.router.transitionTo('login');

    // },

    // render() {

      // return <WrappedComponent {...this.props} user={this.state.user} />;
    // },
  // });
// };

// export default authenticateComponent;

