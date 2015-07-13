
import React from 'react';
import fluxMixin from 'flummox/mixin';
import { addons } from 'react/addons';

import { CanLogoutMixin } from '../../utils/authUtils';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux) {
  const loginActions = flux.getActions('login');
  return loginActions.logout(flux);
}

export default React.createClass({

  mixins: [PureRenderMixin, CanLogoutMixin, fluxMixin({
    login: store => store.state,
  }), ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux);
    },
  },

  componentDidMount() {
    retrieveInitialData(this.flux);
  },

  render() {
    return (
      <p className="authentication__text">
        You are now being logged out...
      </p>
    );
  },

});

