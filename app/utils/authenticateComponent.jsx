
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { Navigation } from 'react-router';

import { success } from './constants';

const authenticateComponent = WrappedComponent => {
  return React.createClass({

    displayName: 'Authenticator',

    mixins: [Navigation, fluxMixin({
      login: store => ({
        errorCode: store.state.errorCode,
        user: store.state.user,
      }),
    }), ],

    getInitialState() {
      return {};
    },

    componentWillMount() {
      // this.context.router.transitionTo('login');

    },

    render() {

      return <WrappedComponent {...this.props} user={this.state.user} />;
    },
  });
};

export default authenticateComponent;

