
import fluxMixin from 'flummox/mixin';
import React from 'react';
import { addons } from 'react/addons';

import InfoText from './utils/InfoText';
import { CanLogoutMixin } from '../../utils/authUtils';

let { PureRenderMixin } = addons;

function retrieveInitialData(flux) {
  const loginActions = flux.getActions('login');
  return loginActions.logout(flux);
}

export default React.createClass({

  mixins: [
    PureRenderMixin,
    CanLogoutMixin,
    fluxMixin({
      login: store => store.state,
    }),
  ],

  statics: {
    routeWillRun({ flux, state }) {
      return retrieveInitialData(flux);
    },
  },

  componentDidMount() {
    if (this.state.loggedIn) retrieveInitialData(this.flux);
  },

  render() {
    return (
      <div>
        <InfoText>
          You are now being logged out...
        </InfoText>
      </div>
    );
  },

});

